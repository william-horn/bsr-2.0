import withDBConnect from "../../../lib/middleware/withDBConnect";
import withApiHeaders from "../../../lib/middleware/withApiHeaders";

const handler = async function (req, res) {
  try {
    const { 
      method, 
      models,
      db,
      query, 
      headers,
      body: payload
    } = req;

    switch (method) {
      case 'GET':
        const creatures = await models.Creature.find({}).limit(50);
        res.status(200).json(creatures);

        break;

      case 'POST':
        let postedData;

        if (query.bulk === 'true') {
          postedData = await models.Creature.insertMany(payload);
          
        } else {
          postedData = await models.Creature.create(payload);
        }

        res.status(200).json({
          message: 'post was successful',
          data: postedData,
        });

        break;

      case 'PUT': 

        // const updated = await db.collections.creatures.updateMany({}, {
        //   $unset: { "drops.$[].items.$[].dropTrials": "" }
        // });
        const test = await models.Creature.update({ name: 'Aberrant Dragon Titan' }, {
          $set: { testKey: 'lol' }
        });

        res.status(200).json({ message: 'worked', info: test });
        
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