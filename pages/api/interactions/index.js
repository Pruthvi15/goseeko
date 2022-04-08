import dbConnect from '../../../libs/dbConnect';
import Blogs from '../../../models/blogs';
import Interaction from '../../../models/interaction';

export default async function handler(req, res) {
  const { method, body } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        let likeIncrement = 0;
        let dislikeIncrement = 0;
        const existingInteraction = await Interaction.findOne({ userBlog: body.userBlog });
        const interaction = await Interaction.updateOne({ userBlog: body.userBlog }, { $set: body }, { upsert: true });
        const blogIdString = body.userBlog.split('-').pop();
        const blogId = parseInt(blogIdString, 10);
        if (existingInteraction)
          switch (existingInteraction.interaction) {
            case 0:
              if (body.interaction === 1) likeIncrement++;
              else if (body.interaction === -1) dislikeIncrement++;
              break;
            case 1:
              if (body.interaction === 0) likeIncrement--;
              else if (body.interaction === -1) {
                likeIncrement--;
                dislikeIncrement++;
              }
              break;
            case -1:
              if (body.interaction === 0) dislikeIncrement--;
              else if (body.interaction === 1) {
                dislikeIncrement--;
                likeIncrement++;
              }
              break;
            default:
          }
        else {
          if (body.interaction === 1) likeIncrement++;
          else if (body.interaction === -1) dislikeIncrement++;
        }
        const blog = await Blogs.updateOne(
          { blogId },
          { $set: { blogId }, $inc: { likes: likeIncrement, dislikes: dislikeIncrement } },
          { upsert: true }
        );
        res.send({ interaction, blog });
      } catch (err) {
        console.log(err);
        res.status(400).send({ message: 'Something went wrong' });
      }
      break;
    default:
      res.status(400).send({ message: 'Something went wrong' });
  }
}
