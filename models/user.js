const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Guarderia = require('./guarderia.js');


const userSchema = new Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
  children: Number,
  profilepic_path: String,
  profilepic_name: String,
  opinion_count: Number,
  favourites: [{ type: Schema.Types.ObjectId, ref: 'Guarderia' }],
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
