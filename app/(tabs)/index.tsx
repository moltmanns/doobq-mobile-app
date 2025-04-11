import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import PlaceCarousel from '@/components/PlaceCarousel';

const categories = [
  { id: 'restaurant', label: 'Restaurant', icon: 'coffee', selected: true },
  { id: 'outdoors', label: 'Outdoors', icon: 'tree' },
  { id: 'culture', label: 'Culture', icon: 'book-open' },
  { id: 'events', label: 'Events', icon: 'calendar' },
  { id: 'family', label: 'Family', icon: 'users' },
];

const recommendations = [
  {
    id: 1,
    name: "Mario's Italian Restaurant",
    address: '1298 Main St, Dubuque, IA 52001',
    reviews: '704+',
    image:
      'https://s3-media0.fl.yelpcdn.com/bphoto/hvGStlKH-3Oi3OAIEMX4MA/l.jpg',
  },
  {
    id: 2,
    name: 'Brazen Open Kitchen | Bar',
    address: '955 Washington St #101, Dubuque, IA 52001',
    reviews: '869+',
    image:
      'https://s3-media0.fl.yelpcdn.com/bphoto/_nGMeyZXL3Z4tD_9s7cAsw/l.jpg',
  },
  {
    id: 3,
    name: "Kelly's Cafe",
    address: '2370 Rhomberg Ave, Dubuque, IA 52001',
    reviews: '121+',
    image:
      'https://s3-media0.fl.yelpcdn.com/bphoto/IHtYwJ7zxY3W7KBgF6QqVw/l.jpg',
  },
  {
    id: 4,
    name: 'L. May Eatery',
    address: '1072 Main St, Dubuque, IA 52001',
    reviews: '245+',
    image:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/fb/15/b4/l-may-eatery.jpg',
  },
  {
    id: 5,
    name: '7 Hills Brewing Co.',
    address: '1085 Washington St, Dubuque, IA 52001',
    reviews: '562+',
    image:
      'https://s3-media0.fl.yelpcdn.com/bphoto/dfqNnWv1cdJYcB04MExPMg/l.jpg',
  },
];

export default function Index() {
  return (
      <ScrollView className="px-6 pt-4 bg-white" showsVerticalScrollIndicator={false}>
        {/* Popular Places */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold text-primary">Popular places</Text>
          <TouchableOpacity>
            <Text className="text-sm text-gray-500">see all</Text>
          </TouchableOpacity>
        </View>
        <PlaceCarousel />

        {/* Categories */}
        <View className="flex-row justify-between items-center mt-6 mb-4">
          <Text className="text-lg font-bold text-primary">Categories</Text>
          <TouchableOpacity>
            <Text className="text-sm text-gray-500">see all</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between mb-4">
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              className={`w-16 h-16 rounded-full items-center justify-center ${
                cat.selected ? 'bg-cyan-400' : 'border border-gray-300'
              }`}
            >
              <Icon
                name={cat.icon}
                size={20}
                color={cat.selected ? '#ffffff' : '#0d0d0d'}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Recommendations */}
        <View className="flex-row justify-between items-center mt-6 mb-4">
          <Text className="text-lg font-bold text-primary">
            What's near you
          </Text>
          <TouchableOpacity>
            <Text className="text-sm text-gray-500">see all</Text>
          </TouchableOpacity>
        </View>

        {recommendations.map((place) => (
          <View
            key={place.id}
            className="flex-row items-center mb-4 p-3 border border-gray-200 rounded-xl"
          >
            <Image
              source={{ uri: place.image }}
              className="w-16 h-16 rounded-lg mr-3"
            />
            <View className="flex-1">
              <Text className="text-base font-semibold text-primary">
                {place.name}
              </Text>
              <Text className="text-xs text-gray-500">{place.address}</Text>
              <Text className="text-xs text-yellow-500 mt-1">
                ⭐ {place.reviews} Reviews
              </Text>
            </View>
            <TouchableOpacity>
              <Text className="text-lg text-gray-400">♡</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
  );
}
