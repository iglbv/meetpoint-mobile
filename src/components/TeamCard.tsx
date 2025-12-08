import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface TeamCardProps {
    team: any;
    onPress: () => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onPress }) => {
    const getStatusColor = (status: string) => {
        return status === 'active' ? '#4CAF50' : '#FF9800';
    };

    const getStatusText = (status: string) => {
        return status === 'active' ? 'Активна' : 'На рассмотрении';
    };

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.header}>
                <View style={styles.teamInfo}>
                    <Text style={styles.projectTitle} numberOfLines={1}>
                        {team.projectTitle}
                    </Text>
                    <Text style={styles.role}>{team.role}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(team.status) }]}>
                    <Text style={styles.statusText}>{getStatusText(team.status)}</Text>
                </View>
            </View>

            <View style={styles.details}>
                <Text style={styles.detailText}>Участников: {team.members}</Text>
                <Text style={styles.detailText}>Активность: {team.lastActivity}</Text>
            </View>

            <TouchableOpacity style={styles.enterButton}>
                <Text style={styles.enterButtonText}>Перейти в команду</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    teamInfo: {
        flex: 1,
        marginRight: 12,
    },
    projectTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    role: {
        fontSize: 14,
        color: '#666',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        minWidth: 100,
    },
    statusText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
    },
    details: {
        marginBottom: 12,
        gap: 8,
    },
    detailText: {
        fontSize: 14,
        color: '#333',
    },
    enterButton: {
        paddingVertical: 10,
        backgroundColor: '#2196F3',
        borderRadius: 8,
        alignItems: 'center',
    },
    enterButtonText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '500',
    },
});

export default TeamCard;