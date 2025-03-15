import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  opacity: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
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
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },

  Homebutton: {
    backgroundColor: "white", 
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: "center", 
    justifyContent: "center",
    marginVertical: 5,
    flexDirection: "row", 
    marginHorizontal: 5, 
    maxWidth: 120, 
  },
  HomebuttonText: {
    color: "Black",
    fontSize: 14, 
    fontWeight: "bold",
    marginLeft: 8, 
    flexShrink: 1, 
  },  
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    width: '100%',
  },
  
  link: {
    marginTop: 15,
    color: "black",
    fontWeight: "bold",
  },

  header: {
    marginBottom: 20,
  },

  buttonContainer: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginBottom: 20,
    width: "100%", 
    paddingHorizontal: 10,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  scrollContainer: {
    marginVertical: 20,
  },

  productCard: {
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 200,
  },

  productImage: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    borderRadius: 8,
  },

  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    padding: 10,
  },

  productText: {
    color: "Black", 
    fontWeight: "bold",
    textAlign: "center",
  },

  productImageBackground: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },

  navbar: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
  },
  searchBar: {
    width: '60%',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
  },
  iconButton: {
    marginHorizontal: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  fullWidthImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },

  footer: {
    width: '100%',
    backgroundColor: '#f8f8f8',
    padding: 4,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },

  footerLeft: {
    marginBottom: 15,
  },

  footerText: {
    fontSize: 12,
    color: '#333',
    marginBottom: 8,
  },

  footerSocial: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  footerLink: {
    fontSize: 12,
    color: '#007bff',
    textDecorationLine: 'underline',
  },

  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  footerColumn: {
    width: '28%',
  },

  footerColumnTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },

  footerColumnItem: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },

  brandSection: {
  top: 0,
  left: 0,
  right: 0,
  zIndex: 10,
  backgroundColor: '#fff',
  paddingVertical: 10,
  marginTop: 0,
},
brandImage: {
  width: 150,
  height: 50, 
  resizeMode: 'contain',
  marginHorizontal: 10,
},
  
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 5,
    padding: 0,
  },

  sidebarOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  sidebar: {
  backgroundColor: '#fff',
  width: 250,
  height: '100%',
  padding: 20,
  justifyContent: 'flex-start',
  position: 'absolute',
  top: 10,
  left: 50,
},
  closeSidebar: {
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
  },
  sidebarItem: {
    fontSize: 18,
    marginVertical: 10,
  },
  
});

export default styles;
