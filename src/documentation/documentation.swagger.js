"use strict";
/**
 * @swagger
 * tags:
 *   - name: Documentation
 *     description: Documentation related endpoints
 * /api/documentation/{activityId}:
 *   get:
 *     summary: Get all documentations by activity id
 *     description: Get all documentations by activity id
 *     tags: [Documentation]
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         description: api-key
 *         required: true
 *         schema:
 *           type: string
 *           example: secretapikey
 *       - in: path
 *         name: activityId
 *         required: true
 *         description: Activity ID
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 *   post:
 *     summary: Create a new documentation
 *     description: Create a new documentation
 *     tags: [Documentation]
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         description: api-key
 *         required: true
 *         schema:
 *           type: string
 *           example: secretapikey
 *       - in: path
 *         name: activityId
 *         required: true
 *         description: Activity ID
 *         schema:
 *           type: integer
 *           format: int32
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
