// Import required libraries
const express = require('express');
const _ = require('lodash'); // Lodash for utilities
const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Dummy data for users
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

// 1. GET - Fetch all users
app.get('/users', (req, res) => {
  res.json(users);
});

// 2. GET - Fetch a single user by ID
app.get('/users/:id', (req, res) => {
  const user = _.find(users, { id: parseInt(req.params.id) });
  if (!user) return res.status(404).send('User not found');
  res.json(user);
});

// 3. POST - Add a new user
app.post('/users', (req, res) => {
  const newUser = {
    id: _.maxBy(users, 'id').id + 1, // Get the next ID
    name: req.body.name,
    email: req.body.email,
  };
  users.push(newUser);
  res.status(201).json(newUser); // 201: Created
});

// 4. PUT - Replace an entire user
app.put('/users/:id', (req, res) => {
  const user = _.find(users, { id: parseInt(req.params.id) });
  if (!user) return res.status(404).send('User not found');

  // Replace user data completely
  _.assign(user, {
    name: req.body.name,
    email: req.body.email,
  });

  res.json(user);
});

// 5. PATCH - Update specific fields of a user
app.patch('/users/:id', (req, res) => {
  const user = _.find(users, { id: parseInt(req.params.id) });
  if (!user) return res.status(404).send('User not found');

  // Update only specified fields
  _.assign(user, _.pick(req.body, ['name', 'email']));

  res.json(user);
});

// 6. DELETE - Remove a user by ID
app.delete('/users/:id', (req, res) => {
  const userIndex = _.findIndex(users, { id: parseInt(req.params.id) });
  if (userIndex === -1) return res.status(404).send('User not found');

  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser);
});

// 7. HEAD - Check if a user exists
app.head('/users/:id', (req, res) => {
  const user = _.find(users, { id: parseInt(req.params.id) });
  if (!user) return res.status(404).send('User not found');
  res.status(200).end(); // Only sends headers
});

// 8. OPTIONS - Show allowed operations
app.options('/users', (req, res) => {
  res.set('Allow', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD').send();
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
