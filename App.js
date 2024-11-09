import React, { useState } from 'react';
import { Text, View, TextInput, Button, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Manage Menu" component={ManageMenuScreen} />
        <Stack.Screen name="Filter Menu" component={FilterMenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({ navigation, route }) => {
  const [menu, setMenu] = useState(route.params?.menu || []);

  // Calculate the average price for each course
  const calculateAveragePrices = () => {
    const coursePrices = menu.reduce((acc, item) => {
      if (!acc[item.course]) {
        acc[item.course] = [];
      }
      acc[item.course].push(item.price);
      return acc;
    }, {});

    return Object.entries(coursePrices).map(([course, prices]) => {
      const total = prices.reduce((sum, price) => sum + price, 0);
      const average = prices.length > 0 ? total / prices.length : 0;
      return { course, averagePrice: average.toFixed(2) };
    });
  };

  const averagePrices = calculateAveragePrices();

  return (
    <View style={styles.container}>
      {/* Add Logo Image */}
      <Image 
        source={require('./smart-beef-jerky/assets/chef christofel.jpg')} // Ensure path is correct
        style={styles.logo}
      />

      <Text style={styles.title}>Chef Christoffel's Menu</Text>

      {/* Display total menu items */}
      <Text style={styles.menuCount}>
        Total menu items: {menu.length}
      </Text>

      {/* Display average prices by course */}
      <Text style={styles.averagePricesTitle}>Average Prices by Course:</Text>
      {averagePrices.map(({ course, averagePrice }) => (
        <Text key={course} style={styles.averagePrice}>
          {course}: R{averagePrice}
        </Text>
      ))}

      {/* Thumbnails */}
      <View style={styles.thumbnailsContainer}>
        <Image 
          source={require('./smart-beef-jerky/assets/Oyster Starter.jpg')} // Ensure path is correct
          style={styles.thumbnail}
        />
        <Image 
          source={require('./smart-beef-jerky/assets/Shrimp starter.jpg')} // Ensure path is correct
          style={styles.thumbnail}
        />
        <Image 
          source={require('./smart-beef-jerky/assets/dessert.jpg')} // Ensure path is correct
          style={styles.thumbnail}
        />
      </View>
      <Text style={styles.chefParagraph}>
        Welcome to Chef Christoffel's gourmet selection! Explore our exclusive menu filled with exquisite starters, mains, and desserts. Carefully curated for an unforgettable dining experience.
      </Text>

      <Button title="Manage Menu" onPress={() => navigation.navigate('Manage Menu', { menu, setMenu })} />
      <Button title="Filter Menu" onPress={() => navigation.navigate('Filter Menu', { menu })} />
      <FlatList
        data={menu}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>{item.dishName} - R{item.price}</Text>
            <Text>{item.description}</Text>
            <Text>Course: {item.course}</Text>
          </View>
        )}
      />
    </View>
  );
};



const ManageMenuScreen = ({ navigation, route }) => {
  const { menu, setMenu } = route.params;
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Starters,Mains,Desserts');
  const [price, setPrice] = useState('');

  const addMenuItem = () => {
    setMenu([...menu, { dishName, description, course, price: parseFloat(price) }]);
    setDishName('');
    setDescription('');
    setCourse('Starters');
    setPrice('');
  };

  const removeMenuItem = (index) => {
    const updatedMenu = menu.filter((_, i) => i !== index);
    setMenu(updatedMenu);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Menu</Text>
      <TextInput
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Course (Starters, Mains, Desserts)"
        value={course}
        onChangeText={setCourse}
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Add to Menu" onPress={addMenuItem} />
      <FlatList
        data={menu}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>{item.dishName} - R{item.price}</Text>
            <Text>{item.description}</Text>
            <Text>Course: {item.course}</Text>
            <Button title="Remove" onPress={() => removeMenuItem(index)} />
          </View>
        )}
      />
    </View>
  );
};

const FilterMenuScreen = ({ route }) => {
  const [filteredCourse, setFilteredCourse] = useState('All');
  const { menu } = route.params;

  const filteredMenu = filteredCourse === 'All'
    ? menu
    : menu.filter(item => item.course === filteredCourse);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Menu</Text>
      <View style={styles.filterButtonsContainer}>
        <TouchableOpacity onPress={() => setFilteredCourse('All')}>
          <Text style={styles.filterButton}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilteredCourse('Starters')}>
          <Text style={styles.filterButton}>Starters</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilteredCourse('Mains')}>
          <Text style={styles.filterButton}>Mains</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilteredCourse('Desserts')}>
          <Text style={styles.filterButton}>Desserts</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredMenu}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>{item.dishName} - R{item.price}</Text>
            <Text>{item.description}</Text>
            <Text>Course: {item.course}</Text>
          </View>
        )}
      />
    </View>
  );
};

// Define the styles
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80, // Smaller logo width
    height: 80, // Smaller logo height
    borderRadius: 30, // Half of width/height for circular shape
    alignSelf: 'center', // Center the logo horizontally
    marginBottom: 5, // Adjust space between logo and title
  },
  thumbnailsContainer: {
    flexDirection: 'row', // Align items in a row
    justifyContent: 'space-between', // Space them evenly
    marginVertical: 10, // Add space above and below the thumbnails
  },
  thumbnail: {
    width: 60, // Thumbnail width
    height: 50, // Thumbnail height
    borderRadius: 10, // Optional: Rounded corners for the thumbnails
  },
  title: {
    fontSize: 24,
    textAlign: 'center', // Center the title horizontally
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  menuItem: {
    marginVertical: 10,
  },
  menuItemText: {
    fontSize: 18,
  },
  averagePricesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  averagePrice: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});
