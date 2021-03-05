const userModel = require('../models/userModel').userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

function findOrCreate(user) {
  const id = parseInt(user.id);
  let name;
  if (user.displayName) {
    name = user.displayName;
  } else {
    name = user.username;
  }
  if (!userModel.findById(id)) {
    console.log('creating user');
    return userModel.createUser(id, name);
  } else {
    console.log('this user already exists');
    return userModel.findById(id);
  }
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  findOrCreate,
};
