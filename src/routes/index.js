import express from 'express';
import body from 'body-parser';

const routes = express.Router();

routes.use(body.json());

routes.use('/custom/:code', (req, res, next) => {
  let code = req.params.code;
  let x = y + z;
  res.status(code).end();
});

routes.use('*', (req, res, next) => {
  res.status(200).json({data: 'OK'});
});

export default routes;
