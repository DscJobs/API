const Users = require("@Models/users");
const CVUsers = require("@Models/curriculum")

module.exports.fetchDbUser = async (userID) => {
  let user = await Users.findOne({ userID: userID });

  return user;
};

module.exports.createNewUser = async (userID) => {
  let check = await Users.findOne({ userID: userID });

  if (!check) check = await new Users({ userID: userID }).save();

  return await check;
};

module.exports.fetchAllDevs = async() => {
  let devs = await CVUsers.find({ developer: true, private: false });

  return await devs;
}

module.exports.fetchAllUsers = async() => {
  let users = await CVUsers.find({ developer: false, private: false });

  return await users;
}
