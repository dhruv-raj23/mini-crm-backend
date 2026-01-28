const express = require('express');
const cors = require('cors');

const authRoutes = require('./modules/auth/auth.routes');

const authMiddleware = require('./middlewares/auth.middleware');
const roleMiddleware = require('./middlewares/role.middleware');

const usersRoutes = require('./modules/users/users.routes');

const customersRoutes = require('./modules/customers/customers.routes');

const tasksRoutes = require('./modules/tasks/tasks.routes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

app.get('/protected-test',
  authMiddleware,
  roleMiddleware('ADMIN'),
  (req, res) => {
    res.json({ message: 'Admin access granted' });
  }
);

app.use('/users', usersRoutes);

app.use('/customers', customersRoutes);

app.use('/tasks', tasksRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.json({ message: 'Mini CRM API running' });
});

module.exports = app;
