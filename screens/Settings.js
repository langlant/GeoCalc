import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Keyboard, View } from "react-native";
import { Input, Button } from "react-native-elements";
import Padder from "../components/Padder";
import { Dropdown } from "react-native-material-dropdown";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from '@expo/vector-icons';

const Settings = ({ navigation }) => {
    const [state, setState] = useState({
        distPick: "Kilometers",
      });

      let distPick = [{
          value: 'Kilometers',
      }, {
          value: 'Miles',
      }];
      let bearingPick = [{
          value: 'Degrees',
      }, {
          value: 'Mils',
      
      }];

    navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity onPress = {() => navigation.navigate('CalculatorScreen')}>
                <Text> Cancel</Text>
                </TouchableOpacity>

        ),
        headerLeft: () => (
            <TouchableOpacity onPress={() => {
                navigation.navigate('CalculatorScreen', {distPick, bearingPick});
            }}>
                <Text> Save </Text>
            </TouchableOpacity>
        ),
    });

    return(
        <Padder>
            <Dropdown
            label = 'Distance Type'
            distPick = {distPick}
            />
            <Dropdown
            label = 'Navigational Type'
            bearingPick = {bearingPick}
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