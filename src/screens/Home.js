
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getProductWithProductId } from '../scripts/apiFunctions';


export default function Home({ route, navigation }) {

    useEffect(() => {
        // Access the scannedData parameter from the route object
        const scannedData = route.params?.scannedData ?? '';
    
        // Use the scannedData in your component logic as needed
        console.log(scannedData);
        
        scannedData != "" ? makeItLookNice(scannedData) : setOutputText("");
      }, [route.params]); // Add route.params as a dependency for useEffect

    //const { scannedData } = route.params;

    const [outputText, setOutputText] = useState('');

    const makeItLookNice = async(productID) =>  {
        try {
        const data = await getProductWithProductId(productID, "BILLA", 1);
        // Set the output text with the received data
        console.log(data)
        const productName = JSON.stringify(data.products[0].productName)
        const productPrice = JSON.stringify(data.products[0].currentPrice)
        setOutputText(`Name: ${productName.substring(1, productName.length-1)}\nPrice: ${productPrice.substring(1, productPrice.length-1)}€`)
        } catch (error) {
        console.error("Error occurred:", error);
        // Set the output text with the error message
        setOutputText('Error occurred: ' + error.message);
        }
    }


    return (
        <View style={styles.container}>
        <Text style={styles.headline}>Prototype Application for Preisvergleich</Text>
        <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("Barcodescanner", {testOutput: "Hello World!"})}}>            
            <Text style={styles.buttonText}>Test</Text>
        </TouchableOpacity>
        <Text style={styles.outputText}>{outputText}</Text>
        </View>
    );
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:  "#faeceb"
  },
  headline: {
    marginBottom: 20,
    fontSize: 20
  },
  button: {
    backgroundColor: '#eb4034',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  outputText: {
    marginTop: 20,
    fontSize: 16,
    color: '#000',
  }
});

/*
 const data = await getProductWithProductId("9066000806500", "BILLA", 1);
      // Set the output text with the received data
      console.log(data)
      const productName = JSON.stringify(data.products[0].productName)
      const productPrice = JSON.stringify(data.products[0].currentPrice)
      setOutputText(`Name: ${productName.substring(1, productName.length-1)}\nPrice: ${productPrice.substring(1, productPrice.length-1)}€`)
    } catch (error) {
      console.error("Error occurred:", error);
      // Set the output text with the error message
      setOutputText('Error occurred: ' + error.message);
    }
    */