import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { emailService } from '../../services/emailService';
import { COLORS } from '../../constants';

export default function EmailDetailScreen({ route, navigation }) {
  const { email } = route.params;

  const handleQuarantine = async () => {
    Alert.alert(
      'Quarantine Email',
      'Are you sure you want to quarantine this email?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Quarantine',
          style: 'destructive',
          onPress: async () => {
            try {
              await emailService.quarantineEmail(email.id);
              Alert.alert('Success', 'Email quarantined');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Could not quarantine email');
            }
          },
        },
      ]
    );
  };

  const handleDelete = async () => {
    Alert.alert(
      'Delete Email',
      'Are you sure you want to delete this email?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await emailService.deleteEmail(email.id);
              Alert.alert('Success', 'Email deleted');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Could not delete email');
            }
          },
        },
      ]
    );
  };

  const getThreatColor = (riskScore) => {
    if (riskScore >= 80) return COLORS.danger;
    if (riskScore >= 50) return COLORS.warning;
    return COLORS.success;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.riskBanner, { backgroundColor: getThreatColor(email.risk_score) }]}>
        <Icon name="shield-alert" size={48} color="#fff" />
        <Text style={styles.riskScore}>{email.risk_score}/100</Text>
        <Text style={styles.riskLabel}>Risk Score</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Email Details</Text>
        
        <View style={styles.detailRow}>
          <Text style={styles.label}>From:</Text>
          <Text style={styles.value}>{email.sender}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Subject:</Text>
          <Text style={styles.value}>{email.subject}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Scanned:</Text>
          <Text style={styles.value}>
            {new Date(email.scanned_at).toLocaleString()}
          </Text>
        </View>
      </View>

      {email.threats && email.threats.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Threats Detected</Text>
          {email.threats.map((threat, index) => (
            <View key={index} style={styles.threatCard}>
              <Icon name="alert-circle" size={24} color={COLORS.danger} />
              <View style={styles.threatContent}>
                <Text style={styles.threatCategory}>{threat.category}</Text>
                <Text style={styles.threatConfidence}>
                  Confidence: {threat.confidence}%
                </Text>
                {threat.indicators && threat.indicators.length > 0 && (
                  <Text style={styles.threatIndicators}>
                    {threat.indicators.join(', ')}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Email Body</Text>
        <Text style={styles.bodyText}>{email.body}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.quarantineButton} onPress={handleQuarantine}>
          <Icon name="lock" size={20} color="#fff" />
          <Text style={styles.buttonText}>Quarantine</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Icon name="delete" size={20} color="#fff" />
          <Text style={styles.buttonText}>Delete</Text>
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
  riskBanner: {
    alignItems: 'center',
    padding: 30,
  },
  riskScore: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  riskLabel: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  section: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: COLORS.dark,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    width: 80,
    color: COLORS.secondary,
  },
  value: {
    fontSize: 14,
    flex: 1,
    color: COLORS.dark,
  },
  threatCard: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: COLORS.light,
    borderRadius: 8,
    marginBottom: 10,
  },
  threatContent: {
    flex: 1,
    marginLeft: 12,
  },
  threatCategory: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.danger,
    textTransform: 'capitalize',
  },
  threatConfidence: {
    fontSize: 12,
    color: COLORS.secondary,
    marginTop: 2,
  },
  threatIndicators: {
    fontSize: 12,
    color: COLORS.secondary,
    marginTop: 4,
  },
  bodyText: {
    fontSize: 14,
    color: COLORS.dark,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    padding: 10,
    paddingBottom: 30,
  },
  quarantineButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.warning,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.danger,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
