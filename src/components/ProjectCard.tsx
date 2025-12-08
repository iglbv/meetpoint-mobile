import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Project } from '../types';

interface ProjectCardProps {
    project: Project;
    onPress: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onPress }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'recruiting': return '#FF9800';
            case 'in_progress': return '#4CAF50';
            case 'completed': return '#9E9E9E';
            default: return '#757575';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'recruiting': return 'Набор участников';
            case 'in_progress': return 'В процессе';
            case 'completed': return 'Завершен';
            default: return status;
        }
    };

    const getDifficultyText = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner': return 'Начинающий';
            case 'intermediate': return 'Средний';
            case 'advanced': return 'Продвинутый';
            default: return difficulty;
        }
    };

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title} numberOfLines={1}>{project.title}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(project.status) }]}>
                        <Text style={styles.statusText}>{getStatusText(project.status)}</Text>
                    </View>
                </View>
                <Text style={styles.company}>{project.companyName}</Text>
            </View>

            <Text style={styles.description} numberOfLines={2}>
                {project.description}
            </Text>

            <View style={styles.skillsContainer}>
                {project.requiredSkills.slice(0, 3).map((skill, index) => (
                    <View key={index} style={styles.skillTag}>
                        <Text style={styles.skillText}>{skill}</Text>
                    </View>
                ))}
                {project.requiredSkills.length > 3 && (
                    <View style={styles.skillTag}>
                        <Text style={styles.skillText}>+{project.requiredSkills.length - 3}</Text>
                    </View>
                )}
            </View>

            <View style={styles.footer}>
                <View style={styles.footerItem}>
                    <Text style={styles.footerLabel}>Участники:</Text>
                    <Text style={styles.footerValue}>
                        {project.currentParticipants}/{project.maxParticipants}
                    </Text>
                </View>

                <View style={styles.footerItem}>
                    <Text style={styles.footerLabel}>Сложность:</Text>
                    <Text style={styles.footerValue}>
                        {getDifficultyText(project.difficulty)}
                    </Text>
                </View>

                <View style={styles.footerItem}>
                    <Text style={styles.footerLabel}>До:</Text>
                    <Text style={styles.footerValue}>
                        {new Date(project.timeline.end).toLocaleDateString('ru-RU')}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        marginBottom: 8,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        marginRight: 8,
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
    company: {
        fontSize: 14,
        color: '#666',
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 12,
        lineHeight: 20,
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 12,
        gap: 6,
    },
    skillTag: {
        backgroundColor: '#E3F2FD',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    skillText: {
        fontSize: 12,
        color: '#1976D2',
        fontWeight: '500',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingTop: 12,
    },
    footerItem: {
        alignItems: 'center',
    },
    footerLabel: {
        fontSize: 10,
        color: '#999',
        marginBottom: 2,
    },
    footerValue: {
        fontSize: 12,
        color: '#333',
        fontWeight: '500',
    },
});

export default ProjectCard;