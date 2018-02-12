const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Guarderia = require('./guarderia.js');
const User = require('./user.js');

const opinionSchema = new Schema({
  comment: {
    type: String,
    required: [true, "Comment can't be empty"],
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  user_name: String,
  guarderia_id: {
    type: Schema.Types.ObjectId,
    ref: 'Guarderia',
  },
  guarderia_name: String,
  star_ranking: Number,
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});


const Opinion = mongoose.model('Opinion', opinionSchema);

module.exports = Opinion;
