import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
// Ensure you have installed this package:
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import styles from "../styles/styles"; // Your unified styles file

const CartScreen = ({ route, navigation }) => {
  const { cartItems = [], setCartItems } = route.params;

  const [cartData, setCartData] = useState([]);
  const [filteredCartData, setFilteredCartData] = useState([]);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedForDeletion, setSelectedForDeletion] = useState({});
  const [selectedForCheckout, setSelectedForCheckout] = useState({});
  // Controls the "expanded" search bar
  const [showSearch, setShowSearch] = useState(false);
  // Holds the user’s search text
  const [searchQuery, setSearchQuery] = useState("");

  // -- NEW STATES FOR FILTER MODAL --
  const [showFilter, setShowFilter] = useState(false);
  const [filterBrand, setFilterBrand] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterPriceMin, setFilterPriceMin] = useState("");
  const [filterPriceMax, setFilterPriceMax] = useState("");

  // Load cart from AsyncStorage or fallback to route.params
  const loadCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem("cartItems");
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        setCartData(parsedCart);
        if (typeof setCartItems === "function") {
          setCartItems(parsedCart);
        }
      } else {
        const initialData = cartItems.map((item) => ({
          ...item,
          quantity: item.quantity || 1,
        }));
        setCartData(initialData);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  // Load cart on mount or when cartItems changes
  useEffect(() => {
    loadCart();
  }, [cartItems, setCartItems]);

  // Also reload cart when screen refocuses
  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, [])
  );

  // Update parent's cartItems and AsyncStorage whenever cartData changes
  useEffect(() => {
    if (typeof setCartItems === "function") {
      setCartItems(cartData);
    }
    AsyncStorage.setItem("cartItems", JSON.stringify(cartData)).catch((err) =>
      console.error("Error saving cart:", err)
    );
    filterCart(searchQuery, cartData);
  }, [cartData, setCartItems, searchQuery]);

  // Filter cart items by name based on the search query
  const filterCart = (query, data = cartData) => {
    if (!query) {
      setFilteredCartData(data);
    } else {
      const lowerQuery = query.toLowerCase();
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(lowerQuery)
      );
      setFilteredCartData(filtered);
    }
  };

  // Called whenever the user types in the search bar
  const handleSearch = (query) => {
    setSearchQuery(query);
    filterCart(query);
  };

  // Increase quantity
  const incrementQuantity = (index) => {
    setCartData((prev) => {
      const updated = [...prev];
      updated[index].quantity += 1;
      return updated;
    });
  };

  // Decrease quantity or prompt removal if quantity is 1
  const decrementQuantity = (index) => {
    if (cartData[index].quantity === 1) {
      Alert.alert(
        "Remove Item",
        "Do you want to remove this item from your cart?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Remove",
            style: "destructive",
            onPress: () => {
              setCartData((prev) => {
                const updated = [...prev];
                updated.splice(index, 1);
                return updated;
              });
            },
          },
        ],
        { cancelable: true }
      );
    } else {
      setCartData((prev) => {
        const updated = [...prev];
        updated[index].quantity -= 1;
        return updated;
      });
    }
  };

  // Toggle delete mode; clear selections if exiting
  const toggleDeleteMode = () => {
    if (deleteMode) {
      setSelectedForDeletion({});
    }
    setDeleteMode(!deleteMode);
  };

  // Toggle item selection for deletion
  const toggleItemDeletionSelection = (index) => {
    setSelectedForDeletion((prev) => {
      const newSelections = { ...prev };
      if (newSelections[index]) {
        delete newSelections[index];
      } else {
        newSelections[index] = true;
      }
      return newSelections;
    });
  };

  // Toggle item selection for checkout
  const toggleCheckoutSelection = (index) => {
    setSelectedForCheckout((prev) => {
      const newSelections = { ...prev };
      if (newSelections[index]) {
        delete newSelections[index];
      } else {
        newSelections[index] = true;
      }
      return newSelections;
    });
  };

  // Delete selected items
