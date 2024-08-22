import TopicDao from './topic.dao.js'; // Adjust the path based on your project structure

(async () => {
  try {
    // 1. Create a new topic
    const newTopic = {
      title: 'Test Topic',
      description: 'This is a test topic.',
      startDate: new Date(), // Start date as now
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // End date 7 days from now
      status: 'INACTIVE' // Default status
    };

    const createdTopic = await TopicDao.createTopic(newTopic);
    console.log('Created Topic:', createdTopic);

    // 2. Retrieve the created topic by ID
    const retrievedTopic = await TopicDao.getTopicById(createdTopic.id);
    console.log('Retrieved Topic by ID:', retrievedTopic);

    // 3. Update the topic's details
    const updatedData = {
      title: 'Updated Test Topic',
      description: 'This is an updated test topic.',
      status: 'CANCELLED' // Extend end date by 14 days
    };

    const updatedTopic = await TopicDao.updateTopicById(createdTopic.id, updatedData);
    console.log('Updated Topic:', updatedTopic);

    // 4. Retrieve the updated topic by ID
    const retrievedUpdatedTopic = await TopicDao.getTopicById(createdTopic.id);
    console.log('Retrieved Updated Topic:', retrievedUpdatedTopic);

    const allActive = await TopicDao.getActiveTopics();
    console.log("active topics:", allActive);

  } catch (error) {
    console.error('Error during testing:', error);
  }
})();
