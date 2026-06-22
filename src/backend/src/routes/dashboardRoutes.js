const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/summary', authMiddleware, dashboardController.getSummary);
router.get('/chart', authMiddleware, dashboardController.getMovementsChart);
router.get('/movements-chart', authMiddleware, dashboardController.getMovementsChart);
router.get('/top-products', authMiddleware, dashboardController.getTopProducts);

module.exports = router;
