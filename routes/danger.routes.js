const express = require('express');
const router = express.Router();
const dangerController = require('../controllers/danger.controller');

router.post('/danger', dangerController.createDanger);
router.get('/dangers', dangerController.getAllDangers);
router.put('/danger/:id', dangerController.updateDanger);
router.get('/dangerdetail/:id', dangerController.getDangerById);
router.delete('/danger/:id', dangerController.deleteDanger);

module.exports = router;