import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});

//crear el modelo
const commentModel = mongoose.model("comments", commentSchema);

export default commentModel;
