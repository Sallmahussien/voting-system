import TopicDao from '../models/topic.dao.js';
import OptionDao from '../models/option.dao.js';

class TopicController {
  static async createTopic(req, res) {
    const { title, description, startDate, endDate, options } = req.body;

    try {
      const topicData = { title, description, startDate, endDate };
      const createdTopic = await TopicDao.createTopic(topicData);
      const topicId = createdTopic.id;
      const createdOptions = [];

      for (const optionText of options) {
        const optionData = { optionText, topicId };
        const createdOption = await OptionDao.createOption(optionData);
        createdOptions.push(createdOption)
      }

      return res.status(201).json({ ...createdTopic, options: createdOptions });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getTopicById(req, res) {
    const topicId = parseInt(req.params.topicId);

    try {
      const topic = await TopicDao.getTopicById(topicId);
      if (!topic) {
        return res.status(404).json({ message: "Topic Not Found" });
      }

      return res.status(200).json(topic);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getAllTopicsToBePostponed(req, res) {
    try {
      const topics = await TopicDao.getAllTopicsToBePostponed();
      return res.status(200).json(topics);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getAllTopicsToBeExtended(req, res) {
    try {
      const topics = await TopicDao.getAllTopicsToBeExtended();
      return res.status(200).json(topics);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getAllTopicsToBeCancelled(req, res) {
    try {
      const topics = await TopicDao.getAllTopicsToBeCancelled();
      return res.status(200).json(topics);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async postponeTopic(req, res) {
    const topicId = parseInt(req.params.topicId);
    const { startDate } = req.body;

    try {
      const topic = await TopicDao.getTopicById(topicId);
      if (!topic) {
        return res.status(404).json({ message: "Topic Not Found" });
      }

      const newStartDate = new Date(startDate);
      const currentStartDate = new Date(topic.startDate);
      const now = new Date();

      if (currentStartDate <= now) {
        return res.status(400).json({ message: "Topic has already started." });
      }

      if (newStartDate <= currentStartDate) {
        return res.status(400).json({ message: "New start date must be later than the current start date." });
      }

      const updatedTopic = await TopicDao.updateTopicById(topicId, { startDate: newStartDate });

      return res.status(201).json(updatedTopic);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async extendTopic(req, res) {
    const topicId = parseInt(req.params.topicId);
    const { endDate } = req.body;
  
    try {
      const topic = await TopicDao.getTopicById(topicId);
      if (!topic) {
        return res.status(404).json({ message: "Topic Not Found" });
      }
  
      const newEndDate = new Date(endDate);
      const currentEndDate = new Date(topic.endDate);
      const currentStartDate = new Date(topic.startDate);
      const now = new Date();
  
      if (currentEndDate <= now) {
        return res.status(400).json({ message: "Topic has already ended." });
      }

      if (newEndDate <= currentEndDate) {
        return res.status(400).json({ message: "New end date must be later than the current end date." });
      }

      if (newEndDate <= currentStartDate) {
        return res.status(400).json({ message: "New end date must be later than the start date." });
      }

      const updatedTopic = await TopicDao.updateTopicById(topicId, { endDate: newEndDate });
      return res.status(201).json(updatedTopic);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async cancelTopic(req, res) {
    const topicId = parseInt(req.params.topicId);
  
    try {
      const topic = await TopicDao.getTopicById(topicId);
      if (!topic) {
        return res.status(404).json({ message: "Topic Not Found" });
      }

      if (topic.status === 'CANCELLED') {
        return res.status(400).json({ message: "Topic is already cancelled." });
      }

      const updatedTopic = await TopicDao.updateTopicById(topicId, { status: 'CANCELLED' });
      return res.status(200).json(updatedTopic);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getActiveTopics(req, res) {
    try {
      const activeTopics = await TopicDao.getActiveTopics();
      return res.status(200).json(activeTopics);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getRecentFinishedTopics(req, res) {
    try {
      const recentFinishedTopics = await TopicDao.getRecentFinishedTopics();
      return res.status(200).json(recentFinishedTopics);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getComingSoonTopics(req, res) {
    try {
      const comingSoonTopics = await TopicDao.getComingSoonTopics();
      return res.status(200).json(comingSoonTopics);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getAllTopicsSorted(req, res) {
    try {
      const allTopicsSorted = await TopicDao.getAllTopicsSortedByStartDate();
      return res.status(200).json(allTopicsSorted);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  
}

export default TopicController;
