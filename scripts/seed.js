const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const prisma = new PrismaClient()

async function main() {
  const company = await prisma.company.create({
    data: {
      name: 'Best Power Equipments India Pvt. Ltd.',
      slug: 'bpe',
      primaryColor: '#1a56db',
      whatsappNumber: '+919311995859',
      websiteUrl: 'https://www.bpee.com',
    }
  })

  const hashed = await bcrypt.hash('password123', 10)
  await prisma.admin.create({
    data: {
      name: 'Admin',
      email: 'admin@bpe.com',
      password: hashed,
      companyId: company.id
    }
  })

  console.log('Seeded company:', company.id)
  console.log('Admin login: admin@bpe.com / password123')
}

main().catch(console.error).finally(() => prisma.$disconnect())