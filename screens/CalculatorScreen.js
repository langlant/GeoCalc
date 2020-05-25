import React, { useState } from "react";
import { StyleSheet, Text, Keyboard } from "react-native";
import { Button, Input } from "react-native-elements";
import Padder from "../components/Padder";

const CalculatorScreen = () => {
  const [state, setState] = useState({
    lat1: "",
    lon1: "",
    lat2: "",
    lon2: "",
    distance: "",
    bearing: "",
  });

  // Converts from degrees to radians.
  function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  // Converts from radians to degrees.
  function toDegrees(radians) {
    return (radians * 180) / Math.PI;
  }

  // Computes distance between two geo coordinates in kilometers.
  function computeDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // km (change this constant to get miles)
    var dLat = ((lat2 - lat1) * Math.PI) / 180;
    var dLon = ((lon2 - lon1) * Math.PI) / 180;
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return `${round(d, 3)} km`;
  }

  // Computes bearing between two geocoordinates in degrees. 
  function computeBearing(startLat, startLng, destLat, destLng) {
    startLat = toRadians(startLat);
    startLng = toRadians(startLng);
    destLat = toRadians(destLat);
    destLng = toRadians(destLng);

    var y = Math.sin(destLng - startLng) * Math.cos(destLat);
    var x =
      Math.cos(startLat) * Math.sin(destLat) -
      Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
    var brng = Math.atan2(y, x);
    brng = toDegrees(brng);
    return (brng + 360) % 360;
  }

  function round(value, decimals) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
  }

  function validate(value) {
    return (isNaN(value) ? "Must be a number" : "");
  }

  function formValid(vals) {
    if (isNaN(vals.lat1) || isNaN(vals.lon1) || isNaN(vals.lat2) || isNaN(vals.lon2)) {
      return false;
    } else if (vals.lat1 === '' || vals.lon1 === '' || vals.lat2==='' || vals.lon2==='') {
      return false;
    } else {
      return true;
    }
  }

  const updateStateObject = (vals) => {
    setState({
      ...state,
      ...vals,
    });
  };

  return (
    <Padder>
      <Text style={styles.h1}>Geo Calculator</Text>
      <Input
        placeholder="Enter latitude for point 1"
        value={state.lat1}
        autoCorrect={false}
        errorStyle={styles.input}
        errorMessage={validate(state.lat1)}
        onChangeText={(val) =>
          updateStateObject({ lat1: val})
        }
      />
      <Input
        placeholder="Enter longitude for point 1"
        value={state.lon1}
        autoCorrect={false}
        errorStyle={styles.input}
        errorMessage={validate(state.lon1)}
        onChangeText={(val) =>
          updateStateObject({ lon1: val })
        }
      />
      <Input
        placeholder="Enter latitude for point 2"
        value={state.lat2}
        autoCorrect={false}
        errorStyle={styles.input}
        errorMessage={validate(state.lat2)}
        onChangeText={(val) =>
          updateStateObject({ lat2: val })
        }
      />
      <Input
        placeholder="Enter longitude for point 2"
        value={state.lon2}
        autoCorrect={false}
        errorStyle={styles.input}
        errorMessage={validate(state.lon2)}
        onChangeText={(val) =>
          updateStateObject({ lon2: val })
        }
      />
      <Padder>
        <Button
          style={styles.buttons}
          title="Calculate"
          onPress={() => {
            if (formValid(state)) {
              var p1 = {
                lat: parseFloat(state.lat1),
                lon: parseFloat(state.lon1),
              };
              var p2 = {
                lat: parseFloat(state.lat2),
                lon: parseFloat(state.lon2),
              };

              var dist = computeDistance(p1.lat, p1.lon, p2.lat, p2.lon);
              var bear = computeBearing(p1.lat, p1.lon, p2.lat, p2.lon);
              updateStateObject({
                distance: `Distance: ${dist}`,
                bearing: `Bearing: ${round(bear, 3)} degrees`,
              });
          }
        }}
        />
      </Padder>
      <Padder>
        <Button
          style={styles.buttons}
          title="Clear"
          onPress={() => {
            Keyboard.dismiss();
            setState({
              lat1: "",
              lon1: "",
              lat2: "",
              lon2: "",
              distance: "",
              bearing: "",
            });
          }}
        />
      </Padder>
      <Text>{state.distance}</Text>
      <Text>{state.bearing}</Text>
    </Padder>
  );
};

const styles = StyleSheet.create({
  buttons: {
    margin: 10,
  },
  input: {
    color: 'red'
  }
});

export default CalculatorScreen;