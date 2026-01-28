const prisma = require('../../prisma/client');

exports.getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true
    }
  });
};

exports.getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id }
  });

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt
  };
};

exports.updateUserRole = async (id, role) => {
  const user = await prisma.user.findUnique({
    where: { id }
  });

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  return prisma.user.update({
    where: { id },
    data: { role },
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    }
  });
};
