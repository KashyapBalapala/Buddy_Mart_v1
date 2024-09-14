const users = require('./users.mongo');

async function createNewUser(user) {
  await users.findOneAndUpdate({
    email: user.email,
  }, user, {
      upsert: true,
  });
}

function isUser(id) {
  if (users.has(id))
    return true;
  return false;
}

async function allUsers() {
  return await users.find({});
}


async function addFriendRequest(senderId, receiverId) {
  try {
    await users.findByIdAndUpdate(senderId, { $push: { friends: receiverId } });
    await users.findByIdAndUpdate(receiverId, { $push: { friends: senderId } });
    return true;
  } catch (err) {
    console.log(`Could not find update friends`);
  }
  
}

async function getUser(userId) {
  try {
    const user = await users.findOne({_id: userId});
    return user;
  } catch(err) {
    console.log(`Could not find ${userId} userId : ${err}`);
  }
}

async function updateBucketDetails(user, bucketId) {
  user.bucketId = bucketId;
  try {
    await users.findOneAndUpdate({
      _id: users._id,
    }, user, {
      upsert: true,
    });
  } catch(err) {
    console.log('Problem in updating bucket to user');
  }
}


module.exports = {
  createNewUser,
  isUser,
  allUsers,
  addFriendRequest,
  getUser,
  updateBucketDetails
}
