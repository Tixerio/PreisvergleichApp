import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const BarcodeScannerScreen = ({ route, navigation }) => {

  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarcodeScanned = ({ data }) => {
    setScannedData(data);
    // Do something with the scanned data (e.g., send it to an API for processing)

    navigation.navigate("Home", { scannedData: data });
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera.</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={handleBarcodeScanned}
      />
      <View style={styles.overlay}>
      </View>
      {scannedData !== '' && <Text style={styles.resultText}>Scanned Data: {scannedData}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scanButton: {
    backgroundColor: '#eb4034',
    padding: 15,
    borderRadius: 5,
    //top: 300,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default BarcodeScannerScreen;
