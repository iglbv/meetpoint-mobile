import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { Project } from '../../types';

const ProjectDetailScreen = ({ route, navigation }: any) => {
    const { projectId } = route.params;
    const { user } = useAuth();

    const project: Project = {
        id: projectId,
        title: 'Разработка MeetPoint',
        description: 'Создание платформы для проектного обучения. Соединяем компании и студентов через реальные проекты.',
        companyId: '1',
        companyName: 'УрФУ',
        curatorName: 'Стив Джобс',
        status: 'recruiting',
        requiredSkills: ['React Native', 'TypeScript'],
        difficulty: 'intermediate',
        timeline: {
            start: '2025-01-15',
            end: '2026-01-15',
        },
        maxParticipants: 3,
        currentParticipants: 1,
        createdAt: '2025-01-10',
        updatedAt: '2025-01-10',
        category: 'Разработка',
        tags: ['мобильная разработка', 'образование'],
    };

    const [hasApplied, setHasApplied] = useState(false);

    const handleApply = () => {
        Alert.alert(
            'Подача заявки',
            'Вы уверены, что хотите подать заявку на этот проект?',
            [
                { text: 'Отмена', style: 'cancel' },
                {
                    text: 'Подать заявку',
                    onPress: () => {
                        setHasApplied(true);
                        Alert.alert('Успешно', 'Ваша заявка отправлена!');
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>Назад</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Проект</Text>
                <View style={styles.headerActions}>
                    <TouchableOpacity onPress={() => Alert.alert('В разработке', 'Функция в разработке')}>
                        <Text style={styles.headerButtonText}>Поделиться</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.projectHeader}>
                    <View style={styles.projectStatus}>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>Набор участников</Text>
                        </View>
                        <Text style={styles.difficulty}>Средний уровень</Text>
                    </View>
                    <Text style={styles.projectTitle}>{project.title}</Text>
                    <Text style={styles.companyName}>Компания: {project.companyName}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Описание</Text>
                    <Text style={styles.description}>{project.description}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Навыки</Text>
                    <View style={styles.skillsContainer}>
                        {project.requiredSkills.map((skill, index) => (
                            <View key={index} style={styles.skillTag}>
                                <Text style={styles.skillText}>{skill}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Сроки</Text>
                    <View style={styles.timelineContainer}>
                        <Text style={styles.timelineText}>
                            {new Date(project.timeline.start).toLocaleDateString('ru-RU')} - {new Date(project.timeline.end).toLocaleDateString('ru-RU')}
                        </Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Участники</Text>
                    <Text style={styles.participantCount}>
                        {project.currentParticipants} из {project.maxParticipants}
                    </Text>
                </View>
            </ScrollView>

            {user?.role === 'student' && project.status === 'recruiting' && (
                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={[styles.actionButton, hasApplied ? styles.appliedButton : styles.applyButton]}
                        onPress={hasApplied ? undefined : handleApply}
                        disabled={hasApplied}
                    >
                        <Text style={hasApplied ? styles.appliedButtonText : styles.applyButtonText}>
                            {hasApplied ? 'Заявка отправлена' : 'Подать заявку'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: {
        padding: 4,
    },
    backButtonText: {
        fontSize: 16,
        color: '#2196F3',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    headerActions: {
        flexDirection: 'row',
        gap: 16,
    },
    headerButtonText: {
        fontSize: 16,
        color: '#2196F3',
    },
    scrollContent: {
        paddingBottom: 100,
    },
    projectHeader: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    projectStatus: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        backgroundColor: '#FF9800',
    },
    statusText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    difficulty: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    projectTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
        lineHeight: 32,
    },
    companyName: {
        fontSize: 16,
        color: '#666',
        marginBottom: 4,
    },
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    skillTag: {
        backgroundColor: '#E3F2FD',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    skillText: {
        fontSize: 14,
        color: '#1976D2',
        fontWeight: '500',
    },
    timelineContainer: {
        gap: 12,
    },
    timelineText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    participantCount: {
        fontSize: 16,
        color: '#333',
    },
    actionButtons: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    actionButton: {
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    applyButton: {
        backgroundColor: '#2196F3',
    },
    applyButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    appliedButton: {
        backgroundColor: '#4CAF50',
    },
    appliedButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
});

export default ProjectDetailScreen;