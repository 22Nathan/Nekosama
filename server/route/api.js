

const express = require('express')
const router = express.Router()
const Anime = require('../model/anime')
const AnimeVF = require('../model/animeVF')
const animeVostfr = require('../anime-vostfr');



// <>>>>>>>>>>>>>>>>>>
// FNC GET ALL
async function getAllAnimes(){
    try {
        const animes = await Anime.find()
        return animes
    } catch (error) {
        return []
    }
}

// FNC GET ALL VF
async function getAllAnimesVF(){
    try {
        const animes = await AnimeVF.find()
        return animes
    } catch (error) {
        return []
    }
}

// FNC GET PAR ID : boolean
async function getAnimeByID(paramId){
    let anime
    try {
        anime = await Anime.findOne({ id: paramId })
        if (anime == null) {
            return false
        }
    } catch (error) {
        return false
    }
    return true
}
// <>>>>>>>>>>>>>>>>>>



// GET ALL
router.get('/api/anime', async (req, res) => {
    try {
        const animeData = await animeVostfr.loadAnime()
        // 5549
        // console.log(animeData.length);
        try {
            if(animeData && animeData.length > 0){
                animeData.map(async (anime, i) => {
                // console.log('ss', await getAnimeParID(anime.id) === false );
                // check si existe déjà
                    if( anime.id ){
                        if( await getAnimeByID(anime.id) === false ){
                            const newAnime = new Anime( anime )
                            const insert = await newAnime.save()
                            console.log( 'insert' )
                        }
                    }
                })
            }
        } catch ( error ) { console.error( 'api get all ' + erreur ) }
        // res.status(200).json(animeData);
        res.status(200).json( await getAllAnimes() )
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des données d\'anime.' })
    }
})


// GET ALL VF
router.get('/api/animevf', async (req, res) => {
    try {
        const animeDataVF = await animeVostfr.loadAnimeVF()

        try {
            if(animeDataVF && animeDataVF.length > 0){
                animeDataVF.map(async (anime, i) => {
                    if( anime.id ){
                        if( await getAnimeByID(anime.id) === false ){
                            const newAnime = new AnimeVF( anime )
                            const insert = await newAnime.save()
                            console.log( 'insert VF' )
                        }
                    }
                })
            }
        } catch ( error ) { console.error( 'api get all ' + erreur ) }
        res.status(200).json( await getAllAnimesVF() )
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des données d\'anime en VF.' });
    }
});
  

// Route POST pour obtenir les informations supplémentaires d'un anime
router.post('/api/anime/more-info', async (req, res) => {
    const animeUrl = req.body.url
    try {
        const animeInfo = await animeVostfr.getMoreInformation(animeUrl);
        res.json(animeInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des informations supplémentaires d\'anime.' });
    }
});
  

router.post('/api/anime/embed', async (req, res) => {
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

  
// GET LAST EPISODES
router.get('/api/last-episodes', async (req, res) => {
    try {
        const lastEpisodes = await animeVostfr.getLastEpisodes();
        res.json(lastEpisodes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des derniers épisodes.' });
    }
});


module.exports = router

