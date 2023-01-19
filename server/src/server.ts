import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import cors from '@fastify/cors'

const prisma = new PrismaClient();
const app = fastify()

app.register(cors)

app.get('/', async () => {
    const habits = await prisma.habit.findMany({
        where: {
            title: {
                startsWith: "Beber"
            }
        }
    });
    return habits
})

app.listen({
    port: 3333,
}).then(() => {
    console.log('Server running.')
})