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
  services: {
    swimming_pool: Boolean,
    swimming_pool_path: { type: String, default: '/images/swimming-pool-icon' },
    garden: Boolean,
    garden_path: { type: String, default: '/images/garden-icon' },
    square_meters: Number,
    square_meters_path: { type: String, default: '/images/meters-icon' },
    kitchen: Boolean,
    kitchen_path: { type: String, default: '/images/kitchen-icon' },
    extra_hours: Boolean,
    extra_hours_path: { type: String, default: '/images/extra-hours-icon' },
    spanish: Boolean,
    spanish_path: { type: String, default: '/images/spanish-icon' },
    english: Boolean,
    english_path: { type: String, default: '/images/english-icon' },
    german: Boolean,
    german_path: { type: String, default: '/images/german-icon' },
    parking_carrito: Boolean,
    parking_carrito_path: { type: String, default: '/images/parking-carrito-icon' },
    locker: Boolean,
    locker_path: { type: String, default: '/images/locker-icon' },
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
  website: String,
  profilepic_path: { type: String, default: '/images/profile-pic-guarderias.png' },
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
