import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }: any) {

  const [name, setName] = useState("");

  const handleLogin = async () => {
    if (!name.trim()) return;

    await AsyncStorage.setItem("user", name);

    navigation.replace("Home"); // go to main app
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>StudySync</Text>

      <TextInput
        placeholder="Enter your name"
        placeholderTextColor="#94A3B8"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    padding: 20
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },

  input: {
    backgroundColor: "#1E293B",
    padding: 12,
    borderRadius: 10,
    color: "#fff",
    marginBottom: 15
  },

  button: {
    backgroundColor: "#3B82F6",
    padding: 14,
    borderRadius: 10,
    alignItems: "center"
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600"
  }
});