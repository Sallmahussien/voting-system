import OptionDao from '../models/option.dao.js';
import TopicDao from '../models/topic.dao.js';

class OptionController {
  static async getOptions(req, res) {
    const topicId = parseInt(req.params.topicId);

    try {
      const topic = await TopicDao.getTopicById(topicId);
      if (!topic) {
        return res.status(404).json({ message: 'Topic not found' });
      }

      const options = await OptionDao.getOptionsByTopicId(topicId);

      return res.status(200).json(options);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default OptionController;
