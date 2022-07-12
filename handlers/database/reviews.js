const Reviews = require("@Models/reviews");

module.exports.fetchAllReviews = async (userID) => {
  let revs = await Reviews.find();

  return revs;
};

module.exports.fetchRandomUserReview = async (userID) => {
  let rev = await Reviews.findOne({ cv: userID });

  return rev;
};

module.exports.fetchAllUserReviews = async (userID) => {
  let revs = await Reviews.find({ cv: userID });

  return revs;
};

module.exports.fetchUserReview = async (revID) => {
  let rev = await Reviews.findOne({ _id: revID });

  return rev;
};
