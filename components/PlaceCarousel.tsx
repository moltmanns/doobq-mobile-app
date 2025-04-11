import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const data = [
  {
    id: '1',
    name: 'National Mississippi River Museum',
    address: '350 E 3rd St, Dubuque, IA',
    image: 'https://www.mississippirivermuseum.com/img/visit-hero.jpg',
    rating: 4.7,
    description:
      'An educational destination with aquariums, exhibits, and river history.',
  },
  {
    id: '2',
    name: 'Fenelon Place Elevator',
    address: '512 Fenelon Pl, Dubuque, IA',
    image:
      'https://www.traveliowa.com/UserDocs/AttractionImages/fenelonplaceelevator_co_dubuque.jpg',
    rating: 4.6,
    description:
      'World’s shortest and steepest scenic railway offering panoramic city views.',
  },
  {
    id: '3',
    name: 'Hotel Julien Dubuque',
    address: '200 Main St, Dubuque, IA',
    image:
      'https://www.hoteljuliendubuque.com/files/hotel-julien-dubuque_0.jpg',
    rating: 4.5,
    description:
      'Historic boutique hotel with upscale rooms, spa, and on-site restaurant.',
  },
];

const CARD_WIDTH = Dimensions.get('window').width * 0.72;

const PlaceCarousel = () => {
  const [selected, setSelected] = useState(null);

  const renderCard = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setSelected(item)}
        className='mr-4'
      >
        <Animated.View
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(200)}
          className="w-[240px] h-36 rounded-xl overflow-hidden bg-gray-100"
        >
          <Image source={{ uri: item.image }} className="w-full h-full" />
          <View className="absolute bottom-0 left-0 right-0 p-3 bg-black/50">
            <Text className="text-white font-bold text-sm">{item.name}</Text>
            <Text className="text-white text-xs">{item.address}</Text>
            <Text className="text-yellow-300 text-xs mt-1">★ {item.rating}</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <FlatList
        data={data}
        renderItem={renderCard}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
      />

      {/* Modal on Card Tap */}
      <Modal
        visible={!!selected}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelected(null)}
      >
        <View className="flex-1 bg-black/60 justify-center items-center px-6">
          <View className="bg-white w-full rounded-2xl p-6 max-w-xl">
            <Text className="text-xl font-bold text-primary mb-1">
              {selected?.name}
            </Text>
            <Text className="text-gray-500 text-sm mb-3">{selected?.address}</Text>
            <Image
              source={{ uri: selected?.image }}
              className="w-full h-48 rounded-lg mb-3"
            />
            <Text className="text-base text-gray-700">{selected?.description}</Text>
            <Pressable
              onPress={() => setSelected(null)}
              className="mt-4 bg-cyan-400 py-2 rounded-full items-center"
            >
              <Text className="text-white font-bold">Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default PlaceCarousel;
