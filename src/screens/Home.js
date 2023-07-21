
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import SelectDropdown from 'react-native-select-dropdown';
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
    const [selectedValue, setSelectedValue] = useState('Billa');


    const makeItLookNice = async(productID) =>  {
        try {
        const dataObject = await getProductWithProductId(productID, selectedValue, 1);
        const data = dataObject.editedProductName
        // Set the output text with the received data
        console.log(dataObject)
        const productName = JSON.stringify(data.products[0].productName)
        const productPrice = JSON.stringify(data.products[0].currentPrice)
        setOutputText(`Name: ${productName.substring(1, productName.length-1)}\nPrice: ${productPrice.substring(1, productPrice.length-1)}€`)
        } catch (error) {
         
          setOutputText("Das Produkt konnte nicht gefunden werden!");
            
        }
    }

    const markets = ["Billa", "Spar", "DM", "Rewe"]

    return (
      <View style={styles.container}>
        <Text style={styles.headline}>Prototype Application for Preisvergleich</Text>
        <View style={styles.pickerWrapper}>
        <SelectDropdown
          data={markets}
          onSelect={(selectedItem, index) => {
            setSelectedValue(selectedItem)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}
        />

      </View>
        <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("Barcodescanner")}}>            
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
  },
  pickerWrapper: {
    borderWidth: 1, // Add a border to the wrapper
    borderColor: "#ccc", // Border color
    borderRadius: 5, // Border radius
    marginBottom: 20, // Add some spacing between the picker and other elements
    paddingHorizontal: 10, // Add horizontal padding for better appearance
    backgroundColor: "#fff", // Optional background color for the wrapper
  },
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