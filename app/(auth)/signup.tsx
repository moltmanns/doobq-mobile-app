import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Link } from 'expo-router';

export default function SignUp() {
  return (
    <ImageBackground
      source={require('@/assets/images/indexbg.jpg')}
      resizeMode="cover"
      className="flex-1"
    >
      {/* Page Header */}
      <View className="pt-[275px] px-6">
        <Text className="text-primary font-sans font-bold text-[48px] leading-none">
          Create an{'\n'}Account
        </Text>
      </View>

      {/* Form Box */}
      <View className="mt-6 bg-white rounded-t-3xl px-6 py-8 space-y-5 flex-1">
        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          className="border border-gray-300 rounded-full px-4 py-3 text-base text-primary font-sans mb-4"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          className="border border-gray-300 rounded-full px-4 py-3 text-base text-primary font-sans mb-4"
        />

        <TouchableOpacity className="bg-cyan-400 rounded-full py-4 flex-row items-center justify-center mt-4 mb-4">
          <Text className="text-primary font-bold text-lg mr-2">Sign up</Text>
          <Icon name="arrow-right" size={24} color="#0d0d0d" />
        </TouchableOpacity>

        <View className="flex-row items-center justify-between mt-2 mb-4">
          <View className="h-px bg-gray-300 flex-1 mr-3" />
          <Text className="text-gray-500 text-sm font-sans">or</Text>
          <View className="h-px bg-gray-300 flex-1 ml-3" />
        </View>

        <TouchableOpacity className="flex-row items-center justify-center border border-gray-300 rounded-full py-3 mt-2 mb-4">
          <Image
            source={{ uri: 'https://img.icons8.com/color/48/google-logo.png' }}
            className="w-5 h-5 mr-2"
          />
          <Text className="text-primary text-sm font-sans">Sign up with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-center border border-gray-300 rounded-full py-3 mb-8">
          <Image
            source={{ uri: 'https://img.icons8.com/color/48/facebook.png' }}
            className="w-5 h-5 mr-2"
          />
          <Text className="text-primary text-sm font-sans">Sign up with Facebook</Text>
        </TouchableOpacity>

        <Text className="text-center text-xs text-gray-400 font-sans pt-2">
          By signing up you agree to our{' '}
          <Text className="underline">Terms & Conditions</Text> and{' '}
          <Text className="underline">Privacy Policy</Text>.
        </Text>

        <Link href="/(auth)/signin" asChild>
          <TouchableOpacity className="mt-6">
            <Text className="text-center text-sm text-primary font-sans">
              Already have an account? <Text className="font-bold">Login</Text>
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ImageBackground>
  );
}
