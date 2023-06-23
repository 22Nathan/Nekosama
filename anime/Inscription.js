import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { ADRESSEIP } from './.CONST.js';

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{ ...props.style, opacity: fadeAnim }}>
      {props.children}
    </Animated.View>
  );
};

const Inscription = ({ navigation }) => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  const handleInputChangeEmail = (text) => {
    setInputEmail(text);
    setError('');
    setShowError(false);
  };

  const handleInputChangePassword = (text) => {
    setInputPassword(text);
  };

  const handleInputChangePhone = (text) => {
    setInputPhone(text);
  };

  const validateEmail = (email) => {
    // Expression régulière pour vérifier le format de l'e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    // Expression régulière pour vérifier le format du numéro de téléphone
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleConnexion = async () => {
    // Vérifier le format de l'e-mail
    if (!validateEmail(inputEmail)) {
      setError("Format d'e-mail invalide");
      setShowError(true);
      return;
    }

    // Vérifier le format du numéro de téléphone
    if (!validatePhone(inputPhone)) {
      setError("Numéro de téléphone invalide");
      setShowError(true);
      return;
    }

    // Vérifier la longueur du mot de passe
    if (inputPassword.length < 10) {
      setError("Le mot de passe doit contenir au moins 10 caractères");
      setShowError(true);
      return;
    }

    const urlwt = `http://${ADRESSEIP}:8000/user/signup`;

    try {
      const response = await fetch(urlwt, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: inputEmail,
          password: inputPassword,
          phone: inputPhone
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Response:', result);
        if (result && result.user && result.user.isAdmin) {
          console.log('Utilisateur créé');
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{
                name: 'ListAnime',
                params: {
                  isAdmin: result.user.isAdmin
                }
              }]
            })
          );
        }
        
      } else {
        console.error('Utilisateur déjà existant');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showError]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleInputChangeEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        autoCompleteType="email"
      />
      <TextInput
        style={styles.input}
        onChangeText={handleInputChangePhone}
        placeholder="Téléphone"
        keyboardType="phone-pad"
        autoCapitalize="none"
        autoCorrect={false}
        autoCompleteType="tel"
      />
      <TextInput
        style={styles.input}
        onChangeText={handleInputChangePassword}
        placeholder="Mot de passe"
        secureTextEntry={true}
      />
      {showError ? (
        <FadeInView style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </FadeInView>
      ) : null}
      <TouchableOpacity style={styles.button} onPress={handleConnexion}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Connexion')}
      >
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

export default Inscription;
