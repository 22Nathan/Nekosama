import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { ADRESSEIP } from './.CONST.js';
import { useState } from 'react';
import axios from 'axios';

const Connexion = ({ navigation }) => {

  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const handleInputChangeEmail = (text) => {
    setInputEmail(text);
  }
  const handleInputChangePassword = (text) => {
    setInputPassword(text);
  }

  const handleConnexion = async () => {

    const url   = `http://${ADRESSEIP}:8000/user/login?email=${inputEmail}&password=${inputPassword}`
    const urlwt = `http://${ADRESSEIP}:8000/user/login`
    // console.log(url); 

    try {

      const response = await fetch( urlwt, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email:inputEmail,
          password:inputPassword
        })
      })

      if (response.ok) {
        const result = await response.json();
        console.log('Response:', result);
        if( result ){
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ 
                name: 'ListAnime',
                params: {
                  isAdmin:result.user.isAdmin || false
                }
              }]
            })
          )
        }
      } else {
        console.log('Utilisateur non existant');
      }

    } catch (error) {
      console.log(error);
    }


    // .then(response => console.log( response.data) )
    // .then(result => {
    //   console.log('Response:', result);
    //   // if( result ){
    //   //   navigation.dispatch(
    //   //     CommonActions.reset({
    //   //       index: 0,
    //   //       routes: [{ name: 'ListAnime' }]
    //   //     })
    //   //   );
    //   // }
    // })
    // .catch(error => { console.error('Error:', error); });

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput style={styles.input} onChangeText={handleInputChangeEmail} placeholder="Email" />
      <TextInput style={styles.input} onChangeText={handleInputChangePassword} placeholder="Mot de passe" secureTextEntry={true} />
      <TouchableOpacity style={styles.button} onPress={handleConnexion}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Connexion;
