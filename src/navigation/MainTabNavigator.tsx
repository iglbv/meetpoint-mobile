import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Screens
import ProjectsScreen from '../screens/projects/ProjectsScreen';
import ProjectDetailScreen from '../screens/projects/ProjectDetailScreen';
import TeamsScreen from '../screens/teams/TeamsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();
const ProjectsStack = createStackNavigator();
const TeamsStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const ProjectsStackNavigator = () => (
    <ProjectsStack.Navigator screenOptions={{ headerShown: false }}>
        <ProjectsStack.Screen name="ProjectsList" component={ProjectsScreen} />
        <ProjectsStack.Screen name="ProjectDetail" component={ProjectDetailScreen} />
    </ProjectsStack.Navigator>
);

const TeamsStackNavigator = () => (
    <TeamsStack.Navigator screenOptions={{ headerShown: false }}>
        <TeamsStack.Screen name="TeamsList" component={TeamsScreen} />
    </TeamsStack.Navigator>
);

const ProfileStackNavigator = () => (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
        <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
    </ProfileStack.Navigator>
);

const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'Projects':
                            iconName = 'work';
                            break;
                        case 'Teams':
                            iconName = 'groups';
                            break;
                        case 'Profile':
                            iconName = 'person';
                            break;
                        default:
                            iconName = 'circle';
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#2196F3',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
                tabBarStyle: {
                    paddingBottom: 5,
                    height: 60,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    marginBottom: 5,
                },
            })}
        >
            <Tab.Screen name="Projects" component={ProjectsStackNavigator} />
            <Tab.Screen name="Teams" component={TeamsStackNavigator} />
            <Tab.Screen name="Profile" component={ProfileStackNavigator} />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;