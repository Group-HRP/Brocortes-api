"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.category.createMany({
        data: [
            { name: 'Corte Masculino' },
            { name: 'Barba' },
            { name: 'Sobrancelha' },
        ],
    });
    await prisma.service.createMany({
        data: [
            { name: 'Corte simples', duration: 30, price: 40 },
            { name: 'Barba desenhada', duration: 25, price: 25 },
            { name: 'Sobrancelha com navalha', duration: 15, price: 20 },
        ],
    });
    await prisma.user.create({
        data: {
            name: 'Pedro Ramos',
            email: 'pedro@example.com',
            password: '123456',
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
//# sourceMappingURL=seed.js.map