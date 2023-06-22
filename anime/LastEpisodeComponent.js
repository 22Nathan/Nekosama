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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    // flex: 1,
    // zIndex:20,
    // width: '100%', height: '100%',
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

export default LastEpisodeComponent;


