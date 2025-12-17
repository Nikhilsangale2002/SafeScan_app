import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../context/AuthContext';
import { COLORS, APP_VERSION } from '../../constants';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: logout,
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Icon name="account" size={48} color="#fff" />
        </View>
        <Text style={styles.userName}>{user?.username || 'User'}</Text>
        <Text style={styles.userEmail}>{user?.email || ''}</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="shield-account" size={24} color={COLORS.primary} />
          <Text style={styles.menuText}>Account Security</Text>
          <Icon name="chevron-right" size={24} color={COLORS.secondary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="bell" size={24} color={COLORS.primary} />
          <Text style={styles.menuText}>Notifications</Text>
          <Icon name="chevron-right" size={24} color={COLORS.secondary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="cog" size={24} color={COLORS.primary} />
          <Text style={styles.menuText}>Settings</Text>
          <Icon name="chevron-right" size={24} color={COLORS.secondary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="help-circle" size={24} color={COLORS.primary} />
          <Text style={styles.menuText}>Help & Support</Text>
          <Icon name="chevron-right" size={24} color={COLORS.secondary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="information" size={24} color={COLORS.primary} />
          <Text style={styles.menuText}>About</Text>
          <Text style={styles.versionText}>v{APP_VERSION}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="logout" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
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
    alignItems: 'center',
    padding: 30,
    paddingTop: 60,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
  },
  userEmail: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginTop: 5,
  },
  section: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
    color: COLORS.dark,
  },
  versionText: {
    fontSize: 14,
    color: COLORS.secondary,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.danger,
    margin: 10,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
});
