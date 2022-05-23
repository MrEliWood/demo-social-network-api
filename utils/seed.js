const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getUsers, getThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {

   console.log('connected');

   // clear database
   await User.deleteMany({});
   await Thought.deleteMany({});


   // create users
   const users = getUsers();
   await User.collection.insertMany(users);

   // create thoughts and update users
   const thoughts = getThoughts();

   for (let i = 0; i < thoughts.length; i++) {
      
      await Thought.create(thoughts[i])
         .then((thought) =>
            !thought
               ? console.log('No thought with this id!')
               : User.findOneAndUpdate(
                  { username: thoughts[i].username },
                  { $addToSet: { thoughts: thought._id } },
                  { new: true }
               )
         )
         .catch((err) => {
            console.log(err);
         });

   };

   // create friends and update users
   for (let i = 0; i < users.length; i++) {

      // get all users
      let allUsers;

      await User.find()
         .then((users) => allUsers = users)
         .catch((err) => console.log(err));

         
      // update user with random friends
      const randomNum = [Math.floor(Math.random() * 5)];
      
      for (let n = 0; n < randomNum; n++) {

         const randomFriend = allUsers[[Math.floor(Math.random() * allUsers.length)]];

         if (randomFriend.username == users[i]) {
            return
         } else {

            await User.findOneAndUpdate(
               { username: users[i].username },
               { $addToSet: { friends: randomFriend._id } },
               { runValidators: true, new: true }
               )
               .catch((err) => console.log(err));

         }
         
         
      };

   };


   // display results
   console.log('Seeding complete! 🌱');

   process.exit(0);

});
