import mongoose from 'mongoose';

const InteractionSchema = new mongoose.Schema({
  userBlog: {
    type: String,
    required: [true, 'userBlog is not defined.']
  },
  interaction: {
    type: Number,
    required: [true, 'interaction is not defined']
  }
});

export default mongoose.models.Interaction || mongoose.model('Interaction', InteractionSchema);
