const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const animeVostfr = require('./anime-vostfr');

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

// Route GET pour récupérer les données d'anime
app.get('/api/anime', async (req, res) => {
  try {
    const animeData = await animeVostfr.loadAnime();
    res.json(animeData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des données d\'anime.' });
  }
});

// Route POST pour obtenir les informations supplémentaires d'un anime
app.post('/api/anime/more-info', async (req, res) => {
  const animeUrl = req.body.url;

  try {
    const animeInfo = await animeVostfr.getMoreInformation(animeUrl);
    res.json(animeInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des informations supplémentaires d\'anime.' });
  }
});

app.post('/api/anime/embed', async (req, res) => {
  try {
    const { url } = req.body;
    const embedLink = await animeVostfr.getEmbed(url);
    console.log(embedLink);
    res.json({ embedLink });
  } catch (error) {
    console.error('Error fetching embed link:', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération du lien embed.' });
  }
});

// Route GET pour récupérer les données d'anime en VF
app.get('/api/animevf', async (req, res) => {
  try {
    const animeDataVF = await animeVostfr.loadAnimeVF();
    res.json(animeDataVF);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des données d\'anime en VF.' });
  }
});

app.get('/api/last-episodes', async (req, res) => {
  try {
    const lastEpisodes = await animeVostfr.getLastEpisodes();
    res.json(lastEpisodes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des derniers épisodes.' });
  }
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
