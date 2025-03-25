import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../styles/styles"; 

const { width } = Dimensions.get("window");
const bannerHeight = 280;

const HomeScreen = ({ navigation }) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const bannerRef = useRef(null);


  const [menuVisible, setMenuVisible] = useState(false);
  const [orderDropdown, setOrderDropdown] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);


  const [filterVisible, setFilterVisible] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [filterPrice, setFilterPrice] = useState("");


  const [cartItems, setCartItems] = useState([]);


  const banners = [
    require("../assets/h1.jpg"),
    require("../assets/h2.jpg"),
    require("../assets/h3.jpg"),
    require("../assets/h4.jpg"),
    require("../assets/h5.jpg"),
  ];


  const bestSellers = [
    {
      id: "1",
      brand: "Pirelli", 
      name: "Pirelli Diablo Rosso Sport 14",
      images: [
        require("../assets/diabloproduct1.jpg"),
        require("../assets/h2.jpg"),
        require("../assets/h3.jpg"),
      ],
      sizes: [
        { label: "80/90 - 14", price: 2260 },
        { label: "90/80 - 14", price: 2350 },
        { label: "100/80 - 14", price: 2500 },
        { label: "120/70 - 14", price: 2700 },
      ],
      description:
        "Experience superior grip and performance with the Pirelli Diablo Rosso Sport 14. Designed for sport and daily use, it offers enhanced cornering, superb handling, and extended tread life.",
      similarProducts: [
      ],
    },
    {
      id: "2",
      brand: "Pirelli",
      name: "Pirelli Scorpion Trail II",
      images: [
        require("../assets/scorpionproduct1.jpg"),
        require("../assets/h4.jpg"),
        require("../assets/h2.jpg"),
      ],
      sizes: [
        { label: "110/70 - 17", price: 9950 },
        { label: "120/70 - 17", price: 11500 },
        { label: "150/70 - 17", price: 15100 },
      ],
      description:
        "Scorpion Trail II is the perfect dual-sport tire with excellent performance on both tarmac and light off-road conditions. Ideal for adventure riders.",
      similarProducts: [],
    },
    {
      id: "3",
      brand: "Michelin",
      name: "Michelin Power 6",
      images: [require("../assets/power6product1.jpg")],
      sizes: [
        { label: "120/70 - 17", price: 14800 },
        { label: "180/55 - 17", price: 23900 },
      ],
      description:
        "Michelin Power 6 is built for maximum performance on track and street. It delivers exceptional stability and cornering at high speeds.",
      similarProducts: [],
    },
    {
      id: "4",
      brand: "Michelin",
      name: "Michelin Pilot Street Radial",
      images: [require("../assets/pilotproduct1.jpg")],
      sizes: [
        { label: "90/80 - 17", price: 5050 },
        { label: "110/70 - 17", price: 7500 },
        { label: "130/70 - 17", price: 9465 },
      ],
      description:
        "Pilot Street Radial offers enhanced grip, better mileage, and improved safety. A go-to choice for everyday riders.",
      similarProducts: [],
    },
    {
      id: "5",
      brand: "Motoz",
      name: "Motoz Tractionator Adventure",
      images: [require("../assets/tractionatorproduct1.jpg")],
      sizes: [
        { label: "120/70 - 19", price: 7100 },
        { label: "150/70 - 17", price: 10600 },
      ],
      description:
        "Tractionator Adventure is made for off-road enthusiasts. Exceptional traction in challenging terrains.",
      similarProducts: [],
    },
    {
      id: "6",
      brand: "Motoz",
      name: "Motoz Tractionator GPS",
      images: [require("../assets/tractionatorgpsproduct1.jpg")],
      sizes: [
        { label: "120/70 - 19", price: 7100 },
        { label: "150/70 - 17", price: 10600 },
      ],
      description:
        "Designed to take you further with consistent grip and longevity, even in the harshest conditions.",
      similarProducts: [],
    },
    {
      id: "7",
      brand: "Shinko",
      name: "Shinko 016 Verge 2x",
      images: [require("../assets/016vergeproduct1.jpg")],
      sizes: [
        { label: "120/70 - 17", price: 7300 },
        { label: "180/55 - 17", price: 11620 },
      ],
      description:
        "The Verge 2x ensures solid performance and reliability, making it ideal for daily commutes and weekend rides.",
      similarProducts: [],
    },
    {
      id: "8",
      brand: "Shinko",
      name: "Shinko 011 Verge",
      images: [require("../assets/011vergeproduct1.jpg")],
      sizes: [
        { label: "120/70 - 17", price: 6510 },
        { label: "180/55 - 17", price: 16850 },
      ],
      description:
        "011 Verge offers excellent traction in wet and dry conditions, providing confidence on every ride.",
      similarProducts: [],
    },
  ];


  const productsSection = [
    {
      id: "1",
      name: "Michelin Anakee Wild",
      price: "₱6,600-₱8,700",
      image: require("../assets/anakeeproduct1.jpg"),
    },
    {
      id: "2",
      name: "Michelin Road 6",
      price: "₱11,295-₱15,245",
      image: require("../assets/road6product1.jpg"),
    },
    {
      id: "3",
      name: "Shinko Apex Radial",
      price: "₱6,510-₱10,580",
      image: require("../assets/010apexproduct1.jpg"),
    },
    {
      id: "4",
      name: "Shinko 230 Tour Master",
      price: "₱6,550-₱6,870",
      image: require("../assets/tourmasterproduct1.jpg"),
    },
  ];

  const filteredProducts = productsSection.filter((item) => {
    const nameMatch =
      filterName.trim() === "" ||
      item.name.toLowerCase().includes(filterName.toLowerCase());
    const priceMatch =
      filterPrice.trim() === "" || item.price.includes(filterPrice);
    return nameMatch && priceMatch;
  });


  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % banners.length;
      setCurrentIndex(nextIndex);
      bannerRef.current?.scrollToOffset({
        offset: width * nextIndex,
        animated: true,
      });
    }, 8000);
    return () => clearInterval(interval);
  }, [currentIndex]);


  const handleProductPress = (item) => {
    navigation.navigate("ProductDetailScreen", {
      product: item,
      cartItems,
      setCartItems,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>

      <View style={{ flexDirection: "row", alignItems: "center", padding: 10, backgroundColor: "#fff" }}>
        <Icon name="bars" size={24} style={{ marginRight: 10 }} onPress={() => setMenuVisible(!menuVisible)} />
        <View style={{ flex: 1, position: "relative" }}>
          <TextInput
            placeholder="Search"
            style={{ backgroundColor: "#eee", padding: 10, paddingRight: 40, borderRadius: 8 }}
          />
          <TouchableOpacity style={{ position: "absolute", right: 10, top: "50%", transform: [{ translateY: -10 }] }} onPress={() => setFilterVisible(true)}>
            <Icon name="sliders" size={20} color="#888" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("NotificationScreen")}>
          <Icon name="bell-o" size={24} style={{ marginHorizontal: 10 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("CartScreen", { cartItems })}>
          <Icon name="shopping-cart" size={24} style={{ marginRight: 15 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("MessageScreen")}>
          <Icon name="comments-o" size={24} />
        </TouchableOpacity>
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
              <TouchableOpacity
                style={{
                  backgroundColor: "#fff",
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  borderRadius: 8,
                  marginRight: 10,
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowRadius: 5,
                  elevation: 3,
                }}
                onPress={() => navigation.navigate("BrandScreen", { brand: item })}
              >
                <Text style={{ fontWeight: "bold" }}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, marginTop: 10 }}>
  <Text style={{ fontSize: 18, fontWeight: "bold" }}>BEST SELLERS</Text>
  <TouchableOpacity onPress={() => navigation.navigate("BestSellerScreen", { bestSellers })}>
    <Icon name="chevron-right" size={22} />
  </TouchableOpacity>
</View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ padding: 10 }}>
          {bestSellers.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={{ alignItems: "center", marginRight: 15 }}
              onPress={() => handleProductPress(item)}
            >
              <Image source={item.images[0]} style={{ width: 100, height: 100, borderRadius: 10 }} />
              <Text style={{ fontWeight: "bold", marginTop: 5 }}>{item.name}</Text>
              {item.sizes && item.sizes.length > 0 && (
                <Text style={{ color: "#888" }}>
                  ₱{item.sizes[0].price} - ₱{item.sizes[item.sizes.length - 1].price}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>


        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, marginTop: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>PRODUCTS</Text>
          <Icon name="chevron-right" size={22} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ padding: 10 }}>
          {filteredProducts.map((item) => (
            <View
              key={item.id}
              style={{
                width: 200,
                backgroundColor: "#fff",
                padding: 10,
                borderRadius: 8,
                marginRight: 15,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 3,
                position: "relative",
              }}
            >

              <TouchableOpacity style={{ position: "absolute", top: 10, right: 5 }} onPress={() => addToCart(item)}>
                <Icon name="heart-o" size={22} color="red" />
              </TouchableOpacity>
              <Image source={item.image} style={{ width: "100%", height: 100, resizeMode: "contain" }} />
              <Text style={{ fontWeight: "bold", textAlign: "center" }}>{item.name}</Text>
              <Text style={{ color: "#888", textAlign: "center" }}>{item.price}</Text>
              <TouchableOpacity style={{ position: "absolute", bottom: 5, right: 5 }} onPress={() => addToCart(item)}>
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
            <TouchableOpacity>
              <Text style={styles.footerColumnItem}>Online Store</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerColumnItem}>In-Store Deals</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerColumn}>
            <Text style={styles.footerColumnTitle}>Support</Text>
            <TouchableOpacity>
              <Text style={styles.footerColumnItem}>Help Center</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerColumnItem}>Contact Us</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerColumn}>
            <Text style={styles.footerColumnTitle}>Company</Text>
            <TouchableOpacity>
              <Text style={styles.footerColumnItem}>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerColumnItem}>Careers</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.footerText}>© 2025 TireXpress. All Rights Reserved.</Text>
      </View>


      {menuVisible && (
        <View style={styles.sideMenuOverlay}>
          <View style={styles.sideMenu}>
            <View style={styles.sideMenuHeader}>
              <Icon name="user-circle" size={40} color="#333" />
              <Text style={styles.sideMenuUsername}>John Doe</Text>
            </View>
            <TouchableOpacity style={styles.sideMenuItem} onPress={toggleMenu}>
              <Text style={styles.sideMenuItemText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sideMenuItem} onPress={handleOrderPress}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.sideMenuItemText}>Order</Text>
                <Icon name={orderDropdown ? "chevron-up" : "chevron-down"} size={16} style={{ marginLeft: 5 }} />
              </View>
            </TouchableOpacity>
            {orderDropdown && (
              <View style={styles.sideMenuDropdown}>
                <TouchableOpacity style={styles.sideMenuDropdownItem}>
                  <Text>My Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sideMenuDropdownItem}>
                  <Text>Track Order</Text>
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity style={styles.sideMenuItem} onPress={handleServicesPress}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.sideMenuItemText}>Services</Text>
                <Icon name={servicesDropdown ? "chevron-up" : "chevron-down"} size={16} style={{ marginLeft: 5 }} />
              </View>
            </TouchableOpacity>
            {servicesDropdown && (
              <View style={styles.sideMenuDropdown}>
                <TouchableOpacity style={styles.sideMenuDropdownItem}>
                  <Text>Service 1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sideMenuDropdownItem}>
                  <Text>Service 2</Text>
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity style={styles.sideMenuItem} onPress={toggleMenu}>
              <Text style={styles.sideMenuItemText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sideMenuItem} onPress={toggleMenu}>
              <Text style={styles.sideMenuItemText}>Logout</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.overlayBackground} onPress={toggleMenu} />
        </View>
      )}


      <Modal transparent visible={filterVisible} animationType="slide">
        <View style={styles.filterModalOverlay}>
          <View style={styles.filterModalContainer}>
            <Text style={styles.filterModalTitle}>Filter Products</Text>
            <TextInput placeholder="Filter by Name" value={filterName} onChangeText={setFilterName} style={styles.filterInput} />
            <TextInput placeholder="Filter by Price" value={filterPrice} onChangeText={setFilterPrice} style={styles.filterInput} />
            <View style={styles.filterModalButtons}>
              <TouchableOpacity style={styles.filterButton} onPress={() => setFilterVisible(false)}>
                <Text style={styles.filterButtonText}>Apply</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.filterButton, styles.filterClearButton]} onPress={() => {
                setFilterName("");
                setFilterPrice("");
                setFilterVisible(false);
              }}>
                <Text style={styles.filterButtonText}>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
