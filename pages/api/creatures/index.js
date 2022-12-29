import withDBConnect from "../../../lib/middleware/withDBConnect";
import withApiHeaders from "../../../lib/middleware/withApiHeaders";

const handler = async function (req, res) {
  try {
    const { 
      method, 
      db, 
      query, 
      headers,
      body: payload
    } = req;

    switch (method) {
      case 'GET':
        const creatures = await db.Creature.find({}).limit(50);
        res.status(200).json(creatures);

        break;

      case 'POST':
        let postedData;

        if (query.bulk === 'true') {
          postedData = await db.Creature.insertMany(payload);
          
        } else {
          postedData = await db.Creature.create({
            ...payload
          });
        }

        res.status(200).json({
          message: 'post was successful',
          data: postedData,
        });

        break;

      default:
        res.status(200).json({
          message: 'nothing happened'
        });
    }
  } catch(err) {
    console.log('Error: ', err);
    res.status(200).json({
      status: 'Error',
      message: err
    });
  }
}

export default withDBConnect(withApiHeaders(handler));