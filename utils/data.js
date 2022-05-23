const usernames = [
   'theradish56',
   'catlover2002',
   'amazinggrace',
   'tr33man',
   'iscream4icecream',
   'trainingwheels',
];

const emails = [
   'cloverleaf@leprauchan.com',
   'silverwhiskers15@catcity.com',
   'tutleboy@shells.org',
   'thisisfine@myhouseisburningdown.meme',
   'theleglessshortsman@website.mail',
   'myspace4lyfe@aol.com',
];

const thoughts = [
   `I'm afraid for the calendar. Its days are numbered.`,
   `My wife said I should do lunges to stay in shape. That would be a big step forward.`,
   `Singing in the shower is fun until you get soap in your mouth. Then it's a soap opera.`,
   `I thought the dryer was shrinking my clothes. Turns out it was the refrigerator all along.`,
   `Dear Math, grow up and solve your own problems.`,
   `I got carded at a liquor store, and my Blockbuster card accidentally fell out of my wallet. The cashier said never mind.`
];

const reactions = [
   'great',
   'cool',
   'awesome',
   'bad',
   'terrible',
   'awful',
   'like',
   'love',
   'dislike',
   'hate'
];

// Get a random array item
const getRandomArrayItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// create user list
const getUsers = () => {

   const userList = [];

   for (let i = 0; i < 6; i++) {
      
      userList.push({
         username: usernames[i],
         email: emails[i],
      });
      
   }

   return userList;

};

// create array of random reactions
const getRandomReactions = () => {

   const randomReactions = [];
   const randomNum = [Math.floor(Math.random() * 10)];
   
   for (let i = 0; i < randomNum; i++) {
      randomReactions.push({
         reactionBody: getRandomArrayItem(reactions),
         username: getRandomArrayItem(usernames)
      });
   }

   return randomReactions;

}

// create thought list
const getThoughts = () => {

   const thoughtList = [];

   for (let i = 0; i < thoughts.length; i++) {
      
      thoughtList.push({
         thoughtText: thoughts[i],
         username: getRandomArrayItem(usernames),
         reactions: getRandomReactions()
      });

   }

   return thoughtList;

};

// Export the functions for use in seed.js
module.exports = { getUsers, getThoughts };
