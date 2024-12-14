import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Card, Title, Paragraph } from "react-native-paper";
import axios from "axios";
import { router } from "expo-router";

const Create = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [text, setText] = useState<string>("");
  const [serviceType, setServiceType] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleTextChange = (newText: string) => {
    setText(newText);
  };

  const handleServiceTypeChange = (newServiceType: string) => {
    setServiceType(newServiceType);
  };
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    console.log("Jenis Pelayanan:", serviceType);
    const formattedDate = date.toISOString().split("T")[0];
    console.log(formattedDate);
    console.log("Keterangan:", text);
    setLoading(true);
    try {
      await axios.post("http://pelayanandesa.test/api/v1/permohonan", {
        tanggal: formattedDate,
        jenis_layanan: serviceType,
        keterangan: text,
      });
      alert("Berhasil tambah permohonan");
      router.push("/permohonan");
    } catch (error: any) {
      alert(error.response?.data?.message);
      console.log("ERROR WOI", error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Title style={styles.title}>Buat Permohonan</Title>
        <Paragraph style={styles.paragraph}>
          Isi form berikut untuk membuat permohonan baru.
        </Paragraph>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Jenis Pelayanan</Text>
          <TextInput
            style={styles.input}
            value={serviceType}
            onChangeText={handleServiceTypeChange}
            placeholder="Masukkan jenis pelayanan"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Tanggal</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateButtonText}>
              {`Pilih Tanggal: ${date.toLocaleDateString()}`}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Keterangan</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            value={text}
            onChangeText={handleTextChange}
            placeholder="Masukkan keterangan"
          />
        </View>

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Kirim Permohonan</Text>
          )}
        </TouchableOpacity>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  buttonDisabled: {
    backgroundColor: "#9bb8a4",
  },
  card: {
    width: "100%",
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  dateButton: {
    padding: 15,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    alignItems: "center",
  },
  dateButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  textArea: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    textAlignVertical: "top",
    backgroundColor: "#f9f9f9",
  },
  submitButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Create;
