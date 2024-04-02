import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";
import Weather from "./Weather";
import WeatherCity from "./WeatherCity";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stak = createStackNavigator();

export default function Navigate() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Weather'>
        <Stack.Screen name='Weather' component={Weather} />
        <Stack.Screen name='WeatherCity' component={WeatherCity} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
