import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { useAuth } from '../../src/auth/AuthContext';
import { Button } from '../../src/components/ui/Button';
import { Input } from '../../src/components/ui/Input';
import { useI18n } from '../../src/i18n/I18nProvider';

export default function LoginScreen() {
  const { login } = useAuth();
  const { t, isBurmese } = useI18n();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    if (!email.trim() || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    try {
      await login(email.trim(), password);
      router.replace('/(tabs)');
    } catch (e: any) {
      setError(e?.message ?? t('somethingWentWrong'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView className="flex-1 bg-white dark:bg-slate-900" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerClassName="flex-grow px-6 py-12 justify-center gap-6" keyboardShouldPersistTaps="handled">
        {/* Logo / brand */}
        <View className="items-center gap-2 mb-4">
          <Text className="text-4xl font-bold text-indigo-600">Archer</Text>
          <Text className={`text-slate-500 dark:text-slate-400 text-center ${isBurmese ? 'leading-relaxed' : ''}`}>
            {t('signInCopy')}
          </Text>
        </View>

        {/* Form */}
        <View className="gap-4">
          <Input
            label={t('emailAddress')}
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
          />
          <Input
            label={t('password')}
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            textContentType="password"
            error={error || undefined}
          />
        </View>

        {/* Demo hint */}
        <View className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
          <Text className="text-xs text-slate-500 dark:text-slate-400 text-center">
            Demo: admin@archer.dev / freelancer@archer.dev / client@archer.dev · password: password123
          </Text>
        </View>

        <Button label={t('signIn')} onPress={handleLogin} loading={loading} />

        <View className="flex-row justify-center gap-1">
          <Text className="text-slate-500 dark:text-slate-400">{t('alreadyHaveAccount')}</Text>
          <Link href="/(auth)/register" asChild>
            <Text className="text-indigo-600 font-medium">{t('createAccount')}</Text>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
