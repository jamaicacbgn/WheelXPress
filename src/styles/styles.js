import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  // General Styles
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  opacity: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },
  input: {
    width: "80%",
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  link: {
    marginTop: 15,
    color: "black",
    fontWeight: "bold",
  },
  errorText: {
    fontWeight: "600",
    color: "red",
  },
  // Header (common)
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e5e7eb",
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flex: 1,
    marginHorizontal: 16,
  },
  container1: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 16,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  // Brand Buttons
  brandsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  brandButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 9999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  brandText: {
    fontWeight: "600",
  },
  // Main Image (if used)
  mainImageContainer: {
    marginBottom: 16,
  },
  mainImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#3b82f6",
  },
  // Section Container (for products, best sellers, etc.)
  sectionContainer: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  // Best Sellers
  bestSellersContainer: {
    flexDirection: "row",
  },
  bestSellerImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
  },
  // Product Cards (Products section)
  productsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productCard: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: "48%",
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  productIcons: {
    position: "absolute",
    top: 8,
    right: 8,
    flexDirection: "row",
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  productPrice: {
    color: "#6b7280",
  },
  // Footer
  footer: {
    width: "100%",
    backgroundColor: "#222",
    paddingVertical: 15,
    alignItems: "center",
    borderTopWidth: 0.5,
    borderTopColor: "#444",
  },
  footerText: {
    fontSize: 12,
    color: "#bbb",
    textAlign: "center",
    marginTop: 10,
  },
  footerSocial: {
    flexDirection: "row",
    justifyContent: "center",
  },
  footerLink: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "500",
  },
  footerLinks: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  footerColumn: {
    alignItems: "center",
  },
  footerColumnTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  footerColumnItem: {
    fontSize: 12,
    color: "#bbb",
  },
  // Side Menu
  sideMenuOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
  },
  overlayBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  sideMenu: {
    width: 250,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  sideMenuHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  sideMenuUsername: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  sideMenuItem: {
    paddingVertical: 12,
  },
  sideMenuItemText: {
    fontSize: 16,
    color: "#333",
  },
  sideMenuDropdown: {
    paddingLeft: 20,
    marginBottom: 10,
  },
  sideMenuDropdownItem: {
    paddingVertical: 8,
  },
  // Filter Modal
  filterModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  filterModalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
  },
  filterModalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  filterInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
  },
  filterModalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 4,
    width: "45%",
    alignItems: "center",
  },
  filterClearButton: {
    backgroundColor: "#777",
  },
  filterButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  // Notification Modal (if used)
  notificationModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationModalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    maxHeight: "80%",
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  notificationMessage: {
    fontSize: 16,
    marginBottom: 10,
  },
  notificationCloseButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 15,
  },
  notificationCloseButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  notificationImage: {
    width: 60,
    height: 60,
    resizeMode: "cover",
    borderRadius: 8,
    marginRight: 15,
  },
  // Cart Modal
  cartModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  cartModalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    maxHeight: "80%",
  },
  cartModalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  cartItemImage: {
    width: 60,
    height: 60,
    resizeMode: "cover",
    borderRadius: 8,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cartItemPrice: {
    fontSize: 14,
    color: "#888",
  },
  emptyCartText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginVertical: 20,
  },
  cartCloseButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 15,
  },
  cartCloseButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  // =============================
  // ProductDetailScreen Styles (Prefixed with 'detail')
  // =============================
  detailContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  detailHeader: {
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 3,
  },
  detailHeaderTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  imageCarousel: {
    width: "100%",
    height: 250,
    marginVertical: 10,
  },
  carouselImage: {
    width: width,
    height: 250,
    resizeMode: "contain",
  },
  detailProductName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  detailProductPrice: {
    fontSize: 18,
    color: "#f00",
    marginTop: 5,
  },
  // Using distinct keys for product detail so as not to conflict with other screen keys
  detailSizesContainer: {
    marginTop: 15,
  },
  detailSizesTitle: {
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  detailSizeButton: {
    backgroundColor: "#eee",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginRight: 10,
  },
  detailSizeButtonSelected: {
    backgroundColor: "#ddd",
  },
  detailDescriptionContainer: {
    marginTop: 15,
  },
  detailDescriptionTitle: {
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  detailDescriptionText: {
    fontSize: 14,
    color: "#333",
  },
  detailButtonRow: {
    flexDirection: "row",
    marginTop: 20,
  },
  detailActionButton: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  detailActionButtonText: {
    color: "#000",
    fontWeight: "600",
  },

  // =============================
  // NEW Cart Screen Styles
  // =============================
  cartHeader: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 2,
  },
  cartHeaderTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cartItemContainer: {
    flexDirection: "row",
    backgroundColor: "#ffeef2", // Pinkish background
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
  },
  cartItemImageNew: {
    width: 60,
    height: 60,
    borderRadius: 8,
    resizeMode: "contain",
  },
  cartItemNameNew: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  cartItemPriceNew: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  viewDetailsText: {
    fontSize: 14,
    color: "#007BFF",
    textDecorationLine: "underline",
  },
  quantityContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 5,
    marginVertical: 5,
    elevation: 2,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  checkoutButton: {
    backgroundColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },

  // New Styles for Displaying Chosen Size in Cart
  chosenSizeContainer: {
    backgroundColor: "black",
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 2,
    marginLeft: 8,
  },
  chosenSizeText: {
    fontSize: 12,
    color: "white",
  },
  checkoutContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  checkoutHeader: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    backgroundColor: "#fff",
    elevation: 2,
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  checkoutHeaderTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutScrollContainer: {
    padding: 15,
    paddingBottom: 30,
  },
  checkoutRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  checkoutRowTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  checkoutRowValue: {
    fontSize: 16,
    color: "#666",
  },
  checkoutDivider: {
    height: 1,
    backgroundColor: "#eee",
    marginBottom: 10,
  },
  checkoutNoteTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  checkoutNoteInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  checkoutItemContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  checkoutItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
    resizeMode: "contain",
  },
  checkoutItemBrand: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  checkoutItemName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  checkoutItemDescription: {
    fontSize: 12,
    color: "#666",
  },
  checkoutItemQuantity: {
    marginTop: 5,
    fontSize: 12,
    color: "#666",
  },
  checkoutItemPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  checkoutSummaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  checkoutSummaryLabel: {
    fontSize: 16,
    color: "#666",
  },
  checkoutSummaryValue: {
    fontSize: 16,
    color: "#666",
  },
  checkoutAppointmentLink: {
    color: "#007BFF",
    marginBottom: 20,
    fontSize: 14,
    textDecorationLine: "underline",
  },
  checkoutFooter: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "#fff",
    elevation: 2,
  },
  checkoutPlaceOrderButton: {
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutPlaceOrderButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  // In styles.js (add these to the bottom or merge into existing code)
modalContainer: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.5)", // semi-transparent overlay
  justifyContent: "center",
  alignItems: "center",
},
modalContent: {
  width: "85%",
  backgroundColor: "#fff",
  borderRadius: 10,
  padding: 20,
},
modalTitle: {
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 15,
},
modalInput: {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 8,
  padding: 10,
  marginBottom: 15,
  backgroundColor: "#fff",
},
modalCloseButton: {
  marginTop: 10,
  fontSize: 16,
  color: "#007BFF",
  textAlign: "right",
},
modalOption: {
  fontSize: 16,
  color: "#007BFF",
  paddingVertical: 5,
},
});

export default styles;
