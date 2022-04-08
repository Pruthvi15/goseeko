import mongoose from 'mongoose';

const BlogsSchema = new mongoose.Schema({
  blogId: {
    type: Number,
    required: [true, 'blogId is not defined']
  },
  likes: {
    type: Number
  },
  dislikes: {
    type: Number
  }
});

export default mongoose.models.Blogs || mongoose.model('Blogs', BlogsSchema);
