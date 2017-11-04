// @todo: get CORS config from wherever, probably env
export default function cors(req, res, next) {
  const origins = ['www.raiseyourwebsite.com', 'localhost', 'raiseyourwebsite.local'];
  const methods = ['GET', 'POST'];
  const headers = ['Content-Type'];

  const origin = origins.indexOf(req.hostname);
  const method = methods.indexOf(req.method);
  if (origin < 0 || method < 0) {
    return res.sendStatus(401);
  }

  res.header("Access-Control-Allow-Origin", origins[origin]);
  res.header("Access-Control-Allow-Headers", headers.join(','));
  next();
};
