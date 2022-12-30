import dbConnect from '../../db/connectDB';
import User from '../../db/models/User';
import Creature from '../../db/models/Creature';

const withDBConnect = (handler) => {
  return async (req, res) => {
    try {
      const dbConnection = await dbConnect();

      /*
        access collection/models in db connection:

        const db = dbConnection.connection;

        db.collection('creature').updateMany(...);
        db.collection(...).method(...)
      */

      req.models = {
        User,
        Creature
      }

      req.db = dbConnection.connection;
      return handler(req, res);

    } catch(err) {
      console.log('Error: ', err);
      
      return res.status(500).json({
        message: 'something went wrong',
        err
      });
    }
  }
}

export default withDBConnect;

