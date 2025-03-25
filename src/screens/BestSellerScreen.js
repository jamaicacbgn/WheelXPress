import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const BestSellerScreen = ({ route, navigation }) => {
  const { bestSellers } = route.params;

  const markFavorite = (product) => {
    alert(`Marked ${product.name} as favorite`);
  };

  const addToCart = (product) => {
    alert(`Added ${product.name} to cart`);
  };

  const renderPrice = (item) => {
    if (item.sizes && item.sizes.length > 0) {
      const prices = item.sizes.map((size) => size.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      return (
        <Text style={{ color: "#888", textAlign: "center" }}>
          ₱{minPrice} - ₱{maxPrice}
        </Text>
      );
    }
    return null;
  };

  const ListHeader = () => (
    <View style={{ marginBottom: 15 }}>
      <Text style={{ fontSize: 30, fontWeight: "bold" }}>Best Sellers</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5", padding: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>
          Best Sellers
        </Text>
      </View>


      <FlatList
        data={bestSellers}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ListHeaderComponent={ListHeader}
        renderItem={({ item }) => (
          <View
            style={{
              width: "48%",
              backgroundColor: "#fff",
              padding: 10,
              borderRadius: 8,
              marginBottom: 15,
              position: "relative",
            }}
          >

            <TouchableOpacity
              style={{ position: "absolute", top: 5, right: 5 }}
              onPress={() => markFavorite(item)}
            >
              <Icon name="heart-o" size={22} color="red" />
            </TouchableOpacity>

            <Image
              source={item.images[0]}
              style={{ width: "100%", height: 100, resizeMode: "contain" }}
            />
            <Text style={{ fontWeight: "bold", textAlign: "center", marginTop: 5 }}>
              {item.name}
            </Text>
            {renderPrice(item)}

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

export default BestSellerScreen;
