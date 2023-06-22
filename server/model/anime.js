

const mongoose = require('mongoose')

const animeSchema = new mongoose.Schema({
    id: { type: Number },
    title: { type: String },
    title_english: { type: String },
    title_romanji: { type: String },
    title_french: { type: String },
    others: { type: String },
    type: { type: String },
    status: { type: String },
    popularity: { type: Number },
    url: { type: String },
    genres: { type: Array },
    url_image: { type: String },
    score: { type: String },
    start_date_year: { type: String },
    nbs_eps: { type: String }
})

const Anime = mongoose.model('anime', animeSchema, 'anime')

module.exports = Anime