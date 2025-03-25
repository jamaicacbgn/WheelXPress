import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/styles";

const ProductDetailScreen = ({ route, navigation }) => {
  // Provide defaults so setCartItems is defined.
  const { product, cartItems = [], setCartItems = () => {} } = route.params;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  // Use -1 to indicate no size is selected initially.
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(-1);
  // New state for quantity; default is 1.
  const [quantity, setQuantity] = useState(1);

  // Automatically pre-select size if product.chosenSize exists.
  useEffect(() => {
    if (product.chosenSize && product.sizes && product.sizes.length > 0) {
      const index = product.sizes.findIndex(
        (size) => size.label === product.chosenSize.label
      );
      if (index !== -1) {
        setSelectedSizeIndex(index);
      }
    }
  }, [product]);

  const getCurrentPrice = () => {
    if (!product || !product.sizes) return 0;
    const sizeObj = product.sizes[selectedSizeIndex];
    return sizeObj ? sizeObj.price : 0;
  };

  // Increase quantity state.
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  // Decrease quantity state, but never below 1.
  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = async () => {
    if (!product) return;
    // Validate that a size is selected for products with sizes.
    if (product.sizes && product.sizes.length > 0 && selectedSizeIndex === -1) {
      Alert.alert("Select Size", "Please select a size before adding to cart.");
      return;
    }
    const sizeData =
      product.sizes && product.sizes.length > 0
        ? product.sizes[selectedSizeIndex]
        : null;

    // Build a new cart item using the current selection and quantity.
    const productClone = { ...product };
    if (productClone.chosenSize) {
      delete productClone.chosenSize;
    }
    const newCartItem = {
      ...productClone,
      chosenSize: sizeData,
      quantity, // use current quantity
    };

    try {
      const storedCart = await AsyncStorage.getItem("cartItems");
      let currentCart = storedCart ? JSON.parse(storedCart) : cartItems;
      // Check if an item with the same product id and chosenSize exists.
      const existingIndex = currentCart.findIndex(
        (item) =>
          item.id === product.id &&
          item.chosenSize &&
          sizeData &&
          item.chosenSize.label === sizeData.label
      );
      let updatedCart;
      if (existingIndex !== -1) {
        // Increase quantity for the existing item.
        currentCart[existingIndex].quantity += quantity;
        updatedCart = [...currentCart];
      } else {
        updatedCart = [...currentCart, newCartItem];
      }
      setCartItems(updatedCart);
      await AsyncStorage.setItem("cartItems", JSON.stringify(updatedCart));
      Alert.alert("Success", "Item successfully added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      Alert.alert("Error", "There was an error adding the item to your cart.");
    }
  };

  const handleBuyNow = () => {
    if (product.sizes && product.sizes.length > 0 && selectedSizeIndex === -1) {
      Alert.alert("Select Size", "Please select a size before proceeding.");
      return;
    }
    const sizeData =
      product.sizes && product.sizes.length > 0
        ? product.sizes[selectedSizeIndex]
        : null;
    const productClone = { ...product };
    if (productClone.chosenSize) {
      delete productClone.chosenSize;
    }
    // Use the selected quantity in the cart item.
    const cartItem = { ...productClone, chosenSize: sizeData, quantity };
    navigation.navigate("CheckoutScreen", { cartItems: [cartItem] });
  };

  const renderImagesCarousel = () => {
    if (!product.images || product.images.length === 0) return null;
    return (
      <FlatList
        data={product.images}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.imageCarousel}
        renderItem={({ item }) => (
          <Image source={item} style={styles.carouselImage} />
        )}
      />
    );
  };

  // Dummy similar products fallback.
  const dummySimilarProducts = [
    {
      id: "dummy1",
      name: "Dummy Product 1",
      price: "₱999",
      image: require("../assets/diabloproduct1.jpg"),
    },
    {
      id: "dummy2",
      name: "Dummy Product 2",
      price: "₱1,299",
      image: require("../assets/diabloproduct1.jpg"),
    },
  ];

  const renderSimilarProducts = () => {
    const similar =
      product.similarProducts && product.similarProducts.length > 0
        ? product.similarProducts
        : dummySimilarProducts;
    return (
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
          Similar Products
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {similar.map((sp) => (
            <View
              key={sp.id}
              style={{
                width: 140,
                backgroundColor: "#fff",
                borderRadius: 8,
                marginRight: 15,
                alignItems: "center",
                padding: 10,
              }}
            >
              <Image
                source={sp.image}
                style={{ width: 100, height: 100, resizeMode: "contain" }}
              />
              <Text style={{ fontSize: 12, fontWeight: "bold", marginTop: 5 }}>
                {sp.name}
              </Text>
              <Text style={{ fontSize: 11, color: "#888" }}>{sp.price}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderRatingBars = () => {
    const ratingsDistribution = [
      { stars: 5, percent: 73 },
      { stars: 4, percent: 20 },
      { stars: 3, percent: 7 },
      { stars: 2, percent: 0 },
      { stars: 1, percent: 0 },
    ];
    return ratingsDistribution.map((item) => (
      <View
        key={item.stars}
        style={{ flexDirection: "row", alignItems: "center", marginVertical: 2 }}
      >
        <Text style={{ width: 35, fontSize: 12 }}>{item.stars} star</Text>
        <View
          style={{
            flex: 1,
            backgroundColor: "#eee",
            height: 6,
            marginHorizontal: 5,
            borderRadius: 3,
          }}
        >
          <View
            style={{
              width: `${item.percent}%`,
              backgroundColor: "#f00",
              height: "100%",
              borderRadius: 3,
            }}
          />
        </View>
        <Text style={{ width: 30, fontSize: 12, textAlign: "right" }}>
          {item.percent}%
        </Text>
      </View>
    ));
  };

  return (
    <View style={styles.detailContainer}>
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.detailHeaderTitle}>Product Detail</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView>
        <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
          {/* MAIN IMAGE WRAPPER */}
          <View style={{ position: "relative", width: "100%", height: 300 }}>
            {product.images && product.images.length > 0 && (
              <Image
                source={product.images[selectedImageIndex]}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "contain",
                }}
              />
            )}
            {product.images && product.images.length > 1 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ position: "absolute", bottom: 10, left: 0, right: 0 }}
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {product.images.map((img, index) => {
                  const isSelected = index === selectedImageIndex;
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setSelectedImageIndex(index)}
                      style={{
                        marginHorizontal: 5,
                        borderWidth: isSelected ? 2 : 0,
                        borderColor: "#000",
                        borderRadius: 5,
                      }}
                    >
                      <Image
                        source={img}
                        style={{
                          width: 60,
                          height: 60,
                          resizeMode: "contain",
                        }}
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}
          </View>

          {/* NAME AND PRICE */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Text style={styles.detailProductName}>{product.name}</Text>
            <Text style={styles.detailProductPrice}>₱{getCurrentPrice()}</Text>
          </View>

          {/* SIZES */}
          {product.sizes && product.sizes.length > 0 && (
            <View style={styles.detailSizesContainer}>
              <Text style={styles.detailSizesTitle}>Sizes</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {product.sizes.map((sizeObj, index) => {
                  const isSelected = selectedSizeIndex === index;
                  return (
                    <TouchableOpacity
                      key={sizeObj.label}
                      style={[
                        styles.detailSizeButton,
                        isSelected && styles.detailSizeButtonSelected,
                      ]}
                      onPress={() => setSelectedSizeIndex(index)}
                    >
                      <Text>{sizeObj.label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
              {selectedSizeIndex === -1 ? (
                <Text style={{ color: "red", marginTop: 5 }}>
                  Please select a size.
                </Text>
              ) : (
                <Text style={{ marginTop: 5 }}>
                  Selected Size: {product.sizes[selectedSizeIndex].label}
                </Text>
              )}
            </View>
          )}

          {/* QUANTITY SELECTOR */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", marginRight: 10 }}>
              Quantity:
            </Text>
            <TouchableOpacity
              onPress={decrementQuantity}
              style={{
                backgroundColor: "#eee",
                padding: 10,
                borderRadius: 5,
                marginRight: 10,
              }}
            >
              <Icon name="minus" size={16} color="#000" />
            </TouchableOpacity>
            <Text style={{ fontSize: 16 }}>{quantity}</Text>
            <TouchableOpacity
              onPress={incrementQuantity}
              style={{
                backgroundColor: "#eee",
                padding: 10,
                borderRadius: 5,
                marginLeft: 10,
              }}
            >
              <Icon name="plus" size={16} color="#000" />
            </TouchableOpacity>
          </View>

          {/* PRODUCT DESCRIPTION */}
          <View style={styles.detailDescriptionContainer}>
            <Text style={styles.detailDescriptionTitle}>
              Product Description
            </Text>
            <Text style={styles.detailDescriptionText}>
              {product.description}
            </Text>
          </View>

          {/* BUTTONS */}
          <View style={styles.detailButtonRow}>
            <TouchableOpacity
              style={[styles.detailActionButton, { marginRight: 10 }]}
              onPress={handleAddToCart}
            >
              <Text style={styles.detailActionButtonText}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.detailActionButton, { backgroundColor: "#000" }]}
              onPress={handleBuyNow}
            >
              <Text style={[styles.detailActionButtonText, { color: "#fff" }]}>
                Buy Now
              </Text>
            </TouchableOpacity>
          </View>

          {/* CUSTOMER REVIEWS */}
          <View style={{ marginTop: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <Text style={{ fontWeight: "600", fontSize: 16 }}>
                Customer Reviews
              </Text>
              <TouchableOpacity style={{ marginLeft: 10 }}>
                <Text style={{ color: "#007BFF" }}>View Reviews</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="star" size={16} color="#f00" />
              <Icon name="star" size={16} color="#f00" />
              <Icon name="star" size={16} color="#f00" />
              <Icon name="star" size={16} color="#f00" />
              <Icon name="star-half-full" size={16} color="#f00" />
              <Text style={{ marginLeft: 5 }}>4.5 out of 5</Text>
            </View>
            <View style={{ marginTop: 10 }}>{renderRatingBars()}</View>
          </View>

          {/* SIMILAR PRODUCTS */}
          {renderSimilarProducts()}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetailScreen;
