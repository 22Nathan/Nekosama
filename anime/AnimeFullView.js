import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { WebView } from 'react-native-webview';
import { Picker } from '@react-native-picker/picker';
import { ADRESSEIP } from './.CONST.js';

const AnimeFullView = ({ anime, moreInfo, onClose }) => {
  const [embedLink, setEmbedLink] = useState(null);

  const handleEpisodeClick = async (url) => {
    try {
      const response = await axios.post(`http://${ADRESSEIP}:8000/api/anime/embed`, { url });
      const embedLink = response.data['embedLink'][0];
      setEmbedLink(embedLink);
    } catch (error) {
      console.error('Error fetching embed link:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: anime.url_image }} style={styles.image} resizeMode='contain' />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.title}>{anime.title}</Text>
          <View style={styles.infoText}>
            <Text style={styles.info}>{anime.start_date_year}</Text>
            <Text style={styles.info}>{anime.nb_eps}</Text>
          </View>
          {moreInfo && moreInfo.eps && moreInfo.eps.length > 0 && (
            <View style={styles.dropdown}>
              <Text style={styles.dropdownLabel}>Épisodes:</Text>
              <Picker
                selectedValue=""
                onValueChange={(value) => handleEpisodeClick(value)}
              >
                <Picker.Item label="Sélectionnez un épisode" value="" />
                {moreInfo.eps.map((episode, index) => (
                  <Picker.Item
                    key={episode.url}
                    label={`Episode ${index + 1}`}
                    value={episode.url}
                  />
                ))}
              </Picker>
            </View>
          )}
        </View>
      </View>
      <View style={styles.trailerContainer}>
        {moreInfo && moreInfo.trailer && (
          <WebView
            source={{ uri: moreInfo.trailer }}
            style={styles.videoTrailer}
          />
        )}
      </View>
      <View style={styles.videoContainer}>
        {embedLink && <WebView source={{ uri: embedLink }} style={styles.videoStream} />}
      </View>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexBasis: '86%'
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 50,
  },
  imageContainer: {
    width: '40%',
    marginRight: 10,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  infoContent: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  info: {
    fontSize: 10,
  },
  dropdown: {
    marginTop: 10,
  },
  dropdownLabel: {
    fontSize: 12,
  },
  trailerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoTrailer: {
    flex: 1,
    width: 390,
    marginBottom: 10
  },
  videoStream: {
    flex: 1,
    width: 390
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AnimeFullView;
