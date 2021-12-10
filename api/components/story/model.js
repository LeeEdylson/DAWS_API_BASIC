import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
});

const storyModel = mongoose.model("stories", storySchema);

export default storyModel;