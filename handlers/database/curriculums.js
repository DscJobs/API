const Curriculums = require("@Models/curriculum");

module.exports.fetchRecentlyAdded = async () => {
  let res = await Curriculums.find({ private: false })
  .sort({ date: 'descending' }).limit(8);;

  return res;
};

module.exports.fetchLowestPriced = async () => {
    let res = await Curriculums.find({ private: false })
    .sort([
        ["details.salary", "descending"],
        ["likes", "descending"]
    ]).limit(8);

    return res;
};

module.exports.fetchTopLiked = async () => {
    let res = await Curriculums.find({ private: false })
    .sort({ likes: "descending" }).limit(8);;

    return res;
};

module.exports.fetchTopDev = async () => {
    let res = await Curriculums.find({
        developer: true, 
        private: false 
    }).sort({ likes: "descending" }).limit(8);;

    return res;
};

module.exports.fetchTopViewed = async () => {
    let res = await Curriculums.find({ private: false })
    .sort({ views: "descending" }).limit(8);;

    return res;
};

module.exports.fetchUserCV = async ({ userID }) => {
    let res = await Curriculums.findOne({ userID: userID });

    return res;
}