const deleteSelectedItems = () => {
  // Check if no item is selected for deletion
  if (Object.keys(selectedForDeletion).length === 0) {
    Alert.alert("Selection Required", "Please select at least one item to remove.");
    return;
  }
  Alert.alert(
    "Remove",
    "Are you sure you want to remove the selected item(s)?",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => {
          const newCartData = cartData.filter((_, i) => !selectedForDeletion[i]);
          setCartData(newCartData);
          setSelectedForDeletion({});
          setDeleteMode(false);
        },
      },
    ],
    { cancelable: true }
  );
};


  // Calculate total items
  const totalItems = cartData.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate total price for selected items (for checkout)
  const totalPrice = cartData
    .filter((_, i) => selectedForCheckout[i])
    .reduce((sum, item) => {
      const price = item.chosenSize ? item.chosenSize.price : item.price || 0;
      return sum + price * item.quantity;
    }, 0);

  // Check if all items are selected for deletion or checkout
  const allDeleteSelected =
    cartData.length > 0 && cartData.every((_, i) => selectedForDeletion[i]);
  const allCheckoutSelected =
    cartData.length > 0 && cartData.every((_, i) => selectedForCheckout[i]);

  // Toggle "Select All" in delete mode
  const toggleSelectAllDeletion = () => {
    if (allDeleteSelected) {
      setSelectedForDeletion({});
    } else {
      const all = {};
      cartData.forEach((_, i) => {
        all[i] = true;
      });
      setSelectedForDeletion(all);
    }
  };

  // Toggle "Select All" in checkout mode
  const toggleSelectAllCheckout = () => {
    if (allCheckoutSelected) {
      setSelectedForCheckout({});
    } else {
      const all = {};
      cartData.forEach((_, i) => {
        all[i] = true;
      });
      setSelectedForCheckout(all);
    }
  };

  // Navigate to product detail
  const handleViewDetails = (item) => {
    navigation.navigate("ProductDetailScreen", {
      product: item,
      cartItems,
      setCartItems,
    });
  };

  // Proceed to checkout with selected items
  const proceedToCheckout = () => {
    const selectedItems = cartData.filter((_, i) => selectedForCheckout[i]);
    if (selectedItems.length === 0) {
      Alert.alert("Selection Required", "Please select at least one item for checkout.");
    } else {
      navigation.navigate("CheckoutScreen", { cartItems: selectedItems });
    }
  };

  // ================================
  // APPLY FILTER LOGIC
  // ================================
  const applyFilter = () => {
    let newFiltered = cartData;
  
    // Filter by brand: use the brand property if available; otherwise, check item name.
    if (filterBrand.trim() !== "") {
      newFiltered = newFiltered.filter((item) => {
        // If item has a brand property, use it for comparison.
        if (item.brand) {
          return item.brand.toLowerCase() === filterBrand.toLowerCase();
        } else {
          // Fallback: check if the item name includes the brand (e.g., "michelin")
          return item.name.toLowerCase().includes(filterBrand.toLowerCase());
        }
      });
    }
  
    // Filter by name
    if (filterName.trim() !== "") {
      newFiltered = newFiltered.filter((item) =>
        item.name.toLowerCase().includes(filterName.toLowerCase())
      );
    }
  
    // Filter by price range
    const minPrice = parseFloat(filterPriceMin) || 0;
    const maxPrice = parseFloat(filterPriceMax) || Infinity;
    newFiltered = newFiltered.filter((item) => {
      const price = item.chosenSize ? item.chosenSize.price : item.price || 0;
      return price >= minPrice && price <= maxPrice;
    });
  
    setFilteredCartData(newFiltered);
    setShowFilter(false);
  };

  // ================================
  // CLEAR FILTERS
  // ================================
  const clearFilters = () => {
    setFilterBrand("");
    setFilterName("");
    setFilterPriceMin("");
    setFilterPriceMax("");
    setFilteredCartData(cartData); // reset to full cart
    setShowFilter(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      {/* TOP HEADER ROW */}
      {!showSearch ? (
        // If NOT searching, show: Cart(X), Filter icon, Search icon, Trash icon
        <View style={styles.cartHeader}>
          <Text style={styles.cartHeaderTitle}>Cart ({totalItems})</Text>
          <View style={{ flex: 1 }} />
          <TouchableOpacity style={{ marginRight: 20 }} onPress={() => setShowFilter(true)}>
            <Icon name="sliders" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginRight: 20 }} onPress={() => setShowSearch(true)}>
            <Icon name="search" size={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleDeleteMode}>
            {deleteMode ? (
              <Text style={{ fontSize: 16, color: "#007BFF" }}>Cancel</Text>
            ) : (
              <Icon name="trash" size={20} color="#000" />
            )}
          </TouchableOpacity>
        </View>
      ) : (
        // If searching, show: Cart(X), expanded TextInput, Filter icon, Cancel
        <View style={styles.cartHeader}>
          <Text style={styles.cartHeaderTitle}>Cart ({totalItems})</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
              marginLeft: 10,
              backgroundColor: "#f9f9f9",
              borderRadius: 8,
              paddingHorizontal: 10,
              height: 40,
            }}
          >
            <Icon name="search" size={18} color="#000" style={{ marginRight: 5 }} />
            <TextInput
              style={{ flex: 1, height: "100%" }}
              placeholder="Search"
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
          <TouchableOpacity style={{ marginLeft: 10, marginRight: 10 }} onPress={() => setShowFilter(true)}>
            <Icon name="sliders" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowSearch(false);
              setSearchQuery("");
              filterCart("");
            }}
          >
            <Text style={{ fontSize: 16, color: "#007BFF" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* "ALL" SELECTION ROW - Checkbox for selecting all items */}
      {deleteMode ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#fff",
            paddingHorizontal: 15,
            paddingVertical: 8,
          }}
        >
          <TouchableOpacity onPress={toggleSelectAllDeletion}>
            <Icon
              name={allDeleteSelected ? "check-square" : "square-o"}
              size={20}
              color="#000"
            />
          </TouchableOpacity>
          <Text style={{ marginLeft: 10, fontSize: 16 }}>All</Text>
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#fff",
            paddingHorizontal: 15,
            paddingVertical: 8,
          }}
        >
          <TouchableOpacity onPress={toggleSelectAllCheckout}>
            <Icon
              name={allCheckoutSelected ? "check-square" : "square-o"}
              size={20}
              color="#000"
            />
          </TouchableOpacity>
          <Text style={{ marginLeft: 10, fontSize: 16 }}>All</Text>
        </View>
      )}

      {/* CART ITEMS */}
      <ScrollView style={{ paddingHorizontal: 20, marginTop: 10 }}>
        {filteredCartData.length > 0 ? (
          filteredCartData.map((item, index) => {
            const isSelected = deleteMode
              ? !!selectedForDeletion[index]
              : !!selectedForCheckout[index];
            const toggleSelection = deleteMode
              ? () => toggleItemDeletionSelection(index)
              : () => toggleCheckoutSelection(index);

            return (
              <View key={index} style={styles.cartItemContainer}>
                <TouchableOpacity
                  onPress={toggleSelection}
                  style={{ marginRight: 8, justifyContent: "center", alignItems: "center" }}
                >
                  <Icon
                    name={isSelected ? "check-square" : "square-o"}
                    size={20}
                    color="#000"
                  />
                </TouchableOpacity>
                <Image
                  source={
                    item.image
                      ? { uri: item.image }
                      : require("../assets/diabloproduct1.jpg")
                  }
                  style={styles.cartItemImageNew}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.cartItemNameNew} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.cartItemPriceNew}>
                    {item.chosenSize ? item.chosenSize.price : item.price || "₱0"}
                  </Text>
                  <TouchableOpacity onPress={() => handleViewDetails(item)}>
                    <Text style={styles.viewDetailsText}>View details</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => incrementQuantity(index)}
                  >
                    <Icon name="plus" size={14} color="#000" />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => decrementQuantity(index)}
                  >
                    <Icon name="minus" size={14} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        ) : (
          <Text style={styles.emptyCartText}>Your cart is empty.</Text>
        )}
      </ScrollView>

      {/* FOOTER: Total price displayed on left side of the checkout button */}
      {!deleteMode && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 20,
            marginVertical: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>
              Total: ₱{totalPrice.toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.checkoutButton,
              {
                backgroundColor: "#000",
                width: 200,
                justifyContent: "center",
                paddingVertical: 10,
              },
            ]}
            onPress={proceedToCheckout}
          >
            <Text style={[styles.checkoutButtonText, { textAlign: "center", color: "#fff" }]}>
              PROCEED TO CHECKOUT
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {deleteMode && (
        <TouchableOpacity
          style={[
            styles.checkoutButton,
            {
              backgroundColor: "#f00",
              marginHorizontal: 20,
              marginVertical: 10,
              paddingVertical: 10,
            },
          ]}
          onPress={deleteSelectedItems}
        >
          <Text style={[styles.checkoutButtonText, { textAlign: "center", color: "#fff" }]}>
            REMOVE
          </Text>
        </TouchableOpacity>
      )}

      {/* ===================== FILTER MODAL ===================== */}
      <Modal
        visible={showFilter}
        transparent
        animationType="fade"
        onRequestClose={() => setShowFilter(false)}
      >
        <View style={styles.filterModalOverlay}>
          <View style={styles.filterModalContainer}>
            <Text style={styles.filterModalTitle}>Filter</Text>

            {/* BRAND Filter (Dropdown) */}
            <Text style={{ marginBottom: 5, fontWeight: "600" }}>Brand</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 4,
                marginBottom: 15,
              }}
            >
              <Picker
                selectedValue={filterBrand}
                onValueChange={(val) => setFilterBrand(val)}
              >
                <Picker.Item label="Select Brand" value="" />
                <Picker.Item label="Eurogrip" value="Eurogrip" />
                <Picker.Item label="Pirelli" value="Pirelli" />
                <Picker.Item label="Shinko" value="Shinko" />
                <Picker.Item label="Motoz" value="Motoz" />
                <Picker.Item label="Michelin" value="Michelin" />
                <Picker.Item label="Metzeller" value="Metzeller" />
              </Picker>
            </View>

            {/* NAME Filter */}
            <TextInput
              style={styles.filterInput}
              placeholder="Name"
              value={filterName}
              onChangeText={setFilterName}
            />

            {/* PRICE RANGE LABEL */}
            <Text style={{ marginBottom: 5, fontWeight: "600" }}>Price Range</Text>
            {/* Price Range Inputs */}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TextInput
                style={[styles.filterInput, { flex: 1, marginRight: 5 }]}
                placeholder="Min"
                keyboardType="numeric"
                value={filterPriceMin}
                onChangeText={setFilterPriceMin}
              />
              <TextInput
                style={[styles.filterInput, { flex: 1, marginLeft: 5 }]}
                placeholder="Max"
                keyboardType="numeric"
                value={filterPriceMax}
                onChangeText={setFilterPriceMax}
              />
            </View>

            {/* Buttons: Cancel / Apply */}
            <View style={styles.filterModalButtons}>
              <TouchableOpacity
                style={[styles.filterButton, styles.filterClearButton]}
                onPress={clearFilters}
              >
                <Text style={styles.filterButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton} onPress={applyFilter}>
                <Text style={styles.filterButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CartScreen;
