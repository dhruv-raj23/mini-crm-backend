const prisma = require('../src/prisma/client');

module.exports = async () => {
  await prisma.$disconnect();
};
