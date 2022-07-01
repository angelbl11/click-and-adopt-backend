const { Like } = require("../../DataBase/Like");
const { LikeUser } = require("../../DataBase/LikeUser");

const date = new Date();

date.setHours(0, 0, 0, 0);

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
}

module.exports = {
  likePet: async (parent, { petId, userId }) => {
    const likes = await Like.find({ userId: userId });

    let flag = false;

    likes.map((item) => {
      if (petId == item.petId) {
        console.log("se repite: " + item);
        flag = true;
      }
    });

    if (flag) throw new Error("Like repetido");

    if (likes.length > 10) throw new Error("Limite excedido");

    await new Like({
      petId: petId,
      userId: userId,
      date: formatDate(new Date()),
    }).save();

    return "Like";
  },

  likeUser: async (parent, { userId, likedUserId }) => {
    const likes = await LikeUser.find({ userId: userId });

    let flag = false;

    likes.map((item) => {
      if (likedUserId == item.likedUserId) {
        console.log(item.likedUserId);
        flag = true;
      } else {
      }
    });

    if (flag) throw new Error("Like repetido");

    if (likes.length > 10) throw new Error("Limite excedido");

    await new LikeUser({
      userId: userId,
      likedUserId: likedUserId,
      date: formatDate(new Date()),
    }).save();

    return "like";
  },
};
