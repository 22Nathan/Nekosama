import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { ADRESSEIP } from './.CONST.js';
import { useState, useEffect, useRef } from 'react';

const Connexion = ({ navigation }) => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showError) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        setShowError(false);
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showError]);

  const handleInputChangeEmail = (text) => {
    setInputEmail(text);
    setError('');
  };

  const handleInputChangePassword = (text) => {
    setInputPassword(text);
    setError('');
  };

  const handleConnexion = async () => {
    const url = `http://${ADRESSEIP}:8000/user/login?email=${inputEmail}&password=${inputPassword}`;
    const urlwt = `http://${ADRESSEIP}:8000/user/login`;

    try {
      const response = await fetch(urlwt, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: inputEmail,
          password: inputPassword,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Response:', result);
        if (result) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: 'ListAnime',
                  params: {
                    isAdmin: result.user.isAdmin || false,
                  },
                },
              ],
            })
          );
        }
      } else {
        setError('Email ou mot de passe incorrect');
        setShowError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleInputChangeEmail}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={handleInputChangePassword}
        placeholder="Mot de passe"
        secureTextEntry={true}
      />
      {showError && (
        <Animated.View style={[styles.errorContainer, { opacity: fadeAnim }]}>
          <Text style={styles.errorText}>{error}</Text>
        </Animated.View>
      )}
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
  errorContainer: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  errorText: {
    color: 'white',
    fontSize: 14,
  },
});

export default Connexion;
