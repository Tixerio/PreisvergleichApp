// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import Barcodescanner from '../screens/Barcodescanner';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Barcodescanner" component={Barcodescanner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
