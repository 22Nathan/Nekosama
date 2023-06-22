import React from 'react';
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback, TouchableOpacity, Text } from 'react-native';
import LastEpisodeComponent from './LastEpisodeComponent';
import AnimeCard from './AnimeCard';

const RenderLastEpisodes = ({ showLastEpisodes, lastEpisodes, currentLastEpisodesPage, handleAnimeClick, changeLastEpisodesPage }) => {
  if (!showLastEpisodes) {
    return null;
  }

  if (lastEpisodes.length === 0) {
    return <Text style={styles.noAnime}>Aucun anime trouvé.</Text>;
  }

  const start = (currentLastEpisodesPage - 1) * 28;
  const end = start + 28;
  const currentEpisodes = lastEpisodes.slice(start, end);

  return (
    <ScrollView contentContainerStyle={styles.animeList} columnWrapperStyle={styles.row}>
      {currentEpisodes.map((episode) => (
        <TouchableWithoutFeedback key={episode.timestamp} >
          <View style={styles.col}>
            <LastEpisodeComponent
              onClick={() => handleAnimeClick(episode)}
              title = {episode.title}
              imageUrl = {episode.url_bg}
              time = {episode.time}
              lang = {episode.lang === 'vf'}
              start_date_year={episode.start_date_year}
              nb_eps={episode.nb_eps}
              format={episode.type}
            />
          </View>
        </TouchableWithoutFeedback>
      ))}
      <View style={styles.pagination}>
        {renderLastEpisodesPaginationButtons(currentLastEpisodesPage, lastEpisodes.length, changeLastEpisodesPage)}
      </View>
    </ScrollView>
  );
};

const renderLastEpisodesPaginationButtons = (currentLastEpisodesPage, lastEpisodesCount, changeLastEpisodesPage) => {
  const paginationButtons = [];

  if (currentLastEpisodesPage > 1) {
    paginationButtons.push(
      <TouchableOpacity key="prev" onPress={() => changeLastEpisodesPage(currentLastEpisodesPage - 1)}>
        <Text>&lt;</Text>
      </TouchableOpacity>
    );
  }

  const maxPage = Math.min(Math.ceil(lastEpisodesCount / 28), 5);
  const startPage = Math.max(1, currentLastEpisodesPage - 2);
  const endPage = startPage + maxPage - 1;

  for (let page = startPage; page <= endPage; page++) {
    paginationButtons.push(
      <TouchableOpacity
        key={page}
        style={currentLastEpisodesPage === page ? styles.activeButton : styles.paginationButton}
        onPress={() => changeLastEpisodesPage(page)}
      >
        <Text>{page}</Text>
      </TouchableOpacity>
    );
  }

  if (currentLastEpisodesPage < Math.ceil(lastEpisodesCount / 28)) {
    paginationButtons.push(
      <TouchableOpacity key="next" onPress={() => changeLastEpisodesPage(currentLastEpisodesPage + 1)}>
        <Text>&gt;</Text>
      </TouchableOpacity>
    );
  }

  return paginationButtons;
};

// const styles = StyleSheet.create({
//   lastEpisodes: {
//     // Ajoutez ici vos styles pour le conteneur des derniers épisodes
//   },
//   heading: {
//     // Ajoutez ici vos styles pour le titre "Derniers épisodes"
//   },
//   row: {
//     // Ajoutez ici vos styles pour la rangée d'épisodes
//     // flexDirection: 'row',
//   },
//   col: {
//     // Ajoutez ici vos styles pour la colonne d'un épisode
//     flex: 1,
//   },
//   pagination: {
//     // Ajoutez ici vos styles pour la pagination
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   paginationButton: {
//     // Ajoutez ici vos styles pour les boutons de pagination
//     marginHorizontal: 5,
//     paddingVertical: 5,
//   },
//   activeButton: {
//     // Ajoutez ici vos styles pour le bouton de pagination actif
//     marginHorizontal: 5,
//     paddingVertical: 5,
//     backgroundColor: 'blue',
//   },
//   noAnime: {
//     // Ajoutez ici vos styles pour le texte "Aucun anime trouvé"
//   },
// });

const styles = StyleSheet.create({
  app: {
    flex: 1,
    marginTop: 30,
  },
  list_anime: {
    flex: 1,
  },
  search: {
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#f5f5f5',
  },
  animeList: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  col: {
    marginBottom: 10,
  },
  pagination: {
    marginBottom: 20
  },
});

export default RenderLastEpisodes;


