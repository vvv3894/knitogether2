import { Tabs } from "expo-router";
import React from "react";
import { Image } from "react-native";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="MyBook"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require("./../../assets/images/navLogo-mybook.png")}
              style={{
                width: size,
                height: size,
                opacity: focused ? 1 : 0.4,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Shop"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require("./../../assets/images/navLogo-shop.png")}
              style={{
                width: size,
                height: size,
                opacity: focused ? 1 : 0.5,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require("./../../assets/images/navLogo-search.png")}
              style={{
                width: size,
                height: size,
                opacity: focused ? 1 : 0.5,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require("./../../assets/images/navLogo-setting.png")}
              style={{
                width: size,
                height: size,
                opacity: focused ? 1 : 0.5,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
