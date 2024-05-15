const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Veuillez fournir un nom d\'utilisateur.'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Veuillez fournir un mot de passe.'],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
});


// Ajoutez la méthode comparePassword au schéma
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
