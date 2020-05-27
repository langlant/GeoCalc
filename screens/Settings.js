import React, { Component, useState, useEffect } from "react";
import { StyleSheet, Text, Keyboard, View, TouchableOpacity } from "react-native";
import { Input, Button } from "react-native-elements";
import Padder from "../components/Padder";
import { Feather } from '@expo/vector-icons';
import { Dropdown } from 'react-native-material-dropdown';

const Settings = ({ navigation }) => {
    const [state, setState] = useState({
        distanceSet: 1,
        bearingSet: 1,
        distPick: 'Kilometers',
      });

  
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('CalculatorScreen')}>
            <Text> Cancel </Text>
          </TouchableOpacity>
        ),
        headerLeft: () => (
          <TouchableOpacity>
            <Text> Save </Text>
          </TouchableOpacity>
        ),
      }); 
      let distPick = [{
          value: 'Kilometers',
      }, {
          value: 'Miles',
      }];
      return(
    <Padder>
       <Dropdown
       label = 'Distance Type'
       distPick = {distPick}
       />
    </Padder>
    );
} 

const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
        backgroundColor: "#0098c7",
        color: 'white',
        fontSize: 25
    },
});

export default Settings;