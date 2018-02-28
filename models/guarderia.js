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
    swimming_pool_path: { type: String, default: '/uploads/9f378e797955d1e43426390942b95ada' },
    garden: Boolean,
    garden_path: { type: String, default: '/uploads/7316f0c0409eb0f7cb758c00ed2f4e7a' },
    square_meters: Number,
    square_meters_path: { type: String, default: '/uploads/b716e244eb6006f26aa32f419f8f14fe' },
    kitchen: Boolean,
    kitchen_path: { type: String, default: '/uploads/22bbeeb945924587996efc4a7300ffe8' },
    extra_hours: Boolean,
    extra_hours_path: { type: String, default: '/uploads/f9daa8a1993e77e26717339545a6c648' },
    spanish: Boolean,
    spanish_path: { type: String, default: '/uploads/9f9b5e47ad7322bca0d3f56dcb400dc0' },
    english: Boolean,
    english_path: { type: String, default: '/uploads/85bd348dafbaeaaaa0a9b6a917ff20aa' },
    german: Boolean,
    german_path: { type: String, default: '/uploads/e64f10603e4e10fdf3777068198a295b' },
    parking_carrito: Boolean,
    parking_carrito_path: { type: String, default: '/uploads/d3465ee9884beb26d57d4a707f1b598f' },
    locker: Boolean,
    locker_path: { type: String, default: '/uploads/43fa0b922c920c49d0147dd172434af8' },
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
