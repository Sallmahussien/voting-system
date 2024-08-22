import prisma from './client.db.js';
import { hashPassword  } from '../utils/auth.js';

class UserDao {
  static async createUser(userData) {
    userData.password = await hashPassword(userData.password);
    return prisma.user.create({
      data: userData
    });
  }

  static async getUserById(id) {
    return prisma.user.findUnique({
      where: {
        id: id,
      }
    });
  }

  static async getUserByEmail(email) {
    return prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }
}

export default UserDao;
