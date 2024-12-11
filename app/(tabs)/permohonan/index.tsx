import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const Index = () => {
  const handleEdit = () => {
    console.log("Edit action");
  };

  const handleDelete = () => {
    console.log("Delete action");
  };

  const handleDetail = () => {
    console.log("Detail action");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Daftar Permohonan</Text>

      {/* Card 2 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Permohonan 2</Text>
        <Text style={styles.cardDescription}>
          This is a description of Permohonan 2. More details go here.
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.button} onPress={handleEdit}>
            <Text>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleDelete}>
            <Text>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleDetail}>
            <Text>Detail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#e8f5e9", // Green countryside theme background
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2d6a4f", // Dark green color for the title
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#d8f3dc", // Light green for buttons
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default Index;
