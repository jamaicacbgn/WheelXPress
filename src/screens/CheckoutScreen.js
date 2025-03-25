import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Alert,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../styles/styles"; 

const CheckoutScreen = ({ route, navigation }) => {
  const { cartItems = [] } = route.params;
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [customerNote, setCustomerNote] = useState("");
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false);
  const shippingFee = 600;
  const totalItemsPrice = cartItems.reduce((sum, item) => {
    const price = item.chosenSize ? item.chosenSize.price : item.price || 0;
    return sum + price * (item.quantity || 1);
  }, 0);

  const total = totalItemsPrice + shippingFee;
  const renderCartItem = ({ item }) => {
    const price = item.chosenSize ? item.chosenSize.price : item.price || 0;
    return (
      <View style={styles.checkoutItemContainer}>
        <Image
          source={
            item.image
              ? { uri: item.image }
              : require("../assets/diabloproduct1.jpg")
          }
          style={styles.checkoutItemImage}
        />
        <View style={{ flex: 1 }}>
          {item.brand && (
            <Text style={styles.checkoutItemBrand}>{item.brand}</Text>
          )}
          <Text style={styles.checkoutItemName}>
            {item.name || "Product name"}
          </Text>
          <Text style={styles.checkoutItemDescription}>
            {item.description || "Description"}
          </Text>
          <Text style={styles.checkoutItemQuantity}>
            Quantity: {item.quantity || 1}
          </Text>
        </View>
        <View style={{ justifyContent: "center" }}>
          <Text style={styles.checkoutItemPrice}>
            ₱{price * (item.quantity || 1)}
          </Text>
        </View>
      </View>
    );
  };
  const handleMakeAppointment = () => {
    Alert.alert("Appointment", "Make an appointment function here.");
  };

  const handlePlaceOrder = () => {
    Alert.alert("Order Placed", "Your order has been placed successfully!");
  };

  const handleEditPayment = () => {
    setPaymentModalVisible(true);
  };

  const selectPaymentMethod = (method) => {
    setPaymentMethod(method);
    setPaymentModalVisible(false);
  };

  const renderListHeader = () => (
    <View>
      <View style={styles.checkoutRow}>
        <Text style={styles.checkoutRowTitle}>Shipping</Text>
        <TextInput
          style={[styles.checkoutRowValue, { textAlign: "right" }]}
          placeholder="Add shipping address"
          placeholderTextColor="#aaa"
          value={shippingAddress}
          onChangeText={setShippingAddress}
        />
      </View>
      <View style={styles.checkoutDivider} />
      <TouchableOpacity style={styles.checkoutRow} onPress={handleEditPayment}>
        <Text style={styles.checkoutRowTitle}>Payment</Text>
        <Text style={[styles.checkoutRowValue, { textAlign: "right" }]}>
          {paymentMethod || "Visa *1234"}
        </Text>
      </TouchableOpacity>
      <View style={styles.checkoutDivider} />
      <Text style={styles.checkoutNoteTitle}>Order Notes</Text>
      <TextInput
        style={styles.checkoutNoteInput}
        placeholder="Notes about your order"
        placeholderTextColor="#aaa"
        value={customerNote}
        onChangeText={setCustomerNote}
      />
    </View>
  );
  const renderListFooter = () => (
    <View>
      <View style={styles.checkoutSummaryRow}>
        <Text style={styles.checkoutSummaryLabel}>Shipping Fee</Text>
        <Text style={styles.checkoutSummaryValue}>₱{shippingFee}</Text>
      </View>
      <View style={styles.checkoutSummaryRow}>
        <Text style={[styles.checkoutSummaryLabel, { fontWeight: "bold" }]}>
          Total
        </Text>
        <Text style={[styles.checkoutSummaryValue, { fontWeight: "bold" }]}>
          ₱{total.toLocaleString()}
        </Text>
      </View>
      <TouchableOpacity onPress={handleMakeAppointment}>
        <Text style={styles.checkoutAppointmentLink}>Make an appointment</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.checkoutHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.checkoutHeaderTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderCartItem}
        ListHeaderComponent={renderListHeader}
        ListFooterComponent={renderListFooter}
        contentContainerStyle={[styles.checkoutScrollContainer, { paddingBottom: 100 }]}
      />
      <View style={styles.checkoutFooter}>
        <TouchableOpacity
          style={styles.checkoutPlaceOrderButton}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.checkoutPlaceOrderButtonText}>Place order</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={isPaymentModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPaymentModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Payment Method</Text>
            {[
              "Walk-in Cash",
              "Cash on Delivery",
              "Gcash",
              "Paypal",
              "Maya",
              "Credit Card",
            ].map((method) => (
              <TouchableOpacity
                key={method}
                onPress={() => selectPaymentMethod(method)}
              >
                <Text style={styles.modalOption}>{method}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setPaymentModalVisible(false)}>
              <Text style={styles.modalCloseButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CheckoutScreen;
