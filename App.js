import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Keyboard,
} from "react-native";

export default function App() {
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);

  const addItem = () => {
    const trimmed = text.trim();
    if (trimmed.length === 0) return;
    const newItem = { id: Date.now().toString(), value: trimmed };
    setItems(prev => [newItem, ...prev]);
    setText("");
    Keyboard.dismiss();
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>{item.value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Favorite Clothing Brands</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter brand"
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.button} onPress={addItem}>
          <Text style={styles.buttonText}>ADD</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items yet. Add one above.</Text>
        }
        contentContainerStyle={items.length === 0 && styles.emptyContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F9FAFB" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  inputRow: { flexDirection: "row", marginBottom: 12 },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  button: {
    backgroundColor: "#2563eb",
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  listItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  itemText: { fontSize: 16 },
  emptyText: { color: "#666", textAlign: "center", marginTop: 40 },
  emptyContainer: { flex: 1, justifyContent: "center" },
});
