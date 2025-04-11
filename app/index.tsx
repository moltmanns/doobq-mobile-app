import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import Icon from 'react-native-vector-icons/Feather';

const index = () => {
  return (
    <ImageBackground
      source={require('@/assets/images/indexbg.jpg')}
      resizeMode="cover"
      className="flex-1 justify-between"
    >
      <View className="px-6 pt-32 font-sans">
        <Text className="text-primary font-sans text-[72px] leading-none">
          Explore{'\n'}Dubuque{'\n'}with us.
        </Text>
        <Text className="text-primary font-sans text-lg mt-4">Go where the locals go!</Text>
      </View>

      <View className="bg-white rounded-t-3xl px-6 py-8">
        <Link href="/(auth)/signup" asChild>
          <TouchableOpacity className="bg-cyan-400 rounded-full py-4 flex-row items-center justify-center mb-4">
            <Text className="text-primary font-bold text-lg mr-2">Get Started</Text>
            <Icon name="arrow-right" size={24} color="black" />
          </TouchableOpacity>
        </Link>

        <Link href="/(auth)/signin" asChild>
          <TouchableOpacity>
            <Text className="text-center text-sm text-primary font-sans">
            Already have an account?{' '}
            <Text className="text-sm font-bold underline text-primary">Login</Text>
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ImageBackground>
  )
}

export default index