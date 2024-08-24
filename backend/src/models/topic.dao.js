import prisma from "./client.db.js";

class TopicDao {
  static async createTopic(topicData) {
    return prisma.topic.create({
      data: topicData
    });
  }

  static async getTopicById(id) {
    return prisma.topic.findUnique({
      where: {
        id: id,
      },
    });
  }

  static async updateTopicById(id, topicObj) {
    return prisma.topic.update({
      where: {
        id: id,
      },
      data: topicObj,
    });
  }

  static async increaseVoteCount(id) {
    return prisma.topic.update({
      where: {
        id: id,
      },
      data: {
        votesCount: {
          increment: 1,
        }
      }
    });
  }

  static async getAllTopicsToBePostponed() {
    const now = new Date();
    return prisma.topic.findMany({
      where: {
        startDate: {
          gt: now
        },
        status: {
          not: 'CANCELLED'
        }
      }
    });
  }

  static async getAllTopicsToBeExtended() {
    const now = new Date();
    return prisma.topic.findMany({
      where: {
        endDate: {
          gt: now
        },
        status: {
          not: 'CANCELLED'
        }
      }
    });
  }

  static async getAllTopicsToBeCancelled() {
    const now = new Date();
    return prisma.topic.findMany({
      where: {
        OR: [
          {
            status: 'ACTIVE',
          },
          {
            startDate: {
              gte: now,
            }
          }
        ],
        status: {
          not: 'CANCELLED',
        },
      }
    });
  }

  static async getActiveTopics() {
    return prisma.topic.findMany({
      where: {
        status: 'ACTIVE',
      },
    });
  }

  static async getRecentFinishedTopics() {
    const now = new Date();
    const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));

    return prisma.topic.findMany({
      where: {
        endDate: {
          lt: sevenDaysAgo,
        },
        status: {
          not: 'CANCELLED',
        }
      },
    });
  }

  static async getComingSoonTopics() {
    const now = new Date();
    const sevenDaysLater = new Date(now.setDate(now.getDate() + 7));

    return prisma.topic.findMany({
      where: {
        startDate: {
          gt: sevenDaysLater,
        },
        status: {
          not: 'CANCELLED',
        }
      },
    });
  }

  static async getAllTopicsSortedByStartDate() {
    return prisma.topic.findMany({
      where: {
        status: {
          not: 'CANCELLED',
        },
      },
      orderBy: {
        startDate: 'desc',
      },
    });
  }
}

export default TopicDao;
