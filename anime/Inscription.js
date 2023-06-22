import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const Inscription = ({ navigation }) => {
  const handleInscription = () => {
    // Logique pour gérer l'inscription de l'utilisateur
  };

  const handleConnexion = () => {
    navigation.navigate('Connexion');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      <TextInput style={styles.input} placeholder="Nom d'utilisateur" />
      <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry={true} />
      <Button title="S'inscrire" onPress={handleInscription} />
      <Button title="Connexion" onPress={handleConnexion} />
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
  },
});

export default Inscription;
