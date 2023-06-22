import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const LastEpisodeComponent = ({ title, url_image, episode, time, onClick, lang }) => {
  return (
    <TouchableOpacity style={styles.animeCard} onPress={onClick}>
      <View style={styles.imageContainer}>
        <View style={styles.icons}>
          <Text style={styles.icon}>{lang ? 'VF' : 'VOSTFR'}</Text>
          <Text style={styles.timeIcon}>{time}</Text>
        </View>
        <Image source={{ uri: url_image }} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.episode}>{episode}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    animeCard: {
      // Ajoutez ici vos styles pour la carte de l'épisode
    },
    imageContainer: {
      // Ajoutez ici vos styles pour le conteneur de l'image
    },
    icons: {
      // Ajoutez ici vos styles pour les icônes
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      // Ajoutez ici vos styles pour l'icône (VF/VOSTFR)
      // Exemple : color: 'red',
    },
    timeIcon: {
      // Ajoutez ici vos styles pour l'icône du temps
      // Exemple : color: 'red',
    },
    image: {
      // Ajoutez ici vos styles pour l'image
      // Exemple : width: 100, height: 100,
    },
    infoContainer: {
      // Ajoutez ici vos styles pour le conteneur des informations
    },
    title: {
      // Ajoutez ici vos styles pour le titre
    },
    textContainer: {
      // Ajoutez ici vos styles pour le conteneur de texte
    },
    episode: {
      // Ajoutez ici vos styles pour le texte de l'épisode
    },
  });

export default LastEpisodeComponent;


