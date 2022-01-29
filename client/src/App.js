import React from 'react';
import { ethers } from "ethers";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from 'react-native';

import cat from './cat.jpeg'
import secrets from './secrets.json';


const App = () => {

  const [state, setState] = React.useState({});

  const API_KEY = secrets.API_KEY
  const PRIVATE_KEY = secrets.PRIVATE_KEY;
  const CONTRACT_ADDRESS = secrets.CONTRACT_ADDRESS;

  const contractInterface = require("./EmailService.json");
  const alchemyProvider = new ethers.providers.AlchemyProvider("ropsten", API_KEY);
  const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractInterface.abi, signer);

  const handleChange = async event => {
    setState({value: event.target.value})
  }

  const handleSubmit = async event => {
    console.log(event.target.value);
    setState({value: event.target.value})

    const fee = await contract.fee();
    console.log(fee);

    const result = await contract.sendEmail("", state.value);
    console.log(result);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={{flex: 1}}
        source={cat}>
        <View style={styles.container}>
        <View style={styles.contentCenter}>
            <Text style={styles.textStyle}>
              Hi there. Send me an email.
            </Text>
            <form onSubmit={handleSubmit}>
              <label>
                <input type="text" value={state.value} onChange={handleChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </View>
        <Text style={styles.title}>
          
        </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 50,
    marginBottom: 500,
    fontSize: 25,
    padding: 15,
    color: 'white',
    fontWeight: 'bold',    
    textAlign: 'center',    
  },
  contentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    marginTop: 100,
    color: 'white',
    fontSize: 25,
    padding: 10,
  }
});
