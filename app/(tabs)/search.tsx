import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
  Dimensions,
  Linking,
  Platform,
} from 'react-native';
import MapView, { Circle, Region, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = 220;

type Business = {
  id: string;
  name: string;
  rating: number;
  price: string;
  image: string;
  latitude: number;
  longitude: number;
  category: 'Food' | 'Drinks' | 'Activities' | 'Family';
};

const categoryIcons: Record<Business['category'], string> = {
  Food: '🍔',
  Drinks: '☕',
  Activities: '🎯',
  Family: '👨‍👩‍👧‍👦',
};

const categoryFilters = ['All', 'Food', 'Drinks', 'Activities', 'Family'];

export default function SearchScreen() {
  const [region, setRegion] = useState<Region | null>(null);
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filtered, setFiltered] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const flatListRef = useRef<FlatList<Business>>(null);

  const dummyBusinesses: Business[] = [
    {
      id: '1',
      name: 'Sunshine Family Restaurant West',
      rating: 4.5,
      price: '$',
      image: 'https://via.placeholder.com/300x200?text=Sunshine+Family+Restaurant+West',
      latitude: 42.5115,
      longitude: -90.7032,
      category: 'Food',
    },
    {
      id: '2',
      name: 'Betty Jane Homemade Candies',
      rating: 4.8,
      price: '$$',
      image: 'https://via.placeholder.com/300x200?text=Betty+Jane+Candies',
      latitude: 42.515,
      longitude: -90.705,
      category: 'Family',
    },
    {
      id: '3',
      name: 'Maid-Rite',
      rating: 4.2,
      price: '$',
      image: 'https://via.placeholder.com/300x200?text=Maid-Rite',
      latitude: 42.513,
      longitude: -90.704,
      category: 'Food',
    },
    {
      id: '4',
      name: 'Kennedy Mall',
      rating: 4.0,
      price: '$$',
      image: 'https://via.placeholder.com/300x200?text=Kennedy+Mall',
      latitude: 42.5,
      longitude: -90.7,
      category: 'Activities',
    },
    {
      id: '5',
      name: "Sprout - A Children's Boutique",
      rating: 4.6,
      price: '$$',
      image: 'https://via.placeholder.com/300x200?text=Sprout+Boutique',
      latitude: 42.52,
      longitude: -90.71,
      category: 'Family',
    },
  ];

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Location permission not granted');
        setLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      const coords = loc.coords;
      setLocation(coords);
      setRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.007,
        longitudeDelta: 0.007,
      });

      setBusinesses(dummyBusinesses);
      setFiltered(dummyBusinesses);
      setLoading(false);
    })();
  }, []);

  const filterResults = (text: string, category: string) => {
    let results = dummyBusinesses;

    if (category !== 'All') {
      results = results.filter((b) => b.category === category);
    }

    if (text) {
      results = results.filter((b) =>
        b.name.toLowerCase().includes(text.toLowerCase())
      );
    }

    setFiltered(results);
  };

  const handleSearchChange = (text: string) => {
    setQuery(text);
    filterResults(text, activeCategory);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    filterResults(query, cat);
  };

  const calculateDistance = (lat: number, lng: number) => {
    if (!location) return null;

    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 3958.8;

    const dLat = toRad(lat - location.latitude);
    const dLon = toRad(lng - location.longitude);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(location.latitude)) *
        Math.cos(toRad(lat)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  const openInMaps = (lat: number, lng: number, label: string) => {
    const scheme = Platform.select({
      ios: `maps:0,0?q=${label}@${lat},${lng}`,
      android: `geo:0,0?q=${lat},${lng}(${label})`,
    });

    if (scheme) {
      Linking.openURL(scheme).catch((err) =>
        console.error('Error opening map:', err)
      );
    }
  };

  const handleMarkerPress = (index: number, biz: Business) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    openInMaps(biz.latitude, biz.longitude, biz.name);
  };

  return (
    <View className="flex-1 bg-white">
      {region ? (
        <MapView
          region={region}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          showsUserLocation
          showsMyLocationButton
        >
          <Circle
            center={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            radius={3218}
            strokeWidth={2}
            strokeColor="rgba(0, 122, 255, 1)"
            fillColor="rgba(0, 122, 255, 0.1)"
          />
          {filtered.map((biz, index) => (
            <Marker
              key={biz.id}
              coordinate={{
                latitude: biz.latitude,
                longitude: biz.longitude,
              }}
              title={biz.name}
              description={`${biz.price} · ⭐ ${biz.rating}`}
              onPress={() => handleMarkerPress(index, biz)}
            />
          ))}
        </MapView>
      ) : (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}

      <View className="absolute top-6 left-4 right-4 bg-white px-4 py-2 rounded-full shadow flex-row items-center space-x-2">
        <Ionicons name="search" size={20} color="#888" className='mr-2' />
        <TextInput
          value={query}
          onChangeText={handleSearchChange}
          placeholder="Search businesses..."
          className="flex-1 text-base text-black"
          style={{ paddingVertical: 4 }}
        />
      </View>

      <View className="absolute top-20 left-0 right-0 px-4 mt-2">
        <FlatList
          horizontal
          data={categoryFilters}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleCategoryChange(item)}
              className={`px-4 py-2 mr-2 rounded-full ${
                activeCategory === item ? 'bg-primary' : 'bg-gray-100'
              }`}
            >
              <Text className={activeCategory === item ? 'text-white' : 'text-gray-800'}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View className="absolute left-0 right-0" style={{ bottom: 90 }}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" className="mt-2" />
        ) : (
          <FlatList
            ref={flatListRef}
            data={filtered}
            horizontal
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="bg-white mr-4 p-3 rounded-xl shadow w-56"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 2,
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  className="h-24 w-full rounded-lg"
                  resizeMode="cover"
                />
                <Text className="font-semibold text-base mt-2">
                  {categoryIcons[item.category]} {item.name}
                </Text>
                <Text className="text-gray-500 text-sm">
                  {item.price} · ⭐ {item.rating}
                </Text>
                {location && (
                  <Text className="text-gray-400 text-xs mt-1">
                    {calculateDistance(item.latitude, item.longitude)} mi away
                  </Text>
                )}
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
}
