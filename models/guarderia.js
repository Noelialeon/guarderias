const mongoose = require('mongoose');
/* eslint-disable */
const Schema = mongoose.Schema;
/* eslint-enable */const User = require('./user.js');
const Opinion = require('./opinion.js');

const guarderiaSchema = new Schema({
  username: String,
  password: String,
  name: { type: String, default: 'Guarderia' },
  quality: Number,
  description: { type: String, default: 'Aún no se ha indicado' },
  facilities: {
    swimming_pool: { type: Boolean, default: 'Aún no se ha indicado' },
    garden: { type: Boolean, default: 'Aún no se ha indicado' },
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
    street: { type: String, default: 'Aún no se ha indicado' },
    number: { type: String, default: '' },
    postcode: { type: String, default: '' },
    city: { type: String, default: '' },
    coordinates: { type: [String], default: '' },
  },
  address_other: {
    stair: String,
    floor: String,
    door: String,
  },
  telephone: Number,
  email: String,
  profilepic_path: { type: String, default: '/uploads/c8dba076b1fba1ab4e1baf89b091b9c6' },
  profilepic_name: { type: String, default: 'default_pic' },
  otherpics: [String],
  opinion_count: Number,
  parents: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, {
  timestamp: { createdAt: 'created_at' },
  usePushEach: true,
});

const Guarderia = mongoose.model('Guarderia', guarderiaSchema);

module.exports = Guarderia;
