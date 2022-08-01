const { AdoptedQuestionnarie } = require("../../DataBase/AdoptedQuestionnaire");
const { AdopterQuestionnarie } = require("../../DataBase/AdopterQuestionnaire");
const { User } = require("../../DataBase/User");
const { Message } = require("../../DataBase/Messaje");
module.exports = {
  getAdopterInfo: async (parent, { id }, context) => {
    try {
      const userInfo = await User.findById(id);
      const adopterInfo = await AdopterQuestionnarie.findOne({
        userId: id,
      });

      console.log(adopterInfo);

      return {
        userInfo: userInfo,
        adopterInfo: adopterInfo,
      };
    } catch (error) {
      throw new Error(error);
    }
  },
  getAdoptedInfo: async (parent, { id }, context) => {
    try {
      const pets = await AdoptedQuestionnarie.find({ userId: id });

      return pets;
    } catch (error) {
      throw new Error(error);
    }
  },
  getChat: async (parent, { userId, partnerId }) => {
    const messages = await Message.find({
      $or: [
        { from: userId, to: partnerId },
        {
          from: partnerId,
          to: userId,
        },
      ],
    });
    return messages;
  },
};
