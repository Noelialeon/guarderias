const mongoose = require('mongoose');
/* eslint-disable */
const Schema = mongoose.Schema;
/* eslint-enable */
const Guarderia = require('./guarderia.js');

const userSchema = new Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
  children: Number,
  description: String,
  profilepic_path: { type: String, default: '/images/profile-pic-user' },
  profilepic_name: { type: String, default: 'default_user_pic' },
  opinion_count: Number,
  favourites: [{ type: Schema.Types.ObjectId, ref: 'Guarderia' }],
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
