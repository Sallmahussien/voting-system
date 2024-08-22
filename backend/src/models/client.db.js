import { PrismaClient } from '@prisma/client';
import prismaMiddleware from '../middlewares/prismaMiddleware.js';

const prisma = new PrismaClient();
prismaMiddleware(prisma); 

export default prisma;
