import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

const ProfileScreen = () => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        Alert.alert(
            'Выход',
            'Вы уверены, что хотите выйти из аккаунта?',
            [
                { text: 'Отмена', style: 'cancel' },
                { text: 'Выйти', onPress: () => logout() },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Профиль</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.userCard}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                        </Text>
                    </View>

                    <Text style={styles.userName}>
                        {user?.firstName} {user?.lastName}
                    </Text>
                    <Text style={styles.userEmail}>{user?.email}</Text>

                    <View style={styles.roleBadge}>
                        <Text style={styles.roleText}>
                            {user?.role === 'student' ? 'СТУДЕНТ' :
                                user?.role === 'company_admin' ? 'КОМПАНИЯ' : 'КУРАТОР'}
                        </Text>
                    </View>

                    {user?.university && (
                        <Text style={styles.infoText}>{user.university}</Text>
                    )}

                    {user?.company && (
                        <Text style={styles.infoText}>{user.company}</Text>
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Настройки</Text>

                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuText}>Редактировать профиль</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuText}>Помощь</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.menuItem, styles.logoutItem]} onPress={handleLogout}>
                        <Text style={styles.logoutText}>Выйти</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.appInfo}>
                    <Text style={styles.appName}>MeetPoint</Text>
                    <Text style={styles.appCopyright}>© 2025 Голубев Илья</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    userCard: {
        backgroundColor: '#fff',
        margin: 20,
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#2196F3',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatarText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 16,
        color: '#666',
        marginBottom: 12,
    },
    roleBadge: {
        backgroundColor: '#E3F2FD',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginBottom: 16,
    },
    roleText: {
        fontSize: 14,
        color: '#1976D2',
        fontWeight: '500',
    },
    infoText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },
    section: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 12,
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
    },
    menuItem: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    menuText: {
        fontSize: 16,
        color: '#333',
    },
    logoutItem: {
        borderBottomWidth: 0,
    },
    logoutText: {
        fontSize: 16,
        color: '#FF3B30',
        fontWeight: '500',
    },
    appInfo: {
        alignItems: 'center',
        marginTop: 20,
    },
    appName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2196F3',
        marginBottom: 4,
    },
    appCopyright: {
        fontSize: 12,
        color: '#999',
    },
});

export default ProfileScreen;