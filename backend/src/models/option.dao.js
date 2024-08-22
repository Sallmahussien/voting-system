import prisma from './client.db.js';

class OptionDao {
  static async createOption(optionData) {
    return prisma.option.create({
      data: optionData,
    });
  }

  static async increaseOptionCount(optionId) {
    return prisma.option.update({
      where: {
        id: optionId,
      },
      data: {
        count: {
          increment: 1,
        },
      },
    });
  }

  static async getOptionsByTopicId(topicId) {
    return prisma.option.findMany({
      where: {
        topicId: topicId,
      },
    });
  }

  static async getOptionById(optionId) {
    return prisma.option.findUnique({
      where: {
        id: optionId,
      },
    });
  }
}

export default OptionDao;
