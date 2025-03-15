import React, { useState } from "react";
import { View, Text, ScrollView, ImageBackground, TouchableOpacity, TextInput, Image, Modal } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "../styles/styles";
import { useNavigation } from '@react-navigation/native';

// Sample Data
const bestSellers = [
  { id: 1, source: require("../assets/Tire1.png") },
  { id: 2, source: require("../assets/Tire2.png") },
  { id: 3, source: require("../assets/Tire3.png") },
  { id: 4, source: require("../assets/Tire4.png") },
  { id: 5, source: require("../assets/tire5.png") },
];

const products = [
  { id: 1, image: require("../assets/Product1.png"), title: "Tire 1", price: "₱1,200" },
  { id: 2, image: require("../assets/Product2.png"), title: "Tire 2", price: "₱1,500" },
  { id: 3, image: require("../assets/Product3.jpg"), title: "Tire 3", price: "₱1,800" },
];

const brands = [
  { id: 1, source: require("../assets/brand1.png") },
  { id: 2, source: require("../assets/brand1.png") },
  { id: 3, source: require("../assets/brand1.png") },
];

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigation = useNavigation();

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  }

  const navigateTo = (screen) => {
    setSidebarVisible(false);
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.iconButton} onPress={toggleSidebar}>
          <Icon name="bars" size={24} color="#000" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="filter" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="shopping-cart" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="comments" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={sidebarVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleSidebar}>
        <View style={styles.sidebarOverlay}>
          <View style={styles.sidebar}>
            <TouchableOpacity onPress={toggleSidebar}>
              <Text style={styles.closeSidebar}>Close</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigateTo('Home')}>
              <Text style={styles.sidebarItem}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo('Orders')}>
              <Text style={styles.sidebarItem}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo('Service')}>
              <Text style={styles.sidebarItem}>Service</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo('Settings')}>
              <Text style={styles.sidebarItem}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo('Logout')}>
              <Text style={styles.sidebarItem}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Image
        source={require("../assets/Topimage.png")}
        style={styles.fullWidthImage}
      />

      <Text style={styles.sectionTitle}>Brands</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
        contentContainerStyle={{ flexDirection: 'row-reverse' }}
      >
        {brands.map((brand) => (
          <View key={brand.id} style={styles.productCard}>
            <Image source={brand.source} style={styles.brandImage} />
          </View>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Best Sellers</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollContainer}
          contentContainerStyle={{ flexDirection: 'row-reverse' }}
        >
          {bestSellers.map((item) => (
            <View key={item.id} style={styles.productCard}>
              <ImageBackground
                source={item.source}
                style={styles.productImageBackground}
                imageStyle={styles.productImage}
              >
                <Text style={styles.productText}>{item.title}</Text>
                <Text style={styles.productText}>{item.price}</Text>
              </ImageBackground>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Products</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollContainer}
        >
          {products.map((item) => (
            <View key={item.id} style={styles.productCard}>
              <ImageBackground
                source={item.image}
                style={styles.productImageBackground}
                imageStyle={styles.productImage}
              >
                <Text style={styles.productText}>{item.title}</Text>
                <Text style={styles.productText}>{item.price}</Text>
              </ImageBackground>
            </View>
          ))}
        </ScrollView>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <Text style={styles.footerText}>The KidFromManila is committed to helping tire dealers...</Text>
          <View style={styles.footerSocial}>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Follow us on Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Follow us on Twitter</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footerLinks}>
          <View style={styles.footerColumn}>
            <Text style={styles.footerColumnTitle}>Products</Text>
            <TouchableOpacity><Text style={styles.footerColumnItem}>KidFromManila Online</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.footerColumnItem}>KidFromManila In-Store</Text></TouchableOpacity>
          </View>
          <View style={styles.footerColumn}>
            <Text style={styles.footerColumnTitle}>Solutions</Text>
            <TouchableOpacity><Text style={styles.footerColumnItem}>Single-Location Tire Dealers</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.footerColumnItem}>Multi-Location Tire Dealers</Text></TouchableOpacity>
          </View>
          <View style={styles.footerColumn}>
            <Text style={styles.footerColumnTitle}>Company</Text>
            <TouchableOpacity><Text style={styles.footerColumnItem}>Service</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.footerColumnItem}>Contact Us</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
