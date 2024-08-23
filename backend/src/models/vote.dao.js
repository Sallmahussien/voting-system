import prisma from "./client.db.js";

class VoteDao {
  static async createVote(voteData) {
    return prisma.vote.create({
      data: voteData,
    });
  }

  static async getVoteByUserAndTopic(userId, topicId) {
    return prisma.vote.findFirst({
      where: {
        userId,
        topicId
      }
    });
  }
 }

export default VoteDao;