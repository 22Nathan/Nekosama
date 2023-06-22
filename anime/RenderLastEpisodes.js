import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LastEpisodeComponent from './LastEpisodeComponent';

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
    <View style={styles.lastEpisodes}>
      <Text style={styles.heading}>Derniers épisodes</Text>
      <View style={styles.row}>
        {currentEpisodes.map((episode) => (
          <TouchableOpacity key={episode.timestamp} style={styles.col} onPress={() => handleAnimeClick(episode)}>
            <LastEpisodeComponent
              title={episode.title}
              url_image={episode.url_bg}
              episode={episode.episode}
              time={episode.time}
              lang={episode.lang === 'vf'}
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.pagination}>
        {renderLastEpisodesPaginationButtons(currentLastEpisodesPage, lastEpisodes.length, changeLastEpisodesPage)}
      </View>
    </View>
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

const styles = StyleSheet.create({
  lastEpisodes: {
    // Ajoutez ici vos styles pour le conteneur des derniers épisodes
  },
  heading: {
    // Ajoutez ici vos styles pour le titre "Derniers épisodes"
  },
  row: {
    // Ajoutez ici vos styles pour la rangée d'épisodes
    flexDirection: 'row',
  },
  col: {
    // Ajoutez ici vos styles pour la colonne d'un épisode
    flex: 1,
  },
  pagination: {
    // Ajoutez ici vos styles pour la pagination
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationButton: {
    // Ajoutez ici vos styles pour les boutons de pagination
    marginHorizontal: 5,
    paddingVertical: 5,
  },
  activeButton: {
    // Ajoutez ici vos styles pour le bouton de pagination actif
    marginHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: 'blue',
  },
  noAnime: {
    // Ajoutez ici vos styles pour le texte "Aucun anime trouvé"
  },
});

export default RenderLastEpisodes;


