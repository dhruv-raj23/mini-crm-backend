const prisma = require('../../prisma/client');

exports.createTask = async (data) => {
  const { title, description, assignedTo, customerId, status } = data;

  const employee = await prisma.user.findUnique({
    where: { id: assignedTo }
  });

  if (!employee || employee.role !== 'EMPLOYEE') {
    const error = new Error('Assigned user must be an EMPLOYEE');
    error.statusCode = 404;
    throw error;
  }

  const customer = await prisma.customer.findUnique({
    where: { id: customerId }
  });

  if (!customer) {
    const error = new Error('Customer not found');
    error.statusCode = 404;
    throw error;
  }

  return prisma.task.create({
    data: {
      title,
      description,
      status,
      assignedToId: assignedTo,
      customerId
    }
  });
};

exports.getTasks = async (user) => {
  const whereClause =
    user.role === 'EMPLOYEE'
      ? { assignedToId: user.userId }
      : {};

  return prisma.task.findMany({
    where: whereClause,
    include: {
      assignedTo: {
        select: { id: true, name: true, email: true }
      },
      customer: {
        select: { id: true, name: true, email: true, phone: true }
      }
    }
  });
};

exports.updateTaskStatus = async (taskId, status, user) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId }
  });

  if (!task) {
    const error = new Error('Task not found');
    error.statusCode = 404;
    throw error;
  }

  if (user.role === 'EMPLOYEE' && task.assignedToId !== user.userId) {
    const error = new Error('Forbidden');
    error.statusCode = 403;
    throw error;
  }

  return prisma.task.update({
    where: { id: taskId },
    data: { status }
  });
};
