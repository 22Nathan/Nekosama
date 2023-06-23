import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import LastEpisodeComponent from './LastEpisodeComponent';

const RenderLastEpisodes = ({ showLastEpisodes, lastEpisodes, currentLastEpisodesPage, handleAnimeClick, changeLastEpisodesPage, currentAnimes }) => {
  if (!showLastEpisodes) {
    return null;
  }

  if (lastEpisodes.length === 0) {
    return <Text style={styles.noAnime}>Aucun anime trouvé.</Text>;
  }

  const start = (currentLastEpisodesPage - 1) * 28;
  const end = start + 28;
  const currentEpisodes = lastEpisodes.slice(start, end);

  // Merge keys with the same title
  const mergedKeys = mergeKeysWithSameTitle(lastEpisodes, currentAnimes);
  console.log(mergedKeys);
  return (
    <View style={styles.lastEpisodes}>
      <ScrollView>
        <Text style={styles.heading}>Derniers épisodes</Text>
        <ScrollView horizontal>
          <View style={styles.pagination}>
            {renderLastEpisodesPaginationButtons(currentLastEpisodesPage, mergedKeys.length, changeLastEpisodesPage)}
          </View>
        </ScrollView>
        <View style={styles.row}>
          {currentEpisodes.map((episode) => {
            // Find the merged key for the current episode
            const mergedKey = mergedKeys.find((key) => key.title === episode.title);

            return (
              <TouchableOpacity key={episode.timestamp} style={styles.col} onPress={() => handleAnimeClick(mergedKey)}>
                {mergedKey && (
                  <LastEpisodeComponent
                    title={mergedKey.title}
                    url_image={mergedKey.url_bg}
                    episode={mergedKey.episodeEpisode}
                    time={mergedKey.time}
                    lang={mergedKey.lang === 'vf' ? true : false}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const renderLastEpisodesPaginationButtons = (currentLastEpisodesPage, mergedKeysCount, changeLastEpisodesPage) => {
  const paginationButtons = [];

  if (currentLastEpisodesPage > 1) {
    paginationButtons.push(
      <TouchableOpacity key="prev" onPress={() => changeLastEpisodesPage(currentLastEpisodesPage - 1)}>
        <Text style={styles.paginationText}>&lt;</Text>
      </TouchableOpacity>
    );
  }

  const maxPage = Math.ceil(mergedKeysCount / 28);
  const startPage = Math.max(1, currentLastEpisodesPage - 2);
  const endPage = startPage + maxPage - 1;

  for (let page = startPage; page <= endPage; page++) {
    paginationButtons.push(
      <TouchableOpacity
        key={page}
        style={currentLastEpisodesPage === page ? styles.activeButton : styles.paginationButton}
        onPress={() => changeLastEpisodesPage(page)}
      >
        <Text style={currentLastEpisodesPage === page ? styles.activeButtonText : styles.paginationButtonText}>
          {page}
        </Text>
      </TouchableOpacity>
    );
  }

  if (currentLastEpisodesPage < maxPage) {
    paginationButtons.push(
      <TouchableOpacity key="next" onPress={() => changeLastEpisodesPage(currentLastEpisodesPage + 1)}>
        <Text style={styles.paginationText}>&gt;</Text>
      </TouchableOpacity>
    );
  }

  return paginationButtons;
};

const mergeKeysWithSameTitle = (lastEpisodes, currentAnimes) => {
  const mergedKeys = [];

  lastEpisodes.forEach((episode) => {
    currentAnimes.forEach((anime) => {
      if (episode.title === anime.title || episode.title === anime.title + " (VF)") {
        mergedKeys.push({
          id: anime.id,
          title: episode.title,
          title_french: anime.title_french,
          nb_eps: anime.nb_eps,
          url: anime.url,
          start_date_year: anime.start_date_year,
          url_image: anime.url_image,
          episodeUrl: episode.url,
          episodeEpisode: episode.episode,
          url_bg: episode.url_bg,
          lang: episode.lang,
          time: episode.time
        });
      }
    });
  });

  return mergedKeys;
};

export default RenderLastEpisodes;

const styles = StyleSheet.create({
  noAnime: {
    // Styles for "Aucun anime trouvé."
  },
  lastEpisodes: {
    flex: 1
  },
  heading: {
    marginLeft: 10,
  },
  row: {
    // Styles for the row view
  },
  col: {
    // Styles for the column view
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 5
  },
  activeButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  paginationButton: {
    backgroundColor: '#ddd',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  activeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  paginationButtonText: {
    color: 'black',
  },
  paginationText: {
    fontSize: 16,
    backgroundColor: '#ddd',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
});
