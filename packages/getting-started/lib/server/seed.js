/*

Seed the database with some dummy content. 

*/

import Movies from '../modules/collection.js';
import Users from 'meteor/vulcan:users';
import { newMutation } from 'meteor/vulcan:core';
import { Promise } from 'meteor/promise';

const seedData = [
  {
    name: 'Star Wars',
    year: '1973',
    review: `A classic.`,
    privateComments: `Actually, I don't really like Star Wars…`
  },
  {
    name: 'Die Hard',
    year: '1987',
    review: `A must-see if you like action movies.`,
    privateComments: `I love Bruce Willis so much!`
  },
  {
    name: 'Terminator',
    year: '1983',
    review: `Once again, Schwarzenegger shows why he's the boss.`,
    privateComments: `Terminator is my favorite movie ever. `
  },
  {
    name: 'Jaws',
    year: '1971',
    review: 'The original blockbuster.',
    privateComments: `I'm scared of sharks…`
  },
  {
    name: 'Die Hard II',
    year: '1991',
    review: `Another classic.`
  },
  {
    name: 'Rush Hour',
    year: '1993',
    review: `Jackie Chan at his best.`,
  },
  {
    name: 'Citizen Kane',
    year: '1943',
    review: `A disappointing lack of action sequences.`,
  },
  {
    name: 'Commando',
    year: '1983',
    review: 'A good contender for highest kill count ever.',
  },
];

const createUser = async (username, email) => {
  const user = {
    username,
    email,
    isDummy: true
  };
  return newMutation({
    collection: Users, 
    document: user,
    validate: false
  });
}

const createDummyUsers = async () => {

  // eslint-disable-next-line no-console
  console.log('// seeding users…');

  return Promise.all([
    createUser('Bruce', 'dummyuser1@telescopeapp.org'),
    createUser('Arnold', 'dummyuser2@telescopeapp.org'),
    createUser('Julia', 'dummyuser3@telescopeapp.org'),
  ]);
};

export const seedMovies = () => {
  
  if (Users.find().count() === 0) {
    Promise.await(createDummyUsers());
  }
  
  if (Movies.find().fetch().length === 0) {
    
    const allUsers = Users.find().fetch();
    
    // eslint-disable-next-line no-console
    console.log('// seeding movies…');
    
    Promise.awaitAll(seedData.map(document => newMutation({
      collection: Movies,
      document: document, 
      currentUser: _.sample(allUsers), // get a random user
      validate: false
    })));
  }
};