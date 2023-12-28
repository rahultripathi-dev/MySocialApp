import { useNetInfo, NetInfoState } from "@react-native-community/netinfo";
import {
  Alert,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React,{useEffect} from 'react'


const NetError = () => {

const internetState: NetInfoState = useNetInfo();
  useEffect(() => {
    if (internetState.isConnected === false) {
      Alert.alert(
        "No Internet! ❌",
        "Sorry, we need an Internet connection for App to run correctly.",
        [{ text: "Okay" }]
      );
    }
  }, [internetState.isConnected]);

  if (internetState.isConnected === false) {
    return (
      <View style={styles.centered}>
        <Text style={styles.title}>
          Please turn on the Internet to use MY_APP.
        </Text>
      </View>
    );
  }
  return (
    <View>
      <Text>NetErroe</Text>
    </View>
  )
}

export default NetError

const styles = StyleSheet.create({
  centered: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
})