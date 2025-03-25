// BrandScreen.js
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
import styles from "../styles/styles"; // adjust or add styles as needed

const BrandScreen = ({ route, navigation }) => {
  // Retrieve the brand name from route parameters
  const { brand } = route.params;

  // Sample product data with a brand property
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
    // Add more products as needed
  ];

  // Filter products for the selected brand (case-insensitive)
  const brandProducts = allProducts.filter(
    (item) => item.brand.toLowerCase() === brand.toLowerCase()
  );

  // Local state to track favorite status for each product
  // Structure: { productId: true/false }
  const [favorites, setFavorites] = useState({});

  // Load favorites for this brand from AsyncStorage on mount
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

  // Save favorites for this brand whenever they change
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

  // State for custom feedback modal
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Show feedback modal for 1.5 seconds
  const showFeedback = (message) => {
    setFeedbackMessage(message);
    setFeedbackVisible(true);
    setTimeout(() => setFeedbackVisible(false), 1500);
  };

  // Toggle favorite status for a given product id
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

  // Dummy function for adding to cart
  const addToCart = (product) => {
    showFeedback(`Added ${product.name} to cart`);
  };

  // Header for FlatList
  const ListHeader = () => (
    <View style={{ marginBottom: 15 }}>
      <Text style={{ fontSize: 30, fontWeight: "bold" }}>{brand}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5", padding: 20 }}>
      {/* Top Header Bar */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>
          {brand}
        </Text>
      </View>

      {/* Feedback Modal */}
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

      {/* Product Grid */}
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
            {/* Heart Icon */}
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

            {/* Product Image */}
            <Image
              source={item.image}
              style={{ width: "100%", height: 100, resizeMode: "contain" }}
            />

            {/* Name & Price */}
            <Text style={{ fontWeight: "bold", textAlign: "center", marginTop: 5 }}>
              {item.name}
            </Text>
            <Text style={{ color: "#888", textAlign: "center" }}>{item.price}</Text>

            {/* Shopping Bag Icon */}
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
