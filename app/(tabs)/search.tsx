import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, Dimensions } from 'react-native';
import MapView, { Circle, Region } from 'react-native-maps';
import * as Location from 'expo-location';

type Business = {
  id: string;
  name: string;
  rating: number;
  price: string;
  image: string;
};

export default function SearchScreen() {
  const [region, setRegion] = useState<Region | null>(null);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  const dummyBusinesses: Business[] = [
    { id: '1', name: 'Julien’s Coffee House', rating: 4.7, price: '$', image: 'https://via.placeholder.com/300x200?text=Coffee' },
    { id: '2', name: 'Dubuque Tacos Co.', rating: 4.3, price: '$$', image: 'https://via.placeholder.com/300x200?text=Tacos' },
    { id: '3', name: 'Riverfront BBQ', rating: 4.6, price: '$$$', image: 'https://via.placeholder.com/300x200?text=BBQ' },
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

      setRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      });

      setTimeout(() => {
        setBusinesses(dummyBusinesses);
        setLoading(false);
      }, 1000);
    })();
  }, []);

  return (
    <View className="flex-1">
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
            radius={3218} // ~2 miles in meters
            strokeWidth={2}
            strokeColor="rgba(0, 122, 255, 1)"
            fillColor="rgba(0, 122, 255, 0.1)"
          />
        </MapView>
      ) : (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}

      {/* Scrollable cards */}
      <View className="absolute left-0 right-0" style={{ bottom: 100 }}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" className="mt-2" />
        ) : (
          <FlatList
            data={businesses}
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
                  elevation: 5,
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  className="h-32 w-full rounded-lg"
                  resizeMode="cover"
                />
                <Text className="font-semibold text-base mt-2">{item.name}</Text>
                <Text className="text-gray-500 text-sm">{item.price} · ⭐ {item.rating}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
}
