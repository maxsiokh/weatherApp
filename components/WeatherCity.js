import React, { useState } from "react";
import "react-native-gesture-handler";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import propTypes from "prop-types";

const weatherOptions = {
  Rain: {
    iconName: "weather-pouring",
    title: "Дощ",
    subtitle: "Не забудьте взяти парасольку!",
    color: ["#2F4F4F", "#4A708B", "#6CA6CD"],
  },
  Thunderstorm: {
    iconName: "thunderstorm",
    title: "Гроза",
    subtitle: "Безпека - перш за все! Залишайтеся в безпечному місці.",
    color: ["#183A56", "#3E5C76", "#7195B2"],
  },
  Drizzle: {
    iconName: "weather-rainy",
    title: "Мряка",
    subtitle:
      "Легка мряка - ідеальний час для гарячого напою та хорошої книги.",
    color: ["#B0C4DE", "#7F7F7F", "#4A4A4A"],
  },
  Snow: {
    iconName: "weather-snowy",
    title: "Сніг",
    subtitle: "Зимова краса! Готуйтеся до гірськолижних пригод.",
    color: ["#2F4F4F", "#4A708B", "#6CA6CD"],
  },

  Smoke: {
    iconName: "smoke",
    title: "Дим",
    subtitle: "Якщо можливо, уникайте виходу на вулицю через дим.",
    color: ["#9E9E9E", "#7F7F7F", "#5E5E5E"],
  },
  Haze: {
    iconName: "weather-hazy",
    title: "Легкий туман",
    subtitle: "Природа викликає захоплення, навіть у легкому тумані.",
    color: ["#D3D3D3", "#BEBEBE", "#A9A9A9"],
  },
  Fog: {
    iconName: "weather-fog",
    title: "Туман",
    subtitle: "Вирушайте в дорогу з включеними фарами й обережно їдьте.",
    color: ["#B0B0B0", "#8B8B8B", "#696969"],
  },
  Clear: {
    iconName: "weather-sunny",
    title: "Ясно",
    subtitle: "Чудова погода для прогулянки!",
    color: ["#87CEEB", "#ADD8E6", "#E0FFFF"],
  },
  Clouds: {
    iconName: "weather-cloudy",
    title: "Хмарно",
    subtitle: "Може бути затяжний дощ або сонце, готуйтеся на все.",
    color: ["#808080", "#A9A9A9", "#D3D3D3"],
  },
  Mist: {
    iconName: "weather-fog",
    title: "Туман",
    subtitle: "Будьте обережні на дорозі - видимість обмежена.",
    color: ["#D8D8D8", "#B0B0B0", "#8A8A8A"],
  },
};
const WeatherCity = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = "158445bf437b82fdd8922a9f07b50d78";

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=uk`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Введіть Місто'
        value={city}
        onChangeText={(text) => setCity(text)}
      />
      <Button title='Пошук' onPress={fetchWeather} />
      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.text}>City: {weatherData.name}</Text>
          <Text style={styles.text}>
            Temperature: {weatherData.main.temp}°C
          </Text>
          <Text style={styles.text}>Weather: {weatherData.discription}</Text>
        </View>
      )}
    </View>
  );
};
weatherOptions.prototypes = {
  temp: propTypes.number.isRequired,
  weatherData: propTypes.oneOf([
    "Thunderstorm",
    "Drizzle",
    "Rain",
    "Snow",
    "Mist",
    "Smoke",
    "Haze",
    "Fog",
    "Clear",
    "Clouds",
  ]).isRequired,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: 200,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default WeatherCity;
