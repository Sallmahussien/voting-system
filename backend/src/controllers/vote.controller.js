import TopicDao from "../models/topic.dao.js";
import OptionDao from "../models/option.dao.js";
import VoteDao from "../models/vote.dao.js";

class VoteController {
  static async vote(req, res) {
    const optionId = parseInt(req.params.optionId);
    const userId = req.user.id;
  
    try {
      const option = await OptionDao.getOptionById(optionId);
      if (!option) {
        return res.status(404).json({ message: 'Option not found' });
      }
      const topicId = option.topicId;
  
      const existingVote = await VoteDao.getVoteByUserAndTopic(userId, topicId);
  
      if (existingVote) {
        return res.status(400).json({ message: 'You have already voted for this topic' });
      }

      const updatedOption = await OptionDao.increaseOptionCount(optionId);
      const updatedTopic = await TopicDao.increaseVoteCount(topicId);
      await VoteDao.createVote({ userId, optionId, topicId });

      const options = await OptionDao.getOptionsByTopicId(topicId);

      return res.status(201).json({ topicVotes: updatedTopic.votesCount, ...options});
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  

}

export default VoteController;