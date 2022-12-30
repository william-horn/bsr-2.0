

const withApiHeaders = (handler) => {
  return async (req, res) => {
    try {
      res.setHeader('access-control-allow-origin', '*');
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, *");
      res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");

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

export default withApiHeaders;
