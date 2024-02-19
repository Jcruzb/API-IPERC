const express = require('express');
const router = express.Router();
const processController = require('../controllers/process.controller');

router.post('/process', processController.createProcess);
router.get('/processes', processController.getAllProcesses);
router.put('/process/:id', processController.updateProcess);
router.get('/processdetail/:id', processController.getProcessById);
router.delete('/process/:id', processController.deleteProcess);

module.exports = router;