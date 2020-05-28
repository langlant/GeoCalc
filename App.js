import React from 'react';
import { StyleSheet, SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Calculator from './screens/Calculator';
import Settings from './screens/Settings';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default function App() {
  
  const Stack = createStackNavigator();

  return(
    <NavigationContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0098c7",
          },
          headerTitleStyle: {
            textAlign: 'center',
            flext: 1,
            color: "#ffffff"
            
          }
        }}
      >
        <Stack.Screen name = "Calculator" component = {Calculator}/>
        <Stack.Screen name = "Settings" component = {Settings} />
      </Stack.Navigator>
    
    </TouchableWithoutFeedback>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    margin: 20,
    flex: 1
  },
});
