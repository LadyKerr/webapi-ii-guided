const express = require('express');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

server.use('/api/hubs', hubsRouter);


server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
