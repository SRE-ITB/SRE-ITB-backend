const activityService = require('./activity.service'); // Update import statement
const { validationResult } = require('express-validator');

module.exports = {
    createActivity: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error(errors.array());
            return res.status(400).json({
                message: 'Validation error',
                errors: errors.array(),
            });
        }

        const data = req.body;
        activityService.createActivityWithDocumentation(data, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: 'Failed to create activity',
                });
            }
            return res.status(201).json({
                message: 'Activity and documentation added successfully',
            });
        });
    },

    deleteActivity: (req, res) => {
        const id = req.params.id;
        activityService.deleteActivity(id, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: 'Database connection error',
                });
            }
            if (results.affectedRows === 0) {
                return res.json({
                    message: 'Record not found',
                });
            }
            return res.json({
                message: 'Activity deleted successfully',
            });
        });
    },

    getActivityById: (req, res) => {
        const activityId = req.params.id;
        activityService.getActivityById(activityId, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: 'Database connection error',
                    data: null,
                });
            }

            if (!results) {
                return res.status(404).json({
                    message: 'Activity not found',
                    data: null,
                });
            }

            return res.status(200).json({
                message: 'Activity found',
                data: results,
            });
        });
    },

    getActivityByType: (req, res) => {
        const activityType = req.params.type;
        activityService.getActivityByType(activityType, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: 'Database connection error',
                    data: null,
                });
            }

            if (!results) {
                return res.status(404).json({
                    message: 'Activity not found',
                    data: null,
                });
            }

            return res.status(200).json({
                message: 'Activity found',
                data: results,
            });
        });
    },

    // Get all activities
    getAllActivities: (req, res) => {
        activityService.getAllActivities((err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: 'Database connection error',
                    data: null,
                });
            }

            return res.status(200).json({
                message: 'All activities retrieved',
                data: results,
            });
        });
    },

    updateActivity: (req, res) => {
        const activityId = req.params.id;
        const data = req.body;

        activityService.updateActivity(activityId, data, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: 'Database connection error',
                });
            }

            if (results.affectedRows === 0) {
                return res.json({
                    message: 'Activity not found or no changes were made',
                });
            }

            return res.json({
                message: 'Activity updated successfully',
            });
        });
    },

    // Add other functions as needed, such as functions to get activities by ID or other functions.
};
