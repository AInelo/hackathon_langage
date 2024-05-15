const express = require('express')
const router = express.Router()
const { upload } = require("../middleware/uploadsFile");
const {
  getAllMembers,
  createMember,
  getMember,
  updateMember,
  deleteMember,
} = require('../controllers/memberController')

router.route('/').get(getAllMembers).post(upload.single("image"), createMember)
router.route('/:id').get(getMember).patch(updateMember).delete(deleteMember)

module.exports = router
