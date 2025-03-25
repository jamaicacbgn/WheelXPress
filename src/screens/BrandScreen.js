import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  Modal, 
  Alert 
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/styles"; 

const BrandScreen = ({ route, navigation }) => {
  const { brand } = route.params;
  const allProducts = [
    {
      id: "1",
      name: "Pirelli Diablo Rosso Sport",
      price: "₱1,000",
      brand: "Pirelli",
      image: require("../assets/diabloproduct1.jpg"),
    },
    {
      id: "2",
      name: "Pirelli corpion Trail II",
      price: "₱2,000",
      brand: "Pirelli",
      image: require("../assets/scorpionproduct1.jpg"),
    },
    {
      id: "3",
      name: "Michelin Power 6",
      price: "₱1,500",
      brand: "Michelin",
      image: require("../assets/power6product1.jpg"),
    },
    {
      id: "4",
      name: "Michelin Pilot Street Radial",
      price: "₱1,800",
      brand: "Michelin",
      image: require("../assets/pilotproduct1.jpg"),
    },
    {
      id: "5",
      name: "Motoz Tractionator Adventure",
      price: "₱2,200",
      brand: "Motoz",
      image: require("../assets/tractionatorproduct1.jpg"),
    },
    {
      id: "6",
      name: "Motoz Tractionator GPS",
      price: "₱2,500",
      brand: "Motoz",
      image: require("../assets/tractionatorgpsproduct1.jpg"),
    },
    {
      id: "7",
      name: "Shinko 016 Verge 2x",
      price: "₱3,000",
      brand: "Shinko",
      image: require("../assets/016vergeproduct1.jpg"),
    },
    {
      id: "8",
      name: "Shinko 011 Verge",
      price: "₱3,500",
      brand: "Shinko",
      image: require("../assets/011vergeproduct1.jpg"),
    },
    {
      id: "9",
      name: "Eurogrip A",
      price: "₱3,000",
      brand: "Eurogrip",
      image: require("../assets/016vergeproduct1.jpg"),
    },
    {
      id: "10",
      name: "Eurogrip B",
      price: "₱3,500",
      brand: "Eurogrip",
      image: require("../assets/011vergeproduct1.jpg"),
    },
    {
      id: "11",
      name: "Metzeler A",
      price: "₱3,000",
      brand: "Metzeler",
      image: require("../assets/016vergeproduct1.jpg"),
    },
    {
      id: "12",
      name: "Metzeler B",
      price: "₱3,500",
      brand: "Metzeler",
      image: require("../assets/011vergeproduct1.jpg"),
    },
  ];
  const brandProducts = allProducts.filter(
    (item) => item.brand.toLowerCase() === brand.toLowerCase()
  );
  const [favorites, setFavorites] = useState({});
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavs = await AsyncStorage.getItem(`favorites_${brand}`);
        if (storedFavs) {
          setFavorites(JSON.parse(storedFavs));
        }
      } catch (error) {
        console.error("Failed to load favorites", error);
      }
    };
    loadFavorites();
  }, [brand]);
  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem(`favorites_${brand}`, JSON.stringify(favorites));
      } catch (error) {
        console.error("Failed to save favorites", error);
      }
    };
    saveFavorites();
  }, [favorites, brand]);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const showFeedback = (message) => {
    setFeedbackMessage(message);
    setFeedbackVisible(true);
    setTimeout(() => setFeedbackVisible(false), 1500);
  };
  const toggleFavorite = (id, productName) => {
    setFavorites((prev) => {
      const newStatus = !prev[id];
      showFeedback(
        newStatus
          ? `Added ${productName} to favorites`
          : `Removed ${productName} from favorites`
      );
      return { ...prev, [id]: newStatus };
    });
  };
  const addToCart = (product) => {
    showFeedback(`Added ${product.name} to cart`);
  };

  const ListHeader = () => (
    <View style={{ marginBottom: 15 }}>
      <Text style={{ fontSize: 30, fontWeight: "bold" }}>{brand}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5", padding: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>
          {brand}
        </Text>
      </View>
      <Modal transparent visible={feedbackVisible} animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        >
          <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 8 }}>
            <Text style={{ fontSize: 16 }}>{feedbackMessage}</Text>
          </View>
        </View>
      </Modal>
      <FlatList
        data={brandProducts}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <View
            style={{
              width: "48%",
              backgroundColor: "#fff",
              borderRadius: 8,
              marginBottom: 15,
              padding: 10,
              position: "relative",
            }}
          >
            <TouchableOpacity
              style={{ position: "absolute", top: 5, right: 5 }}
              onPress={() => toggleFavorite(item.id, item.name)}
            >
              {favorites[item.id] ? (
                <Icon name="heart" size={22} color="red" />
              ) : (
                <Icon name="heart-o" size={22} color="red" />
              )}
            </TouchableOpacity>


            <Image
              source={item.image}
              style={{ width: "100%", height: 100, resizeMode: "contain" }}
            />

        
            <Text style={{ fontWeight: "bold", textAlign: "center", marginTop: 5 }}>
              {item.name}
            </Text>
            <Text style={{ color: "#888", textAlign: "center" }}>{item.price}</Text>

            <TouchableOpacity
              style={{ position: "absolute", bottom: 5, right: 5 }}
              onPress={() => addToCart(item)}
            >
              <Icon name="shopping-bag" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default BrandScreen;
