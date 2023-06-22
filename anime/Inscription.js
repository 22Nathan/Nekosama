import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { CommonActions } from '@react-navigation/native';

const Inscription = ({ navigation }) => {
  const handleConnexion = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'ListAnime' }]
      })
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      <TextInput style={styles.input} placeholder="Nom d'utilisateur" />
      <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry={true} />
      <Button title="S'inscrire" onPress={handleConnexion} />
      <Button title="Connexion" onPress={() => navigation.navigate('Connexion')} />
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
