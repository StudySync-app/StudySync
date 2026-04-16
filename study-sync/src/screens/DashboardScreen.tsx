import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import {
  getTaskStats,
  getTodaysTasks,
  getOverdueTasks,
  getUpcomingTasks
} from "../db/tasks";

export default function DashboardScreen() {

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    completionRate: 0
  });

  const [todayTasks, setTodayTasks] = useState<any[]>([]);
  const [overdueTasks, setOverdueTasks] = useState<any[]>([]);
  const [upcomingTasks, setUpcomingTasks] = useState<any[]>([]);

  const [refreshing, setRefreshing] = useState(false);

  // 🔄 AUTO REFRESH WHEN SCREEN FOCUSED
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = () => {
    setStats(getTaskStats());
    setTodayTasks(getTodaysTasks());
    setOverdueTasks(getOverdueTasks());
    setUpcomingTasks(getUpcomingTasks());
  };

  // 🔄 PULL TO REFRESH
  const onRefresh = () => {
    setRefreshing(true);
    loadData();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >

      <Text style={styles.title}>Dashboard</Text>

      {/* 📊 PROGRESS CARD */}
      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>Task Progress</Text>

        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${stats.completionRate}%` }
            ]}
          />
        </View>

        <Text style={styles.progressText}>
          {stats.completed} / {stats.total} completed ({stats.completionRate}%)
        </Text>
      </View>

      {/* 📦 STATS GRID */}
      <View style={styles.grid}>

        <View style={styles.card}>
          <Text style={styles.label}>Total</Text>
          <Text style={styles.value}>{stats.total}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Completed</Text>
          <Text style={styles.value}>{stats.completed}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Pending</Text>
          <Text style={styles.value}>{stats.pending}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Today</Text>
          <Text style={styles.value}>{todayTasks.length}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Overdue</Text>
          <Text style={styles.value}>{overdueTasks.length}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Upcoming</Text>
          <Text style={styles.value}>{upcomingTasks.length}</Text>
        </View>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#0F172A"
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 16
  },

  progressCard: {
    backgroundColor: "#1E293B",
    padding: 16,
    borderRadius: 14,
    marginBottom: 20
  },

  progressTitle: {
    color: "#fff",
    fontWeight: "600",
    marginBottom: 10
  },

  progressBarBackground: {
    height: 10,
    backgroundColor: "#334155",
    borderRadius: 10,
    overflow: "hidden"
  },

  progressBarFill: {
    height: 10,
    backgroundColor: "#3B82F6"
  },

  progressText: {
    marginTop: 10,
    color: "#CBD5F5"
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },

  card: {
    width: "48%",
    backgroundColor: "#1E293B",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12
  },

  label: {
    color: "#94A3B8",
    fontSize: 12
  },

  value: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 5
  }

});