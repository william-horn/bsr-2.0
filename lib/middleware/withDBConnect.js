import dbConnect from '../../db/connectDB';
import User from '../../db/models/User';
import Creature from '../../db/models/Creature';

dbConnect();

const withDBConnect = (handler) => {
  return async (req, res) => {
    try {
      req.db = {
        User,
        Creature
      }

      return handler(req, res);
    } catch(err) {
      if (err) {
        console.log('Error: ', err);
        return;
      }

      return res.status(500).json({
        message: 'something went wrong',
        err
      });
    }
  }
}

export default withDBConnect;

