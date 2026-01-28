const prisma = require('../../prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (data) => {
  const { name, email, password, role } = data;

  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    const error = new Error('Email already exists');
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    }
  });

  return user;
};

exports.login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return {
    accessToken: token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};
