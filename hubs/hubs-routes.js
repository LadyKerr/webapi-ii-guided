const express = require('express');
const Hubs = require('./hubs-model');
const route = express.Router();

route.get("/:name", (req, res) => {
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

route.get('/api/hubs', async (req, res) => {
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

route.get('/api/hubs/:id', async (req, res) => {
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

route.post('/api/hubs', async (req, res) => {
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

route.delete('/api/hubs/:id', async (req, res) => {
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

route.put('/api/hubs/:id', async (req, res) => {
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
route.get('/api/hubs/:id/messages', async (req, res) => {
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
route.post('/api/hubs/:id/messages', async (req, res) => {
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

module.exports = route;
