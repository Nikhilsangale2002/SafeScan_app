import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { dashboardService } from '../../services/dashboardService';
import { COLORS } from '../../constants';

export default function HomeScreen({ navigation }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await dashboardService.getStats();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadStats();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <Text style={styles.headerSubtitle}>SafeScan AI Protection</Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={[styles.statCard, { backgroundColor: COLORS.primary }]}>
          <Icon name="email" size={32} color="#fff" />
          <Text style={styles.statValue}>{stats?.total_emails || 0}</Text>
          <Text style={styles.statLabel}>Total Emails</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: COLORS.danger }]}>
          <Icon name="shield-alert" size={32} color="#fff" />
          <Text style={styles.statValue}>{stats?.total_threats || 0}</Text>
          <Text style={styles.statLabel}>Threats Detected</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: COLORS.warning }]}>
          <Icon name="lock" size={32} color="#fff" />
          <Text style={styles.statValue}>{stats?.quarantined || 0}</Text>
          <Text style={styles.statLabel}>Quarantined</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: COLORS.success }]}>
          <Icon name="check-circle" size={32} color="#fff" />
          <Text style={styles.statValue}>
            {stats?.threat_rate ? `${stats.threat_rate.toFixed(1)}%` : '0%'}
          </Text>
          <Text style={styles.statLabel}>Detection Rate</Text>
        </View>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Scan')}
        >
          <Icon name="shield-search" size={24} color={COLORS.primary} />
          <Text style={styles.actionText}>Scan New Email</Text>
          <Icon name="chevron-right" size={24} color={COLORS.secondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Emails')}
        >
          <Icon name="email-multiple" size={24} color={COLORS.primary} />
          <Text style={styles.actionText}>View All Emails</Text>
          <Icon name="chevron-right" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    marginTop: -30,
  },
  statCard: {
    width: '47%',
    margin: '1.5%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
  quickActions: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: COLORS.dark,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
    color: COLORS.dark,
  },
});
