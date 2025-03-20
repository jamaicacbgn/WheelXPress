import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const bannerHeight = 200;

const styles = StyleSheet.create({
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
        gap: 30, 
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
    });

export default styles;