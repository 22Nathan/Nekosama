import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import { ADRESSEIP } from './.CONST';

const AdminScreen = () => {

//   const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleInputChangeEmail = (text) => {
    setEmail(text);
  }
  const handleInputChangePassword = (text) => {
    setPassword(text);
  }

  const handleDeleteUser = async () => {

    try {
        const response = await fetch( `http://${ADRESSEIP}:8000/user/delete`, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email:email })
        })
        let ff = await response.json()
        console.warn( ff );
        if (response.ok) {
            const result = await response.json();
            console.log('Response:', result);
            if( result ){ console.warn('user deleted') }
        } else { console.warn(ff) }
    } catch (error) { console.log('dd'+error) }

  };

  const handleUpdateUser = async () => {

    try {
        const response = await fetch( `http://${ADRESSEIP}:8000/user/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email:email,
                password:password
            })
        })
        let ff = await response.json()
        console.warn( ff );
        if (response.ok) {
            const result = await response.json();
            console.log('Response:', result);
            if( result ){ console.warn('user deleted') }
        } else { console.warn(ff) }
    } catch (error) { console.log('dd'+error) }

  };

  return (
    <View style={{ padding:10, display:'flex', gap:5 }}>
      {/* <TextInput
        placeholder="User ID"
        value={userId}
        onChangeText={setUserId}
        style={styles.input}
      /> */}
        <TextInput
            placeholder="Email"
            value={email}
            onChangeText={handleInputChangeEmail}
            style={styles.input}
        />
        <TextInput
            placeholder="Password"
            value={password}
            onChangeText={handleInputChangePassword}
            style={styles.input}
        />
      <Button title="Delete User" onPress={handleDeleteUser} />
      <Button title="Update User" onPress={handleUpdateUser} />
    </View>
  );
};



const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    input: {
      width: '100%',
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
      borderRadius: 4
    },
  });
  


export default AdminScreen;
