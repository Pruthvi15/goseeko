import dbConnect from '../../../libs/dbConnect';
import Interaction from '../../../models/interaction';

export default async function handler(req, res) {
  const {
    method,
    query: { id }
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const interaction = await Interaction.findOne({ userBlog: id });
        res.send(interaction);
      } catch {
        res.status(400).send({ message: 'Something went wrong' });
      }
      break;
    default:
      res.status(400).send({ message: 'Something went wrong' });
  }
}
