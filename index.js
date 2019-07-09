const express = require('express');

const Hubs = require('./hubs/hubs-model.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

// server.get('/api/:name', (req, res) => {
//   const { name } = req.params;
//   const { job } = req.query;
//   const { age } = req.body;
//   res.status(200).json({ success: true, message: `${name} is ${age} and works as a ${job}`})
// });

// server.get('/api/:name', (req, res) => {
//   const { query, body, params } = req;

//   if (!query.job || !body.age) {
//     res.json('Age or job are missing');
//   }
//   else {
//     res.json(`${params.name} is a ${query.job} and is ${body.age} years old`);
//   }
// });

server.get("/:name", (req, res) => {
  const { name } = req.params;
  const { job } = req.query;
  const { age } = req.body;
  if (!name || !age || !job) {
    res.status(400).json({ error: "You must provide the name, age and job" });
  } else {
    const message = `${name} is ${age} and he is a ${job}`;
    res.json(message);
  }
});

server.get('/api/hubs', async (req, res) => {
  try {
    const hubs = await Hubs.find(req.query);
    res.status(200).json(hubs);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hubs',
    });
  }
});

server.get('/api/hubs/:id', async (req, res) => {
  try {
    const hub = await Hubs.findById(req.params.id);

    if (hub) {
      res.status(200).json(hub);
    } else {
      res.status(404).json({ message: 'Hub not found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hub',
    });
  }
});

server.post('/api/hubs', async (req, res) => {
  try {
    const hub = await Hubs.add(req.body);
    res.status(201).json(hub);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error adding the hub',
    });
  }
});

server.delete('/api/hubs/:id', async (req, res) => {
  try {
    const count = await Hubs.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The hub has been nuked' });
    } else {
      res.status(404).json({ message: 'The hub could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the hub',
    });
  }
});

server.put('/api/hubs/:id', async (req, res) => {
  try {
    const hub = await Hubs.update(req.params.id, req.body);
    if (hub) {
      res.status(200).json(hub);
    } else {
      res.status(404).json({ message: 'The hub could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error updating the hub',
    });
  }
});

// add an endpoint that returns all the messages for a hub
server.get('/api/hubs/:id/messages', async (req, res) => {
  try {
    const { id } = req.params;
    const hub = await Hubs.findById(id)
    if (hub) {
      const hubs = await Hubs.findHubMessages(id)
      res.status(200).json(hubs)
    } else {
      res.status(404).json({ errorMessage: 'Can\'t find that id!!' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Can't find the message for that hub" })
  }
});

// add an endpoint for adding new message to a hub
server.post('/api/hubs/:id/messages', async (req, res) => {
  const messageInfo = { ...req.body, hub_id: req.params.id };
  try {
    const message = await Hubs.addMessage(messageInfo);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({
      message: 'Error adding the message',
    });
  }
});

server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
