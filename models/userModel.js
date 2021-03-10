const database = [
  {
    id: 1,
    name: 'Jimmy Smith',
    email: 'jimmy123@gmail.com',
    password: 'jimmy123!',
    isAdmin: false,
  },
  {
    id: 2,
    name: 'Johnny Doe',
    email: 'johnny123@gmail.com',
    password: 'johnny123!',
    isAdmin: false,
  },
  {
    id: 3,
    name: 'Jonathan Chen',
    email: 'jo@gmail.com',
    password: 'jo',
    isAdmin: true,
  },
  {
    id: 4,
    name: 'Bob',
    email: 'bob@me.ca',
    password: 'hi',
    isAdmin: true,
  },
];

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    console.log(`Couldn't find user with id: ${id}`);
    return false;
  },
  createUser: (id, name) => {
    const newUser = {
      id: id,
      name: name,
    };
    database.push(newUser);
    return newUser;
  },
};

module.exports = { database, userModel };
