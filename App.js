import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const App = () => {
  const backgroundStyle = {
    backgroundColor: '#ba6fe8',
    flex: 1,
  };
  const [resppnse, setResponse] = useState({});
  const [phoneNumber, setPhoneNumber] = useState('');
  const handleTextChange = text => {
    setPhoneNumber(text);
  };

  const handleSubmit = async () => {
    if (phoneNumber) {
      const raw = JSON.stringify({
        phonenumber: phoneNumber,
      });
      var requestOptions = {
        method: 'POST',
        body: raw,
        redirect: 'follow',
      };
      fetch('https://chimpu.xyz/api/post.php', requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log('Api Response ===>', result);
          setResponse(JSON.parse(result));
          setPhoneNumber('');
        })
        .catch(error => console.error('error', error));
    } else {
      Alert.alert('Error', 'Please enter the phone number before submitting. ');
      setResponse({});
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={{paddingTop: 30}}>
          <Text
            style={{
              color: 'white',
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Welcome
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: 10,
              fontSize: 18,
              textAlign: 'center',
            }}>
            Please enter the mobile number
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TextInput
            style={{
              paddingHorizontal: 5,
              backgroundColor: 'white',
              borderWidth: 2,
              borderRadius: 10,
              width: '85%',
              height: 40,
            }}
            value={phoneNumber}
            placeholder="enter phone number"
            keyboardType="numeric"
            maxLength={10}
            onChangeText={handleTextChange}
          />
        </View>
        <View
          style={{
            padding: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
              width: 100,
              height: 40,
              backgroundColor: 'green',
              borderRadius: 5,
            }}
            onPress={handleSubmit}>
            <Text style={{color: 'white'}}>Submit</Text>
          </TouchableOpacity>
        </View>
        {Object.keys(resppnse).length !== 0 && (
          <View
            style={{
              padding: 10,
              display: 'flex',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                marginTop: 10,
                fontSize: 18,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              {resppnse?.msg}
            </Text>
            <Text
              style={{
                color: 'white',
                marginTop: 10,
                fontSize: 18,
                textAlign: 'center',
              }}>
              Successfully subitted your phone number
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
