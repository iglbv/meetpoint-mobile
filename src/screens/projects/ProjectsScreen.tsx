import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    StatusBar,
    TouchableOpacity,
    TextInput,
    RefreshControl,
    ActivityIndicator,
} from 'react-native';
import ProjectCard from '../../components/ProjectCard';
import { useAuth } from '../../contexts/AuthContext';
import { Project } from '../../types';

const mockProjects: Project[] = [
    {
        id: '1',
        title: 'Разработка MeetPoint',
        description: 'Создание платформы для проектного обучения. Нужны разработчики React Native.',
        companyId: '1',
        companyName: 'УрФУ',
        status: 'recruiting',
        requiredSkills: ['React Native', 'TypeScript'],
        difficulty: 'intermediate',
        timeline: {
            start: '2025-01-15',
            end: '2026-06-15',
        },
        maxParticipants: 3,
        currentParticipants: 1,
        createdAt: '2025-01-10',
        updatedAt: '2025-01-10',
        category: 'Разработка',
        tags: ['мобильная разработка', 'образование'],
    },
];

const ProjectsScreen = ({ navigation }: any) => {
    const { user } = useAuth();
    const [projects, setProjects] = useState<Project[]>(mockProjects);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    };

    const handleProjectPress = (project: Project) => {
        navigation.navigate('ProjectDetail', { projectId: project.id });
    };

    const handleCreateProject = () => {
        if (user?.role === 'company_admin' || user?.role === 'curator') {
            navigation.navigate('CreateProject');
        }
    };

    if (loading && !refreshing) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#2196F3" />
                    <Text style={styles.loadingText}>Загрузка...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Проекты</Text>
            </View>

            {(user?.role === 'company_admin' || user?.role === 'curator') && (
                <TouchableOpacity style={styles.createButton} onPress={handleCreateProject}>
                    <Text style={styles.createButtonText}>Создать проект</Text>
                </TouchableOpacity>
            )}

            <FlatList
                data={projects}
                renderItem={({ item }) => (
                    <ProjectCard project={item} onPress={() => handleProjectPress(item)} />
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyTitle}>Нет проектов</Text>
                        <Text style={styles.emptyText}>
                            Создайте первый проект
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#666',
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
    createButton: {
        backgroundColor: '#2196F3',
        marginHorizontal: 20,
        marginVertical: 12,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    createButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 20,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#666',
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
    },
});

export default ProjectsScreen;