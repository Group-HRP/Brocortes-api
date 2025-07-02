import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Criação de categorias
  await prisma.category.createMany({
    data: [
      { name: 'Corte Masculino' },
      { name: 'Barba' },
      { name: 'Sobrancelha' },
    ],
  });

  // Criação de serviços
  await prisma.service.createMany({
    data: [
      { name: 'Corte simples', duration: 30, price: 40 },
      { name: 'Barba desenhada', duration: 25, price: 25 },
      { name: 'Sobrancelha com navalha', duration: 15, price: 20 },
    ],
  });

  // Criação de um usuário
  await prisma.user.create({
    data: {
      name: 'Pedro Ramos',
      email: 'pedro@example.com',
      password: '123456', // Lembre-se de hashear em produção
      role: 'admin',
    },
  });
}

main()
  .then(() => {
    console.log('Seed executada com sucesso.');
  })
  .catch((e) => {
    console.error('Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
