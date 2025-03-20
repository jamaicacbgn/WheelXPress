import React, { useState, useRef, useEffect } from "react";
import {
  View, Text, Image, TextInput, FlatList, ScrollView, TouchableOpacity, Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../styles/homestyles";
const { width } = Dimensions.get("window");
const bannerHeight = 200;

const HomeScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const bannerRef = useRef(null);

  const banners = [
    require("../assets/h2.jpg"),
    require("../assets/h2.jpg"),
    require("../assets/h3.jpg"),
    require("../assets/h4.jpg"),
    require("../assets/h5.jpg"),
  ];

  const bestSellers = [
    { id: "1", name: "Pirelli Diablo Rosso Sport", price: "₱2,760-₱6,490", image: require("../assets/diabloproduct1.jpg") },
    { id: "2", name: "Pirelli corpion Trail II ", price: "₱9,950-₱15,100", image: require("../assets/scorpionproduct1.jpg") },
    { id: "3", name: "Michelin Power 6 ", price: "₱14,800-₱23,900", image: require("../assets/power6product1.jpg") },
    { id: "4", name: "Michelin Pilot Street Radial", price: "₱5,050-₱9,465", image: require("../assets/pilotproduct1.jpg") },
    { id: "5", name: "Motoz Tractionator Adventure", price: "₱7,100-₱10,600", image: require("../assets/tractionatorproduct1.jpg") },
    { id: "6", name: "Motoz Tractionator GPS ", price: "₱7,100-₱10,600", image: require("../assets/tractionatorgpsproduct1.jpg") },
    { id: "7", name: "Shinko 016 Verge 2x", price: "₱7,300-₱11,620", image: require("../assets/016vergeproduct1.jpg") },
    { id: "8", name: "Shinko 011 Verge", price: "₱6,510-₱16,850", image: require("../assets/011vergeproduct1.jpg") },
  ];

  const products = [
    { id: "1", name: "Michelin Anakee Wild", price: "₱6,600-₱8,700", image: require("../assets/anakeeproduct1.jpg") },
    { id: "2", name: "Michelin Road 6", price: "₱11,295-₱15,245", image: require("../assets/road6product1.jpg") },
    { id: "3", name: "Shinko Apex Radial", price: "₱6,510-₱10,580", image: require("../assets/010apexproduct1.jpg") },
    { id: "4", name: "Shinko 230 Tour Master", price: "₱6,550-₱6,870", image: require("../assets/tourmasterproduct1.jpg") },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % banners.length;
      setCurrentIndex(nextIndex);
      bannerRef.current?.scrollToOffset({ offset: width * nextIndex, animated: true });
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>


      <View style={{ flexDirection: "row", alignItems: "center", padding: 10, backgroundColor: "#fff" }}>
        <Icon name="bars" size={24} style={{ marginRight: 10 }} />
        <View style={{ flex: 1, position: "relative" }}>
          <TextInput
            placeholder="Search"
            style={{
              backgroundColor: "#eee",
              padding: 10,
              paddingRight: 40,
              borderRadius: 8,
            }}
          />
          <Icon
            name="sliders"
            size={20}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: [{ translateY: -10 }],
              color: "#888",
            }}
          />
        </View>
        <Icon name="bell-o" size={24} style={{ marginHorizontal: 10 }} />
        <Icon name="shopping-cart" size={24} style={{ marginRight: 15 }} />
        <Icon name="comments-o" size={24} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>


        <View style={{ height: bannerHeight, overflow: "hidden" }}>
          <FlatList
            ref={bannerRef}
            data={banners}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ alignItems: "center" }}
            renderItem={({ item }) => (
              <Image source={item} style={{ width: width, height: bannerHeight, resizeMode: "cover" }} />
            )}
          />
        </View>


        <View style={{ marginVertical: 15 }}>
          <FlatList
            data={["Eurogrip", "Pirelli", "Shinko", "Motoz", "Michelin", "Metzeler"]}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            renderItem={({ item }) => (
              <TouchableOpacity style={{
                backgroundColor: "#fff",
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 8,
                marginRight: 10,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 3
              }}>
                <Text style={{ fontWeight: "bold" }}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>


        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, marginTop: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>BEST SELLERS</Text>
          <Icon name="chevron-right" size={22} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ padding: 10 }}>
          {bestSellers.map((item) => (
            <View key={item.id} style={{ alignItems: "center", marginRight: 15 }}>
              <Image source={item.image} style={{ width: 100, height: 100, borderRadius: 10 }} />
              <Text style={{ fontWeight: "bold", marginTop: 5 }}>{item.name}</Text>
              <Text style={{ color: "#888" }}>{item.price}</Text>
            </View>
          ))}
        </ScrollView>


        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, marginTop: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>PRODUCTS</Text>
          <Icon name="chevron-right" size={22} />
        </View>


        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ padding: 10 }}>
          {products.map((item) => (
            <View key={item.id} style={{
              width: 200,
              backgroundColor: "#fff",
              padding: 10,
              borderRadius: 8,
              marginRight: 15,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 3,
              position: "relative"
            }}>

              <TouchableOpacity style={{ position: "absolute", top: 10, right: 5 }}>
                <Icon name="heart-o" size={22} color="red" />
              </TouchableOpacity>

 
              <Image source={item.image} style={{ width: "100%", height: 100, resizeMode: "contain" }} />


              <Text style={{ fontWeight: "bold", textAlign: "center" }}>{item.name}</Text>
              <Text style={{ color: "#888", textAlign: "center" }}>{item.price}</Text>

 
              <TouchableOpacity style={{ position: "absolute", bottom: 5, right: 5 }}>
                <Icon name="shopping-bag" size={20} color="#000" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

      </ScrollView>
      <View style={styles.footer}>



  <View style={styles.footerSocial}>
    <TouchableOpacity>
      <Icon name="facebook" size={20} color="#fff" />
    </TouchableOpacity>
    <TouchableOpacity>
      <Icon name="twitter" size={20} color="#fff" />
    </TouchableOpacity>
    <TouchableOpacity>
      <Icon name="instagram" size={20} color="#fff" />
    </TouchableOpacity>
  </View>


  <View style={styles.footerLinks}>
    <View style={styles.footerColumn}>
      <Text style={styles.footerColumnTitle}>Products</Text>
      <TouchableOpacity><Text style={styles.footerColumnItem}>Online Store</Text></TouchableOpacity>
      <TouchableOpacity><Text style={styles.footerColumnItem}>In-Store Deals</Text></TouchableOpacity>
    </View>

    <View style={styles.footerColumn}>
      <Text style={styles.footerColumnTitle}>Support</Text>
      <TouchableOpacity><Text style={styles.footerColumnItem}>Help Center</Text></TouchableOpacity>
      <TouchableOpacity><Text style={styles.footerColumnItem}>Contact Us</Text></TouchableOpacity>
    </View>

    <View style={styles.footerColumn}>
      <Text style={styles.footerColumnTitle}>Company</Text>
      <TouchableOpacity><Text style={styles.footerColumnItem}>About Us</Text></TouchableOpacity>
      <TouchableOpacity><Text style={styles.footerColumnItem}>Careers</Text></TouchableOpacity>
    </View>
  </View>
  <Text style={styles.footerText}>© 2025 TireXpress. All Rights Reserved.</Text>
</View>
    </View>
  );
};


export default HomeScreen;
