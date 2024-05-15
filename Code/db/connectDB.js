// const mongoose = require('mongoose')

// const connectDB = (url) => {
//   return mongoose.connect(url, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//   })
// }

// module.exports = connectDB

const mongoose = require('mongoose');

// const connectDB = (url) => {
//   return mongoose.connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true, // Remplacez useCreateIndex par createIndexes
//     useCreateIndex: true, // Remplacez useFindAndModify par findOneAndUpdate
//     useFindAndModify: false,
//   });
// };


const connectDB = (url) => {
  return mongoose.connect(url, {
useNewUrlParser: true, // <-- no longer necessary
useUnifiedTopology: true // <-- no longer necessary
});
};


module.exports = connectDB;
