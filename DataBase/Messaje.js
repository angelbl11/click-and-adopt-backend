const {Schema, model} = require("mongoose")

const schema = new Schema({
    from: {
        required: true,
        type: String
    },

    to: {
        required: true,
        type: String
    },

    body: {
        required: true,
        type: String
    }
});

module.exports = {
	Message: model("Messages", schema),
};