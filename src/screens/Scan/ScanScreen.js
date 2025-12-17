import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { emailService } from '../../services/emailService';
import { COLORS } from '../../constants';

export default function ScanScreen({ navigation }) {
  const [sender, setSender] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    if (!sender || !subject || !body) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const result = await emailService.scanEmail({
        sender,
        recipient: 'user@example.com',
        subject,
        body,
      });

      // Navigate to result or show alert
      Alert.alert(
        result.is_threat ? 'Threat Detected!' : 'Email Safe',
        `Risk Score: ${result.risk_score}/100\n${
          result.threats?.length > 0
            ? `Threats: ${result.threats.map(t => t.category).join(', ')}`
            : 'No threats detected'
        }`,
        [
          {
            text: 'View Details',
            onPress: () => navigation.navigate('EmailDetail', { email: result }),
          },
          { text: 'OK' },
        ]
      );

      // Clear form
      setSender('');
      setSubject('');
      setBody('');
    } catch (error) {
      Alert.alert('Scan Failed', error.response?.data?.message || 'Could not scan email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="shield-search" size={48} color={COLORS.primary} />
        <Text style={styles.headerTitle}>Scan Email</Text>
        <Text style={styles.headerSubtitle}>
          Analyze emails for potential threats
        </Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Sender Email</Text>
        <TextInput
          style={styles.input}
          placeholder="sender@example.com"
          value={sender}
          onChangeText={setSender}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Subject</Text>
        <TextInput
          style={styles.input}
          placeholder="Email subject"
          value={subject}
          onChangeText={setSubject}
        />

        <Text style={styles.label}>Email Body</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Email content..."
          value={body}
          onChangeText={setBody}
          multiline
          numberOfLines={8}
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={[styles.scanButton, loading && styles.buttonDisabled]}
          onPress={handleScan}
          disabled={loading}
        >
          <Icon name="shield-search" size={24} color="#fff" />
          <Text style={styles.scanButtonText}>
            {loading ? 'Scanning...' : 'Scan Email'}
          </Text>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 30,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: COLORS.dark,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.secondary,
    marginTop: 5,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: COLORS.dark,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  textArea: {
    height: 150,
    paddingTop: 15,
  },
  scanButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
});
