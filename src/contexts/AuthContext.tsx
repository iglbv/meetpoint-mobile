import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'student' | 'company_admin' | 'curator' | 'platform_admin';
    university?: string;
    company?: string;
    avatar?: string;
    createdAt: Date;
}

interface AuthContextData {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (userData: RegisterData) => Promise<void>;
    logout: () => Promise<void>;
    updateUser: (userData: Partial<User>) => Promise<void>;
}

interface RegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: User['role'];
    university?: string;
    company?: string;
}

// Моковые пользователи (тестовые)
const initialMockUsers = [
    {
        id: '1',
        email: 'student@example.com',
        firstName: 'Илья',
        lastName: 'Голубев',
        role: 'student' as const,
        university: 'УрФУ',
        createdAt: new Date('2025-01-01'),
    },
];

// Ключ для хранения зарегистрированных пользователей
const USERS_STORAGE_KEY = '@MeetPoint:registeredUsers';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Загружаем сохраненного пользователя
    useEffect(() => {
        loadStoredUser();
    }, []);

    const loadStoredUser = async () => {
        try {
            const storedUser = await AsyncStorage.getItem('@MeetPoint:user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error('Error loading stored user:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Получаем всех пользователей (тестовые + зарегистрированные)
    const getAllUsers = async (): Promise<User[]> => {
        try {
            const storedUsers = await AsyncStorage.getItem(USERS_STORAGE_KEY);
            const registeredUsers = storedUsers ? JSON.parse(storedUsers) : [];

            // Объединяем тестовых пользователей с зарегистрированными
            return [...initialMockUsers, ...registeredUsers];
        } catch (error) {
            console.error('Error loading users:', error);
            return initialMockUsers;
        }
    };

    // Сохраняем нового пользователя
    const saveRegisteredUser = async (newUser: User) => {
        try {
            const storedUsers = await AsyncStorage.getItem(USERS_STORAGE_KEY);
            const registeredUsers = storedUsers ? JSON.parse(storedUsers) : [];

            registeredUsers.push(newUser);
            await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(registeredUsers));
        } catch (error) {
            console.error('Error saving registered user:', error);
        }
    };

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            // Имитация API запроса
            await new Promise<void>((resolve) => setTimeout(resolve, 1000));

            // Получаем всех пользователей
            const allUsers = await getAllUsers();

            // Ищем пользователя по email
            const foundUser = allUsers.find(user =>
                user.email.toLowerCase() === email.toLowerCase()
            );

            if (!foundUser) {
                throw new Error('Пользователь с таким email не найден');
            }

            // Для тестовых пользователей используем password123, для других - любой пароль
            const testEmails = ['student@example.com', 'company@example.com', 'curator@example.com'];
            const isTestUser = testEmails.includes(email.toLowerCase());

            if (isTestUser) {
                // Проверяем пароль только для тестовых пользователей
                if (password !== 'password123') {
                    throw new Error('Неверный пароль. Для тестовых пользователей используйте: password123');
                }
            }
            // Для зарегистрированных пользователей не проверяем пароль (в MVP)

            // Сохраняем пользователя в сессии (без пароля)
            const { password: _, ...userWithoutPassword } = foundUser as any;
            await AsyncStorage.setItem('@MeetPoint:user', JSON.stringify(userWithoutPassword));
            setUser(userWithoutPassword);
        } catch (error) {
            console.error('Login error:', error);
            throw new Error(error instanceof Error ? error.message : 'Ошибка при входе');
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (userData: RegisterData) => {
        setIsLoading(true);
        try {
            // Имитация API запроса
            await new Promise<void>((resolve) => setTimeout(resolve, 1000));

            // Получаем всех пользователей
            const allUsers = await getAllUsers();

            // Проверяем, нет ли уже пользователя с таким email
            const existingUser = allUsers.find(user =>
                user.email.toLowerCase() === userData.email.toLowerCase()
            );

            if (existingUser) {
                throw new Error('Пользователь с таким email уже существует');
            }

            // Создаем нового пользователя
            const newUser: User = {
                id: Date.now().toString(),
                ...userData,
                createdAt: new Date(),
            };

            // Сохраняем нового пользователя
            await saveRegisteredUser(newUser);

            // Сохраняем в сессии
            await AsyncStorage.setItem('@MeetPoint:user', JSON.stringify(newUser));
            setUser(newUser);
        } catch (error) {
            console.error('Registration error:', error);
            throw new Error(error instanceof Error ? error.message : 'Ошибка при регистрации');
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await AsyncStorage.removeItem('@MeetPoint:user');
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const updateUser = async (userData: Partial<User>) => {
        if (!user) return;

        setIsLoading(true);
        try {
            const updatedUser = { ...user, ...userData };
            await AsyncStorage.setItem('@MeetPoint:user', JSON.stringify(updatedUser));
            setUser(updatedUser);
        } catch (error) {
            console.error('Update user error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                login,
                register,
                logout,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};