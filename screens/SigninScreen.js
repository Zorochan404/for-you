import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

const SigninScreen = () => {
    const request = async () => {
        const params = new URLSearchParams();
        params.append('client_id', 'your_client_id');
        params.append('scope', 'https://www.googleapis.com/auth/youtube.readonly');
      
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
          console.log(data);
          // Handle the response data here
        } catch (error) {
          console.error('Error:', error);
          // Handle errors here
        }
      };

      useEffect(()=>{
        request()
      },[])
  return (
    <View>
      <Text>SigninScreen</Text>
    </View>
  )
}

export default SigninScreen