import { View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Link } from 'expo-router';

const HeaderBar = ({ onMenuPress }: { onMenuPress?: () => void }) => {
  return (
    <View className="flex-row justify-between items-center px-6 pt-4">
      {/* Menu Button */}
      <TouchableOpacity onPress={onMenuPress}>
        <Icon name="menu" size={24} color="#0d0d0d" />
      </TouchableOpacity>

      {/* Notification + Profile */}
      <View className="flex-row items-center space-x-4">
        <TouchableOpacity>
          <Icon name="bell" size={22} color="#0d0d0d" />
        </TouchableOpacity>

        <Link href="/(tabs)/profile" asChild>
          <TouchableOpacity className="w-8 h-8 rounded-full overflow-hidden ml-4">
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
              className="w-full h-full"
            />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default HeaderBar;
