import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const AnimeCard = ({ title, imageUrl, start_date_year, nb_eps, onClick, isVFMode, format }) => {
  const renderFormat = () => {
    if (format === 'ova') {
      return 'OAV';
    } else if (format === 'tv') {
      return 'TV';
    } else if (format === 'm0v1e') {
      return 'FILM';
    } else if (format === 'special') {
      return 'Special';
    } else {
      return '';
    }
  };

  return (
    <TouchableOpacity style={styles.animeCard} onPress={onClick}>
      <View style={styles.imageContainer}>
        <View style={styles.icons}>
          {isVFMode ? <Text style={[styles.icon, styles.red]}>VF</Text> : <Text style={[styles.icon, styles.red]}>VOSTFR</Text>}
          {format && <Text style={styles.icon}>{renderFormat()}</Text>}
        </View>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.info}>{start_date_year}</Text>
          <Text style={styles.info}>{nb_eps}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  animeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    marginRight: 10,
  },
  icons: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  icon: {
    marginRight: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    fontSize: 12,
    color: '#fff',
    borderRadius: 4,
  },
  red: {
    backgroundColor: 'red',
  },
  image: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  textContainer: {
    flexDirection: 'row',
  },
  info: {
    marginRight: 10,
  },
});

export default AnimeCard;
