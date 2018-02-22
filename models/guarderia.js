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
    number: String,
    postcode: String,
    city: String,
  },
  address_other: {
    stair: String,
    floor: String,
    door: String,
  },
  telephone: Number,
  email: String,
  profilepic_path: { type: String, default: './public/uploads/ce0f57b0a10e5e21c0863de5be5000dc' },
  profilepic_name: { type: String, default: 'default_pic' },
  opinion_count: Number,
  parents: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, {
  timestamp: { createdAt: 'created_at' },
});

const Guarderia = mongoose.model('Guarderia', guarderiaSchema);

module.exports = Guarderia;
