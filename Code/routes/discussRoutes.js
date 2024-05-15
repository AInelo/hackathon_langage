const express = require('express')
const router = express.Router()
const { upload } = require("../middleware/uploadsFile");

const {SpeechFonToTextFrench} = require('../controllers/discussController');

router.route('/record', upload.single('audio')).post(SpeechFonToTextFrench);

module.exports = router;