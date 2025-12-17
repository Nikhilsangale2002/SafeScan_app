import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { emailService } from '../../services/emailService';
import { COLORS } from '../../constants';

export default function EmailsScreen({ navigation }) {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadEmails();
  }, []);

  const loadEmails = async () => {
    try {
      const data = await emailService.getEmails({ limit: 50 });
      setEmails(data.emails || []);
    } catch (error) {
      console.error('Error loading emails:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadEmails();
  };

  const getThreatColor = (riskScore) => {
    if (riskScore >= 80) return COLORS.danger;
    if (riskScore >= 50) return COLORS.warning;
    return COLORS.success;
  };

  const renderEmail = ({ item }) => (
    <TouchableOpacity
      style={styles.emailCard}
      onPress={() => navigation.navigate('EmailDetail', { email: item })}
    >
      <View style={styles.emailHeader}>
        <Text style={styles.emailSender} numberOfLines={1}>
          {item.sender}
        </Text>
        <View style={[styles.badge, { backgroundColor: getThreatColor(item.risk_score) }]}>
          <Text style={styles.badgeText}>{item.risk_score}</Text>
        </View>
      </View>
      
      <Text style={styles.emailSubject} numberOfLines={1}>
        {item.subject}
      </Text>
      
      <View style={styles.emailFooter}>
        <Text style={styles.emailDate}>
          {new Date(item.scanned_at).toLocaleDateString()}
        </Text>
        {item.is_threat && (
          <View style={styles.threatIndicator}>
            <Icon name="alert-circle" size={16} color={COLORS.danger} />
            <Text style={styles.threatText}>Threat</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Loading emails...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Emails</Text>
      </View>
      
      <FlatList
        data={emails}
        renderItem={renderEmail}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="email-outline" size={64} color={COLORS.secondary} />
            <Text style={styles.emptyText}>No emails scanned yet</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  emailCard: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  emailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  emailSender: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    color: COLORS.dark,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emailSubject: {
    fontSize: 14,
    color: COLORS.secondary,
    marginBottom: 8,
  },
  emailFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emailDate: {
    fontSize: 12,
    color: COLORS.secondary,
  },
  threatIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  threatText: {
    fontSize: 12,
    color: COLORS.danger,
    marginLeft: 4,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.secondary,
    marginTop: 10,
  },
});
