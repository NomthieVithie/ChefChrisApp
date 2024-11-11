Welcome to Chef Christoffel's Menu App, a React Native application for managing and browsing a gourmet menu. This app allows users to view, add, filter, and remove menu items through an intuitive interface.

Features
Home Screen: Displays the chef's logo, a welcome message, and menu thumbnails.
Manage Menu: Add or remove dishes with details like name, description, course, and price.

Navigation
Home Screen: View the main menu and navigate to:
Manage Menu: Add dishes

Screens
Home Screen:

Displays the chef’s logo and menu thumbnails.
Button for managing the menu.
Manage Menu:

Add new dishes by entering the name, description, course, and price.

Styles
The app uses basic styling with React Native’s StyleSheet for layout and design elements like thumbnails, logos, and buttons.

Notes
This app uses React Navigation for screen transitions.
Enjoy managing Chef Christoffel's menu! 🍽️

License
This project is licensed under the MIT License.
![Screenshot 2024-10-08 205247](https://github.com/user-attachments/assets/d3a79891-2565-4d77-83c7-f7cf0a29699e)
![Screenshot 2024-10-08 095416](https://github.com/user-attachments/assets/bf98a756-626d-44bb-8725-6d52965b3762)
![Screenshot 2024-10-08 095505](https://github.com/user-attachments/assets/a931c5b8-23b3-4715-b34e-c112a56015c5)
 Link to the video
https://youtu.be/SADSapKopPo

New Images with![Screenshot 2024-11-11 194203](https://github.com/user-attachments/assets/05bd5204-534c-4325-a2f8-1c538e9d123b)
 the final changes
![Screenshot 2024-11-11 193910](https://github.com/user-attachments/assets/2ee7e690-37a1-4295-9b7d-adf62aa1677a)
![Screenshot 2024-11-11 194137](https://github.com/user-attachments/assets/1280c51c-5fd0-400b-8914-3809b5c096cc)


Change Log


From the previous assigment feedback, the video explaination is where 
 I lost marks so iIl have to go more in depth with the new video.                                                                                                                                                                                                                          

1. Added the function for the homescreen to display the average price of the menu items broken down into different courses.
Initialize coursePrices Object:
const coursePrices = menu.reduce((acc, item) => {
  if (!acc[item.course]) {
    acc[item.course] = [];
  }
  acc[item.course].push(item.price);
  return acc;
}, {});
Calculate Average Price Per Course:
return Object.entries(coursePrices).map(([course, prices]) => {
  const total = prices.reduce((sum, price) => sum + price, 0);
  const average = prices.length > 0 ? total / prices.length : 0;
  return { course, averagePrice: average.toFixed(2) };
});
Adding menu items on a different screen

I moved the "add menu " feature to display in new screen, the Manage Menu screen was handling the addition of new items.

navigation.navigate('Manage Menu', { menu, setMenu });

Used the passed setMenu to update the menu state:
const addMenuItem = () => {
  setMenu([...menu, { dishName, description, course, price: parseFloat(price) }]);
};

to ensure the added menu items are stored in an array 
Create a new menu item object:
{ dishName, description, course, price: parseFloat(price) }

Adds the new item to the existing menu array:
setMenu([...menu, { dishName, description, course, price: parseFloat(price) }]);

This ensures that each new item is properly stored in the menu array, which can then be accessed and displayed across different screens.

Added the removeMenuItem function which is the the ManageMennu screen , 
const updatedMenu = menu.filter((_, i) => i !== index);
this function creates a new array (updatedMenu) that excludes the item at the specified index.
setMenu(updatedMenu); 
updates the state with the new array, effectively removing the specified item.

This function is invoked when the "Remove" button is pressed:
<Button title="Remove" onPress={() => removeMenuItem(index)} />
this allows the chef to remove specific items from the menu.

Added this Filtering function to filter the menu  by selected course
state for the selected course:
const [filteredCourse, setFilteredCourse] = useState('All');
filter logic:
const [filteredCourse, setFilteredCourse] = useState('All');

if selected ALL it displays all the featured menu items
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
