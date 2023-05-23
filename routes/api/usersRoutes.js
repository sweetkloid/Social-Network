const router = require('express').Router();
const{
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,

} = require('../../controllers/userController.js');

router.route('/').get(getUsers).post(createUser);
router.route('/:userId/friends/:friendId').post(addFriend);
router.route('/:userId/friends/:friendId').delete(deleteFriend);
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);


module.exports = router