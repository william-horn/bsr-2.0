// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import withApiHeaders from '../../lib/middleware/withApiHeaders';
import withDBConnect from '../../lib/middleware/withDBConnect';

const handler = async function(req, res) {
  try {
    const { method, db } = req;

    switch (method) {
      case 'GET': 
        const users = await db.User.find({});
        res.status(200).json({ got: 'something', users });
        break;

      case 'POST': 
        const user = await db.User.create({
          ...req.body
        });

        res.status(200).json({
          message: 'created new user!',
          user,
        });

        break;

      default:
        res.status(200).json({ message: 'nothing happened' });
        return;
    }

  } catch(err) {
    console.log('Error: ', err);
    res.status(200).json({ status: 'SERVER_ERROR', message: err });
  }
};

export default withDBConnect(withApiHeaders(handler));
