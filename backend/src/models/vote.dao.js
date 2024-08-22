import prisma from "./client.db.js";

class VoteDao {
  static async craeteVote(voteData) {
    return prisma.vote.create({
      data: voteData,
    });
  }
}

export default VoteDao;