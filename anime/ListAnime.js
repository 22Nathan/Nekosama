import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, ScrollView, TouchableWithoutFeedback  } from 'react-native';
import axios from 'axios';
import AnimeCard from './AnimeCard';
import AnimeFullView from './AnimeFullView';
import Navbar from './Navbar';
import Pagination from './Pagination';
import Filters from './Filters';
import RenderLastEpisodes from './RenderLastEpisodes';
import { ADRESSEIP } from './.CONST.js';
import { CommonActions } from '@react-navigation/native';

const ListAnime = ({navigation, route}) => {

  const {isAdmin} = route.params

  const [animes, setAnimes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [isFullView, setIsFullView] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [moreInfo, setMoreInfo] = useState(null);
  const [filterYear, setFilterYear] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filteredAnimes, setFilteredAnimes] = useState([]);
  const [isVFMode, setIsVFMode] = useState(false);
  const [filterFormat, setFilterFormat] = useState('');
  const [lastEpisodes, setLastEpisodes] = useState([]);
  const [showLastEpisodes, setShowLastEpisodes] = useState(false);
  const [currentLastEpisodesPage, setCurrentLastEpisodesPage] = useState(1);

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const url = isVFMode ? `http://${ADRESSEIP}:8000/api/animevf` : `http://${ADRESSEIP}:8000/api/anime`;
        const response = await axios.get(url);
        let filteredAnimes = response.data;

        if (searchQuery) {
          filteredAnimes = response.data.filter((anime) =>
            anime.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        if (filterYear) {
          filteredAnimes = filteredAnimes.filter((anime) => anime.start_date_year === filterYear);
        }

        if (filterStatus) {
          filteredAnimes = filteredAnimes.filter((anime) => anime.status === filterStatus);
        }

        setAnimes(filteredAnimes);
        setFilteredAnimes(filteredAnimes);
        updateTotalPages(filteredAnimes);
      } catch (error) {
        console.error('Error fetching animes:', error);
      }
    };

    fetchAnimes();
  }, [searchQuery, filterYear, filterStatus, isVFMode]);

  useEffect(() => {
    const fetchLastEpisodes = async () => {
      try {
        const response = await axios.get(`http://${ADRESSEIP}:8000/api/last-episodes`);
        setLastEpisodes(response.data);
      } catch (error) {
        console.error('Error fetching last episodes:', error);
      }
    };

    fetchLastEpisodes();
  }, []);

  useEffect(() => {
    const fetchMoreInfo = async () => {
      if (selectedAnime && selectedAnime.url) {
        try {
          const response = await axios.post(`http://${ADRESSEIP}:8000/api/anime/more-info`, { url: selectedAnime.url });
          setMoreInfo(response.data);
        } catch (error) {
          console.error('Error fetching more information:', error);
        }
      }
    };

    fetchMoreInfo();
  }, [selectedAnime]);

  useEffect(() => {
    updateTotalPages(filteredAnimes);
  }, [filteredAnimes]);

  const updateTotalPages = (data) => {
    const numAnimes = data.length;
    const perPage = 28;
    const total = Math.ceil(numAnimes / perPage);
    setTotalPages(total);
  };

  const handleAnimeClick = (anime) => {
    console.log(anime);
    setSelectedAnime(anime);
    setIsFullView(true);
    setShowLastEpisodes(false);
  };

  const renderAnimes = () => {
    if (showLastEpisodes || filteredAnimes.length === 0) {
      return null;
    }
  
    const start = (currentPage - 1) * 28;
    const end = start + 28;
    const currentAnimes = filteredAnimes.slice(start, end);
  
    return (
      <ScrollView contentContainerStyle={styles.animeList} columnWrapperStyle={styles.row}>
        {currentAnimes.map((anime) => (
          <TouchableWithoutFeedback key={anime.id} >
            <View style={styles.col}>
              <AnimeCard
                onClick={() => handleAnimeClick(anime)}
                title={anime.title}
                imageUrl={anime.url_image}
                start_date_year={anime.start_date_year}
                nb_eps={anime.nb_eps}
                isVFMode={isVFMode}
                format={anime.type}
              />
            </View>
          </TouchableWithoutFeedback>
        ))}
        <View style={styles.pagination}>
          <Pagination currentPage={currentPage} totalPages={totalPages} changePage={changePage} />
        </View>
      </ScrollView>
    );
  };
  
  const changePage = (page) => {
    setCurrentPage(page);
  };

  const changeLastEpisodesPage = (page) => {
    setCurrentLastEpisodesPage(page);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const handleFilterByYear = (value) => {
    const selectedYear = value;
    setFilterYear(selectedYear);

    if (selectedYear || filterFormat) {
      let filteredAnimes = animes;

      if (selectedYear) {
        filteredAnimes = filteredAnimes.filter((anime) => anime.start_date_year === selectedYear);
      }

      if (filterFormat) {
        filteredAnimes = filteredAnimes.filter((anime) => anime.type === filterFormat);
      }

      setFilteredAnimes(filteredAnimes);
      setCurrentPage(1);
    } else {
      setFilteredAnimes(animes);
    }
  };

  const handleFilterByStatus = (value) => {
    const selectedStatus = value;
    setFilterStatus(selectedStatus);

    if (selectedStatus) {
      const filteredAnimes = animes.filter((anime) => anime.status === selectedStatus);
      setFilteredAnimes(filteredAnimes);
      setCurrentPage(1);
    } else {
      setFilteredAnimes(animes);
    }
  };

  const handleFilterByFormat = (value) => {
    const selectedFormat = value;
    setFilterFormat(selectedFormat);

    if (selectedFormat || filterYear) {
      let filteredAnimes = animes;

      if (filterYear) {
        filteredAnimes = filteredAnimes.filter((anime) => anime.start_date_year === filterYear);
      }

      if (selectedFormat) {
        filteredAnimes = filteredAnimes.filter((anime) => anime.type === selectedFormat);
      }

      setFilteredAnimes(filteredAnimes);
      setCurrentPage(1);
    } else {
      setFilteredAnimes(animes);
    }
  };

  const loadVostfr = () => {
    setShowLastEpisodes(false);
    setIsVFMode(false);
    setSearchQuery('');
    setIsFullView(false);
    setFilteredAnimes(animes);
  };

  const loadVf = () => {
    setShowLastEpisodes(false);
    setIsVFMode(true);
    setSearchQuery('');
    setIsFullView(false);
    setFilteredAnimes(animes);
  };

  const currentYear = new Date().getFullYear();
  const availableYears = [];
  for (let year = currentYear; year >= 1950; year--) {
    availableYears.push(year);
  }

  return (
    <View style={styles.app}>
      <Navbar loadVostfr={loadVostfr} loadVf={loadVf} isAdmin={isAdmin} setShowLastEpisodes={setShowLastEpisodes} />
      <View style={styles.list_anime}>
        <TextInput
          style={styles.search}
          placeholder="Search anime..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <Filters
          filterYear={filterYear}
          filterStatus={filterStatus}
          filterFormat={filterFormat}
          availableYears={availableYears}
          handleFilterByYear={handleFilterByYear}
          handleFilterByStatus={handleFilterByStatus}
          handleFilterByFormat={handleFilterByFormat}
        />
        {isFullView ? (
          <AnimeFullView anime={selectedAnime} moreInfo={moreInfo} onClose={() => setIsFullView(false)} />
        ) : (
          <>
            <RenderLastEpisodes
              showLastEpisodes={showLastEpisodes}
              lastEpisodes={lastEpisodes}
              currentLastEpisodesPage={currentLastEpisodesPage}
              handleAnimeClick={handleAnimeClick}
              changeLastEpisodesPage={changeLastEpisodesPage}
            />
            {renderAnimes()}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    marginTop: 30
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

export default ListAnime;