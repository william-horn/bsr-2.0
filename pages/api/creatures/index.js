import withDBConnect from "../../../lib/middleware/withDBConnect";
import withApiHeaders from "../../../lib/middleware/withApiHeaders";

const handler = async function (req, res) {
  res.status(200).json({ message: 'testing index' });
}

export default withDBConnect(withApiHeaders(handler));