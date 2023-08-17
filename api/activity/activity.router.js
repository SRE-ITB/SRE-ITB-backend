const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const activityController = require('./activity.controller'); // Update import statement

// Route to get all activities
router.get('/', activityController.getAllActivities);

// router.get('/:id',
//     [
//         // Validate ID parameter using express-validator
//         param('id').isInt().withMessage('ID must be an integer'),
//     ],
//     activityController.getActivityById
// );

router.get('/:type', activityController.getActivityByType);

router.post(
    '/',
    activityController.createActivity
);

// Route to delete activity by ID
router.delete('/:id', activityController.deleteActivity);

// Route to update activity by ID
router.put('/:id',
    [
        // Validate ID parameter using express-validator
        param('id').isInt().withMessage('ID must be an integer'),
    ],
    activityController.updateActivity
);

// Add other routes as needed, such as routes to get activities by ID or other routes.

module.exports = router;
