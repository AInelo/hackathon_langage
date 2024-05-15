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

const {OpenaiGenerateImage, OpenaiGenerateAudioFromText } = require("../controllers/openaiController");

router.route('/GenerateImage').post(OpenaiGenerateImage);
router.route('/generateAudio').post(OpenaiGenerateAudioFromText);

router.route('/').get(getAllMembers).post(upload.single("image"), createMember)
router.route('/:id').get(getMember).patch(updateMember).delete(deleteMember)

module.exports = router
