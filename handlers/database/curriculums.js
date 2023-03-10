const Curriculums = require("@Models/curriculum");

module.exports.fetchRecentlyAdded = async () => {
  let res = await Curriculums.find({ private: false })
  .sort({ date: 'descending' });

  return res;
};

module.exports.fetchLowestPriced = async () => {
    let res = await Curriculums.find({ private: false })
    .sort([
        ["details.salary", "descending"],
        ["likes", "descending"]
    ])

    return res;
};

module.exports.fetchTopLiked = async () => {
    let res = await Curriculums.find({ private: false })
    .sort({ likes: "descending" });

    return res;
};

module.exports.fetchTopDev = async () => {
    let res = await Curriculums.find({
        developer: true, 
        private: false 
    }).sort({ likes: "descending" });

    return res;
};

module.exports.fetchTopViewed = async () => {
    let res = await Curriculums.find({ private: false })
    .sort({ views: "descending" });

    return res;
};


