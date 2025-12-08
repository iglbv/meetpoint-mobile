import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

const roleOptions = [
    { label: 'Студент', value: 'student' },
    { label: 'Руководитель компании', value: 'company_admin' },
    { label: 'Куратор проекта', value: 'curator' },
];

const RegisterScreen = () => {
    const { register, isLoading } = useAuth();
    const navigation = useNavigation();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student' as 'student' | 'company_admin' | 'curator' | 'platform_admin',
        university: '',
        company: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showRolePicker, setShowRolePicker] = useState(false);

    const handleInputChange = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const validateForm = () => {
        const { firstName, lastName, email, password, confirmPassword, role, university, company } = formData;

        if (!firstName.trim() || !lastName.trim() || !email.trim() || !password || !confirmPassword) {
            Alert.alert('Ошибка', 'Пожалуйста, заполните все обязательные поля');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Ошибка', 'Пожалуйста, введите корректный email');
            return false;
        }

        if (password.length < 6) {
            Alert.alert('Ошибка', 'Пароль должен содержать минимум 6 символов');
            return false;
        }

        if (password !== confirmPassword) {
            Alert.alert('Ошибка', 'Пароли не совпадают');
            return false;
        }

        if (role === 'student' && !university.trim()) {
            Alert.alert('Ошибка', 'Пожалуйста, укажите ваш университет');
            return false;
        }

        if ((role === 'company_admin' || role === 'curator') && !company.trim()) {
            Alert.alert('Ошибка', 'Пожалуйста, укажите название компании');
            return false;
        }

        return true;
    };

    const handleRegister = async () => {
        if (!validateForm()) return;

        try {
            await register({
                email: formData.email,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName,
                role: formData.role,
                university: formData.role === 'student' ? formData.university : undefined,
                company: (formData.role === 'company_admin' || formData.role === 'curator') ? formData.company : undefined,
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Не удалось зарегистрироваться';

            if (errorMessage.includes('уже существует')) {
                Alert.alert(
                    'Email уже используется',
                    'Пользователь с таким email уже зарегистрирован. Хотите войти?',
                    [
                        { text: 'Отмена', style: 'cancel' },
                        {
                            text: 'Войти',
                            onPress: () => navigation.navigate('Login' as never)
                        },
                    ]
                );
            } else {
                Alert.alert('Ошибка регистрации', errorMessage);
            }
        }
    };

    const renderRolePicker = () => (
        <View style={styles.rolePickerContainer}>
            <TouchableOpacity
                style={styles.rolePicker}
                onPress={() => setShowRolePicker(true)}
                disabled={isLoading}
            >
                <Text style={styles.rolePickerText}>
                    {roleOptions.find(r => r.value === formData.role)?.label || 'Выберите роль'}
                </Text>
                <Icon name="arrow-drop-down" size={24} color="#666" />
            </TouchableOpacity>

            {showRolePicker && (
                <View style={styles.roleOptions}>
                    {roleOptions.map(option => (
                        <TouchableOpacity
                            key={option.value}
                            style={styles.roleOption}
                            onPress={() => {
                                handleInputChange('role', option.value);
                                setShowRolePicker(false);
                            }}
                        >
                            <Text style={[
                                styles.roleOptionText,
                                formData.role === option.value && styles.selectedRoleOptionText
                            ]}>
                                {option.label}
                            </Text>
                            {formData.role === option.value && (
                                <Icon name="check" size={20} color="#2196F3" />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.navigate('Login' as never)}
                            disabled={isLoading}
                        >
                            <Icon name="arrow-back" size={24} color="#333" />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.title}>Создайте аккаунт</Text>
                            <Text style={styles.subtitle}>Присоединяйтесь к платформе проектного обучения</Text>
                        </View>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        {/* Name Fields */}
                        <View style={styles.row}>
                            <View style={[styles.inputContainer, styles.halfInput]}>
                                <Text style={styles.label}>Имя *</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Иван"
                                    value={formData.firstName}
                                    onChangeText={(value) => handleInputChange('firstName', value)}
                                    editable={!isLoading}
                                    placeholderTextColor="#999"
                                />
                            </View>

                            <View style={[styles.inputContainer, styles.halfInput]}>
                                <Text style={styles.label}>Фамилия *</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Иванов"
                                    value={formData.lastName}
                                    onChangeText={(value) => handleInputChange('lastName', value)}
                                    editable={!isLoading}
                                    placeholderTextColor="#999"
                                />
                            </View>
                        </View>

                        {/* Email */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="example@email.com"
                                value={formData.email}
                                onChangeText={(value) => handleInputChange('email', value)}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                editable={!isLoading}
                                placeholderTextColor="#999"
                            />
                        </View>

                        {/* Role */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Роль *</Text>
                            {renderRolePicker()}
                        </View>

                        {/* University/Company based on role */}
                        {formData.role === 'student' ? (
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Университет *</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="УрФУ"
                                    value={formData.university}
                                    onChangeText={(value) => handleInputChange('university', value)}
                                    editable={!isLoading}
                                    placeholderTextColor="#999"
                                />
                            </View>
                        ) : (
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Компания *</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Название компании"
                                    value={formData.company}
                                    onChangeText={(value) => handleInputChange('company', value)}
                                    editable={!isLoading}
                                    placeholderTextColor="#999"
                                />
                            </View>
                        )}

                        {/* Password */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Пароль *</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={[styles.input, styles.passwordInput]}
                                    placeholder="Минимум 6 символов"
                                    value={formData.password}
                                    onChangeText={(value) => handleInputChange('password', value)}
                                    secureTextEntry={!showPassword}
                                    editable={!isLoading}
                                    placeholderTextColor="#999"
                                />
                                <TouchableOpacity
                                    style={styles.eyeButton}
                                    onPress={() => setShowPassword(!showPassword)}
                                    disabled={isLoading}
                                >
                                    <Icon
                                        name={showPassword ? 'visibility-off' : 'visibility'}
                                        size={24}
                                        color="#666"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Confirm Password */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Подтвердите пароль *</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={[styles.input, styles.passwordInput]}
                                    placeholder="Повторите пароль"
                                    value={formData.confirmPassword}
                                    onChangeText={(value) => handleInputChange('confirmPassword', value)}
                                    secureTextEntry={!showConfirmPassword}
                                    editable={!isLoading}
                                    placeholderTextColor="#999"
                                />
                                <TouchableOpacity
                                    style={styles.eyeButton}
                                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                    disabled={isLoading}
                                >
                                    <Icon
                                        name={showConfirmPassword ? 'visibility-off' : 'visibility'}
                                        size={24}
                                        color="#666"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Register Button */}
                        <TouchableOpacity
                            style={[styles.registerButton, isLoading && styles.disabledButton]}
                            onPress={handleRegister}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.registerButtonText}>Зарегистрироваться</Text>
                            )}
                        </TouchableOpacity>

                        {/* Terms */}
                        <Text style={styles.termsText}>
                            Нажимая "Зарегистрироваться", вы соглашаетесь с нашими{' '}
                            <Text style={styles.termsLink}>Условиями использования</Text> и{' '}
                            <Text style={styles.termsLink}>Политикой конфиденциальности</Text>
                        </Text>
                    </View>

                    {/* Login Link */}
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Уже есть аккаунт? </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login' as never)}
                            disabled={isLoading}
                        >
                            <Text style={styles.loginLink}>Войти</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingVertical: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    backButton: {
        marginRight: 16,
        padding: 4,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
    form: {
        marginBottom: 30,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
    },
    inputContainer: {
        marginBottom: 20,
    },
    halfInput: {
        flex: 1,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        height: 56,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        color: '#333',
    },
    rolePickerContainer: {
        position: 'relative',
    },
    rolePicker: {
        height: 56,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        paddingHorizontal: 16,
        backgroundColor: '#f9f9f9',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rolePickerText: {
        fontSize: 16,
        color: '#333',
    },
    roleOptions: {
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        zIndex: 1000,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    roleOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    roleOptionText: {
        fontSize: 16,
        color: '#333',
    },
    selectedRoleOptionText: {
        color: '#2196F3',
        fontWeight: '500',
    },
    passwordContainer: {
        position: 'relative',
    },
    passwordInput: {
        paddingRight: 50,
    },
    eyeButton: {
        position: 'absolute',
        right: 16,
        top: 16,
        padding: 4,
    },
    registerButton: {
        height: 56,
        backgroundColor: '#2196F3',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    termsText: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        lineHeight: 18,
    },
    termsLink: {
        color: '#2196F3',
        fontWeight: '500',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto',
        paddingBottom: 20,
    },
    loginText: {
        color: '#666',
        fontSize: 14,
    },
    loginLink: {
        color: '#2196F3',
        fontSize: 14,
        fontWeight: '500',
    },
});

export default RegisterScreen;