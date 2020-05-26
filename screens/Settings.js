import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Keyboard, View } from "react-native";
import { Input, Button } from "react-native-elements";
import Padder from "../components/Padder";

const Settings = ({ navigation }) => {
    const [state, setState] = useState({
        distanceSet: "",
        bearingSet: "",
      });
    return(
        <Padder>
        <Text style={styles.header}> Settings</Text>
        <Button
        title = 'Save'
        onPress = {() => navigation.navigate(
            'CalculatorScreen')}
        />
        <Button
        title = 'Cancel'
        onPress = {() => navigation.push('CalculatorScreen')}
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
export {distanceSet, bearingSet}