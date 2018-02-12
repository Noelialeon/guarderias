const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user.js');


const guarderiaSchema = new Schema({
  username: String,
  password: String,
  name: String,
  description: String,
  facilities: {
    swimming_pool: Boolean,
    garden: Boolean,
    meters: Number,
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
    number: Number,
    postcode: Number,
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

  // timestamp: { createdAt: 'created_at' },
  opinion_count: Number,
  parents: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const Guarderia = mongoose.model('Guarderia', guarderiaSchema);

module.exports = Guarderia;
