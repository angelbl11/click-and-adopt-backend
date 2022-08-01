const { Dislike } = require("../../DataBase/Dislike");
const { DislikeUser } = require("../../DataBase/DisLikeUser");
const { formatDate } = require("../../dateFormating");
module.exports = {
  dislikePet: async (parent, { petId, userId }) => {
    await new Dislike({
      petId: petId,
      userId: userId,
      date: formatDate(new Date()),
    }).save();

    return "Dislike";
  },

  dislikeUser: async (parent, { userId, likedUserId }) => {
    await new DislikeUser({
      userId: userId,
      likedUserId: likedUserId,
      date: formatDate(new Date()),
    }).save();

    return "Dislike";
  },
};
