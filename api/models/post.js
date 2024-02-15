import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, "Userd is required!"],
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    // hashtags: {
    //   type: String,
    //   required: [true, "Please add hashtags"],
    // },
    image: {
      type: String,
      required: false,
    },
    likes: {
      type: [String],
      required: false,
    },
    totalComments: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
