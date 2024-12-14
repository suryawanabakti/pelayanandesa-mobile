import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const Index = () => {
  const [dataPermohonan, setDataPermohonan] = useState([]);
  const getData = async () => {
    const res = await axios.get("http://pelayanandesa.test/api/v1/permohonan");
    console.log(res.data.data);
    setDataPermohonan(res.data.data);
  };
  const handleEdit = () => {
    console.log("Edit action");
  };

  const handleDelete = async (id: number) => {
    console.log("Delete action");
    await axios.delete("http://pelayanandesa.test/api/v1/permohonan/" + id);
    getData();
  };

  const handleDetail = () => {
    console.log("Detail action");
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <ScrollView style={styles.container}>
      {dataPermohonan.map((permohonan: any) => {
        return (
          <View style={styles.card} key={permohonan.id}>
            <Text style={styles.cardTitle}>{permohonan.jenis_layanan}</Text>
            <Text style={styles.cardDescription}>{permohonan.keterangan}</Text>
            <Text style={styles.cardDescription}>{permohonan.status}</Text>
            <View style={styles.actions}>
              {permohonan.status == "DIAJUKAN" && (
                <>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleDelete(permohonan.id)}
                  >
                    <Text>Delete</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        );
      })}
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
