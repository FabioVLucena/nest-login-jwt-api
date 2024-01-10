import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const zed = await prisma.user.create({
        data: {
            login: 'zed',
            password: '123'
        }
    });
    
    const pantheon = await prisma.user.create({
        data: {
            login: 'pantheon',
            password: '123'
        }
    });

    console.log(zed, pantheon);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1);
    });