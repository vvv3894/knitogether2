import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="MyBook"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="book-outline" size={30} color="#431605" style={{opacity: focused ? 1 : 0.4}}/>
            /*
            <Image
              source={require("./../../assets/images/navLogo-mybook.png")}
              style={{
                width: size,
                height: size,
                opacity: focused ? 1 : 0.4,
              }}
            />
            */
          ),
        }}
      />
      <Tabs.Screen
        name="Shop"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="storefront-outline" size={30} color="#431605" style={{opacity: focused ? 1 : 0.4}}/>
            /*
            <Image
              source={require("./../../assets/images/navLogo-shop.png")}
              style={{
                width: size,
                height: size,
                opacity: focused ? 1 : 0.5,
              }}
            />
            */
          ),
        }}
      />
      {/*
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
      */}
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="settings-sharp" size={30} color="#431605" style={{opacity: focused ? 1 : 0.4}}/>
            /*
            <Image
              source={require("./../../assets/images/navLogo-setting.png")}
              style={{
                width: size,
                height: size,
                opacity: focused ? 1 : 0.5,
              }}
            />
            */
          ),
        }}
      />
    </Tabs>
  );
}
