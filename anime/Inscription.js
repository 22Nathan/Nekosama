import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { ADRESSEIP } from './.CONST.js';
import { useState } from 'react';

const Inscription = ({ navigation }) => {

  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const handleInputChangeEmail = (text) => {
    setInputEmail(text);
  }
  const handleInputChangePassword = (text) => {
    setInputPassword(text);
  }

  const handleConnexion = async () => {

    const urlwt = `http://${ADRESSEIP}:8000/user/signup`

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
          console.log('Utilisateur créé')
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
      } else { console.error('Utilisateur déjà existant') }
    } catch (error) { console.log(error); }

    // navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [{ name: 'ListAnime' }]
    //   })
    // );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      <TextInput style={styles.input} onChangeText={handleInputChangeEmail} placeholder="Email" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} autoCompleteType="email"/>
      <TextInput style={styles.input} onChangeText={handleInputChangePassword} placeholder="Mot de passe" secureTextEntry={true} />
      <TouchableOpacity style={styles.button} onPress={handleConnexion}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Connexion')}>
        <Text style={styles.buttonText}>Connexion</Text>
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
    borderRadius: 8
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 8
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Inscription;
