import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false
        }}
      />
            <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          headerShown: false
        }}
      />
            <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          headerShown: false
        }}
      />
            <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          headerShown: false
        }}
      />
                  <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false
        }}
      />
    </Tabs>
  )
}

export default _layout