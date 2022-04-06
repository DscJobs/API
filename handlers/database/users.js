const Users = require('@Models/users');

module.exports.fetchDbUser = async (userID) => {

    let user = await Users.findOne({ userID: userID });

    return user;
}

module.exports.createNewUser = async (userID) => {
    
    let check = await Users.findOne({ userID: userID });

    if (!check) check = await new Users({ userID: userID }).save();

    return await check;
}