const prisma = require('../../prisma/client');

exports.createCustomer = async (data) => {
  try {
    return await prisma.customer.create({ data });
  } catch (err) {
    if (err.code === 'P2002') {
      const error = new Error('Email or phone already exists');
      error.statusCode = 409;
      throw error;
    }
    throw err;
  }
};

exports.getCustomers = async (page, limit, search) => {
  const skip = (page - 1) * limit;

  const whereClause = search
    ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } },
          { company: { contains: search, mode: 'insensitive' } }
        ]
      }
    : {};

  const [totalRecords, customers] = await Promise.all([
    prisma.customer.count({ where: whereClause }),
    prisma.customer.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    })
  ]);

  return {
    page,
    limit,
    totalRecords,
    totalPages: Math.ceil(totalRecords / limit),
    data: customers
  };
};


exports.getCustomerById = async (id) => {
  const customer = await prisma.customer.findUnique({
    where: { id }
  });

  if (!customer) {
    const error = new Error('Customer not found');
    error.statusCode = 404;
    throw error;
  }

  return customer;
};

exports.updateCustomer = async (id, data) => {
  try {
    return await prisma.customer.update({
      where: { id },
      data
    });
  } catch (err) {
    if (err.code === 'P2002') {
      const error = new Error('Email or phone already exists');
      error.statusCode = 409;
      throw error;
    }
    if (err.code === 'P2025') {
      const error = new Error('Customer not found');
      error.statusCode = 404;
      throw error;
    }
    throw err;
  }
};

exports.deleteCustomer = async (id) => {
  try {
    await prisma.customer.delete({
      where: { id }
    });
  } catch (err) {
    const error = new Error('Customer not found');
    error.statusCode = 404;
    throw error;
  }
};
