const Posts = require('../models/posts');

const dashboard = async (req, res) => {
  try {
    const activeCount = await Posts.countDocuments({ active: true });
    const inactiveCount = await Posts.countDocuments({ active: false });

    res.json({ activeCount, inactiveCount });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving post counts' });
  }
}
  ;

const retrievePost = async (req, res) => {
  const { longitude, latitude } = req.query;

  try {
    const post = await Posts.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: 10000, 
        },
      },
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  dashboard,
  retrievePost
};
