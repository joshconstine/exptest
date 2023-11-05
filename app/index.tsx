import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { Link } from "expo-router";
import { Recipe } from "../types/recipe";
export default function Page() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getRecipes = async () => {
    try {
      const response = await fetch(
        "http://172.21.0.3:8080/api/mobile/v1/recipes",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      ); // Replace with your Docker container's IP or hostname if needed
      const data = await response.json();
      setRecipes(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error  recipes. Status:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Listify</Text>
        <ActivityIndicator animating={isLoading} size="large" />

        {!isLoading && recipes.length === 0 && <Text>No recipes found</Text>}

        {recipes.map((recipe: Recipe) => (
          <Link href={`/recipe/${recipe.Recipe_id}`} key={recipe.Recipe_id}>
            <View style={styles.recipeContainer}>
              {recipe.Photos.length > 0 && (
                <Image
                  source={{ uri: recipe.Photos[0] }}
                  style={styles.recipeImage}
                />
              )}
              <Text style={styles.recipeName}>{recipe.Name}</Text>
            </View>
          </Link>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  safeArea: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  recipeContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  recipeImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  recipeName: {
    fontSize: 18,
    marginTop: 10,
  },
});
