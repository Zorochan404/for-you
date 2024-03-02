import { View, Text, Linking, TouchableOpacity, Clipboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalStyles from '../GlobalStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';




const SigninScreen = () => {
    const[devicecode, setDevicecode] = useState('')
    const[code, setCode] = useState('')
    const[access_token, setAccess_token] = useState('')
    const navigation = useNavigation()

    const copyToClipboard = () => {
        Clipboard.setString(code);
        alert('Copied to clipboard');
      };

      

    const request = async () => {
        const params = new URLSearchParams();
        params.append('client_id', '861556708454-d6dlm3lh05idd8npek18k6be8ba3oc68.apps.googleusercontent.com');
        params.append('scope', 'https://www.googleapis.com/auth/youtube');
      
        try {
          const response = await fetch('https://oauth2.googleapis.com/device/code', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const data = await response.json();
          
          setDevicecode(data.device_code)
          setCode(data.user_code)
          // Handle the response data here
        } catch (error) {
          console.error('Error:', error);
          // Handle errors here
        }
      };

      useEffect(()=>{
        request()
      },[])

      const request2 = async () => {
        const params = new URLSearchParams();
        params.append('client_id', '861556708454-d6dlm3lh05idd8npek18k6be8ba3oc68.apps.googleusercontent.com');
        params.append('client_secret', 'SboVhoG9s0rNafixCSGGKXAT');
        params.append('device_code', devicecode);
        params.append('grant_type', 'urn:ietf:params:oauth:grant-type:device_code');
      
        const url = 'https://oauth2.googleapis.com/token?' + params.toString();
        
      
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              "OAUTH_USER_AGENT": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0 Cobalt/Version"
            },
            body: params.toString(),
          });
          Linking.openURL('https://www.google.com/device');
          
      
          const data = await response.json();
        

          // Handle the response data here
        } catch (error) {
          console.error('Error:', error);
          // Handle errors here
        }
      };
      

      const request3 = async () => {
        const params = new URLSearchParams();
        params.append('client_id', '861556708454-d6dlm3lh05idd8npek18k6be8ba3oc68.apps.googleusercontent.com');
        params.append('client_secret', 'SboVhoG9s0rNafixCSGGKXAT');
        params.append('device_code', devicecode);
        params.append('grant_type', 'urn:ietf:params:oauth:grant-type:device_code');
      
        const url = 'https://oauth2.googleapis.com/token?' + params.toString();
       
      
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              "OAUTH_USER_AGENT": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0 Cobalt/Version"
            },
            body: params.toString(),
          });

          
      
          const data = await response.json();
          
          setAccess_token(data.access_token)
          await AsyncStorage.setItem('token', data.access_token);
          navigation.navigate('home')

          // Handle the response data here
        } catch (error) {
          console.error('Error:', error);
          // Handle errors here
        }
      };
      





  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Text style={{ color: "#fff", margin: 10, fontSize: 30 }}>{code}</Text>
      <TouchableOpacity onPress={copyToClipboard}>
        <Text style={{ color: 'blue', margin: 10, fontSize: 20 }}>Copy Text</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={request2}>
        <Text style={{ color: 'blue', margin: 10, fontSize: 20 }}>Signin</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={request3}>
        <Text style={{ color: 'blue', margin: 10, fontSize: 20 }}>Done</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default SigninScreen