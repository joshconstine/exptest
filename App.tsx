import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function App() {

  const [recipes, setRecipes] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getRecipes = async () => {
    try{
      
      const response = await fetch('http://172.21.0.3:8080/api/mobile/v1/recipes', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },

      }); // Replace with your Docker container's IP or hostname if needed
      const data = await response.json();
      console.log(data);
      setRecipes(data);
      setIsLoading(false);

    } catch (error) {
      console.error('Error  recipes. Status:', error);
      setIsLoading(false);
    }

  };

  useEffect(() => {
    getRecipes();
  }
  , []);

  return (
    <View style={styles.container}>
      <Text>Listify</Text>

      <StatusBar style="auto" />
      {isLoading ? <Text>Loading...</Text> : (
        <View>
          {recipes.length === 0 && <Text>No recipes found</Text>}
          {recipes.map((recipe: any) => (
            <Text key={recipe.Id}>{recipe.Name}</Text>
          ))}
    </View>
      )}

    </View>
          
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
