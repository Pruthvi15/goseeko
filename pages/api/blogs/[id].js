import dbConnect from '../../../libs/dbConnect';
import Blogs from '../../../models/blogs';

export default async function handler(req, res) {
  const {
    method,
    query: { id }
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const blog = await Blogs.findOne({ blogId: id });
        res.send(blog);
      } catch {
        res.status(400).send({ message: 'Something went wrong' });
      }
      break;
    default:
      res.status(400).send({ message: 'Something went wrong' });
  }
}
