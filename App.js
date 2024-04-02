import React, { useState, useEffect } from "react";
import { Alert, Button } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import LoadingScreen from "./components/LoadingScreen";
import Weather from "./components/Weather";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WeatherCity from "./components/WeatherCity";
import * as Font from "expo-font";

const API_KEY = "158445bf437b82fdd8922a9f07b50d78";
const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [condition, setCondition] = useState("");

  const getWeather = async (latitude, longitude) => {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=uk`
      );
      setWeatherData(data);
      setCondition(data.list[0].weather[0].main);
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Помилка", "Не вдалося отримати дані про погоду.");
      setIsLoading(false);
    }
  };

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Помилка",
          "Потрібно дозвіл на доступ до місцезнаходження."
        );
        setIsLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      await getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert("Помилка", "Не вдалося отримати місцезнаходження.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Weather' options={{ title: "Погода" }}>
          {(props) => (
            <Weather
              {...props}
              temp={Math.round(weatherData.list[1].main.temp)}
              condition={condition}
              weatherData={weatherData}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name='WeatherCity'
          options={{ title: "Пошук погоди" }}
          component={WeatherCity}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
