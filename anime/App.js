import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inscription from './Inscription';
import ListAnime from './ListAnime';
import Connexion from './Connexion';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inscription">
        <Stack.Screen name="Inscription" component={Inscription} />
        <Stack.Screen name="Connexion" component={Connexion} />
        <Stack.Screen name="ListAnime" component={ListAnime} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
