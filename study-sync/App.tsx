import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from './drizzle/migrations';
import { db } from './src/db/client';
import { supabase } from './src/lib/supabase';
import { useUserStore } from './src/store/useUserStore';

// Temporary placeholder for the main application layout. Replace
// with your actual navigation or UI hierarchy once it's ready.
function YourMainAppLayout() {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>Welcome to StudySync!</Text>
    </View>
  );
}

export default function App() {
  const { success, error } = useMigrations(db, migrations);
  const setSession = useUserStore((state) => state.setSession);

  useEffect(() => {
    // Sync Supabase Auth state with Zustand
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);

  if (!success) return <Text>Loading Database...</Text>;
  if (error) return <Text>Migration Error: {error.message}</Text>;

  return <YourMainAppLayout />;
}