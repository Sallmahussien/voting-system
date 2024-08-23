import { PrismaClient } from '@prisma/client';
import prismaMiddleware from '../middlewares/prisma.middleware.js';

const prisma = new PrismaClient();
prismaMiddleware(prisma); 

export default prisma;
