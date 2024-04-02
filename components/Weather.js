import react from "react";
import propTypes from "prop-types";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import WeatherCity from "./WeatherCity";
import { useNavigation } from "@react-navigation/native";

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

export default function Weather({ temp, condition, weatherData, navigation }) {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.date}>{item.dt_txt}</Text>
      <Text style={styles.temp_list}>{Math.round(item.main.temp)}°C</Text>
      <Text style={styles.description}>{item.weather[0].description}</Text>
    </View>
  );
  return (
    <LinearGradient
      colors={weatherOptions[condition].color}
      style={styles.container}
    >
      <StatusBar barStyle='light-content' />

      <View style={styles.upperContainer}>
        <MaterialCommunityIcons
          name={weatherOptions[condition].iconName}
          size={250}
          color={"#ffff"}
        />
      </View>

      <View style={[styles.middleContainer, styles.textContainer]}>
        <Text style={styles.temp}>{temp}°</Text>
        <Text style={styles.title}>{weatherOptions[condition].title}</Text>
        {/*<Text style={styles.suptitle}>
          {weatherOptions[condition].subtitle}
        </Text> */}
      </View>
      <View style={styles.lowerContainer}>
        <FlatList
          style={styles.flatlist}
          data={weatherData.list}
          renderItem={renderItem}
          keyExtractor={(item) => item.dt.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("WeatherCity")}
        >
          <Text style={styles.buttonText}>Пошук погоди</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

Weather.prototypes = {
  temp: propTypes.number.isRequired,
  condition: propTypes.oneOf([
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
  navigation: propTypes.object.isRequired,
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ffff",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ffff",
  },
  buttonText: {
    color: "#000000",
    textAlign: "center",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lowtitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 10,
  },
  flatlist: {
    flexGrow: 0,
    marginTop: 20,
    marginLeft: 10,
  },
  textContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  upperContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  middleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lowerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  temp: {
    fontSize: 60,
    color: "#fff",
    fontWeight: "800",
  },
  title: {
    fontSize: 60,
    color: "black",
    fontWeight: "800",
    marginBottom: 10,
    color: "#fff",
    paddingTop: 50,
  },
  suptitle: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "600",
    color: "black",
    color: "#fff",
  },
  item: {
    backgroundColor: "#ffff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    width: 150,
  },
  date: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  temp_list: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
  },
});
