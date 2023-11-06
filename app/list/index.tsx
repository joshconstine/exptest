import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
const groceryList = [
  {
    type: "Fruit",
    items: [
      { name: "Apples", quantity: "5", unit: "pieces" },
      { name: "Bananas", quantity: "6", unit: "pieces" },
      // Add more fruit items
    ],
  },
  {
    type: "Vegetables",
    items: [
      { name: "Carrots", quantity: "500", unit: "grams" },
      { name: "Broccoli", quantity: "1", unit: "head" },
      // Add more vegetable items
    ],
  },
  // Add more type categories (e.g., Meat, Dairy, etc.)
];

export default function Page() {
  return (
    <View style={styles.container}>
      <FlatList
        data={groceryList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{item.type}</Text>
            {item.items.map((ingredient, index) => (
              <View key={index} style={styles.ingredientContainer}>
                <Text style={styles.ingredientName}>{ingredient.name}</Text>
                <Text style={styles.ingredientQuantity}>
                  {ingredient.quantity} {ingredient.unit}
                </Text>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  ingredientContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  ingredientName: {
    fontSize: 16,
  },
  ingredientQuantity: {
    fontSize: 16,
    color: "gray",
  },
});
