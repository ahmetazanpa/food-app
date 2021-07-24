import React from 'react';
import 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';
import SplashScreen from './screens/SplashScreen/SplashScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import FoodListScreen from "./screens/FoodListScreen/FoodListScreen";
import Icon from 'react-native-remix-icon';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { colors } from './components/Constant'
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();


function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerTransparent: true, title: null, headerLeft: null }} />
    </Stack.Navigator>
  );
}

function CategoryStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Category" component={FoodListScreen} options={{ headerTransparent: true, headerLeft: (() => <TouchableOpacity style={{backgroundColor: colors.white, borderColor: colors.white, borderWidth: 1, borderRadius: 50, marginTop: 15, marginLeft: 12, padding: 7, shadowRadius: 20, elevation: 5, shadowOpacity: 0.5, shadowColor: '#000', shadowOffset: { width: 0, height: 15 },}} onPress={() => navigation.goBack() }><Icon name='arrow-left-s-line' size="26" /></TouchableOpacity>), title: null, }} />
    </Stack.Navigator>
  );
}


function ContainerTabs() {
  return (
    <Tab.Navigator shifting={true} initialRouteName={HomeScreen} labeled={false} barStyle={{ position: 'absolute', overflow: 'hidden', borderRadius: 30, margin: 10 }}>
      <Tab.Screen name="Home" component={HomeStack} options={{ tabBarLabel: null, tabBarColor: '#FFF', tabBarIcon: ({ focused }) => (<Icon name={focused ? 'home-5-fill' : 'home-5-line'} size="26" color="#388E3C" />) }} />
      <Tab.Screen name="Favorite" component={HomeScreen} options={{ tabBarLabel: null, tabBarColor: '#FFF', tabBarIcon: ({ focused }) => (<Icon name={focused ? 'heart-2-fill' : 'heart-2-line'} size="26" color="#388E3C" />) }} />
      <Tab.Screen name="Profile" component={HomeScreen} options={{ tabBarLabel: null, tabBarColor: '#FFF', tabBarIcon: ({ focused }) => (<Icon name={focused ? 'user-fill' : 'user-line'} size="26" color="#388E3C" />) }} />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerTransparent: true, title: null }} />
        <Stack.Screen name="Home" component={ContainerTabs} options={{ headerTitle: '', headerLeft: null, headerTransparent: true }} />
        <Stack.Screen name="Category" component={CategoryStack} options={{headerTransparent: true, title: null, headerLeft: null }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;