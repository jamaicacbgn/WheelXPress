import React from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const messageScreen = ({ navigation }) => {
  const messages = [
    { id: "1", from: "Support", content: "Hi! How can we help you today?" },
    { id: "2", from: "User", content: "I have a concern about my order." },
    { id: "3", from: "Support", content: "We are looking into your issue. Please wait a moment." },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5", padding: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>Messages</Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {messages.map((msg) => (
          <View key={msg.id} style={{ marginBottom: 15, padding: 10, backgroundColor: "#fff", borderRadius: 8 }}>
            <Text style={{ fontWeight: "bold" }}>{msg.from}:</Text>
            <Text>{msg.content}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}>
        <TextInput
          placeholder="Type your message..."
          style={{ flex: 1, backgroundColor: "#fff", borderRadius: 8, padding: 10 }}
        />
        <TouchableOpacity style={{ marginLeft: 10 }}>
          <Icon name="send" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default messageScreen;
