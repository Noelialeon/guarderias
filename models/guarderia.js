const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user.js');


const guarderiaSchema = new Schema({
  username: String,
  password: String,
  name: String,
  quality: Number,
  description: String,
  facilities: {
    swimming_pool: { type: Boolean },
    garden: { type: Boolean },
    meters: { type: Number },
  },
  services: {
    languages: {
      spanish: Boolean,
      english: Boolean,
      german: Boolean,
    },
    fieldtrip: Boolean,
  // Añadir servicios
  },
  address: {
    street: String,
    number: String,
    postcode: String,
    city: String,
    coordinates: [],
  },
  address_other: {
    stair: String,
    floor: String,
    door: String,
  },
  telephone: Number,
  email: String,
  pictures: [{
    pic_path: String,
    pic_name: String,
  }],
  opinion_count: Number,
  parents: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, {
  timestamp: { createdAt: 'created_at' },
});

const Guarderia = mongoose.model('Guarderia', guarderiaSchema);

module.exports = Guarderia;
