"use strict";
/**
 * @swagger
 * tags:
 *   - name: Activity
 *     description: Activity related endpoints
 * /api/activity:
 *   get:
 *     summary: Get all activities
 *     description: Get all activities
 *     tags: [Activity]
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         description: api-key
 *         required: true
 *         schema:
 *           type: string
 *           example: secretapikey
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 *   post:
 *     summary: Create Activity
 *     description: Create a new activity entry
 *     tags: [Activity]
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         description: api-key
 *         required: true
 *         schema:
 *           type: string
 *           example: secretapikey
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               caption:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [internal, external, learning, project]
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   # your response structure here
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 * /api/activity/{id}:
 *   get:
 *     summary: Get Activity by ID
 *     description: Get an activity by id
 *     tags: [Activity]
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         description: api-key
 *         required: true
 *         schema:
 *           type: string
 *           example: secretapikey
 *       - in: path
 *         name: id
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
 *   patch:
 *     summary: Update Activity by ID
 *     description: Update an activity by id
 *     tags: [Activity]
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         description: api-key
 *         required: true
 *         schema:
 *           type: string
 *           example: secretapikey
 *       - in: path
 *         name: id
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
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               caption:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [internal, external, learning, project]
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 *   delete:
 *     summary: Delete Activity by ID
 *     description: Delete an activity by id
 *     tags: [Activity]
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         description: api-key
 *         required: true
 *         schema:
 *           type: string
 *           example: secretapikey
 *       - in: path
 *         name: id
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
 * /api/activity/type/{type}:
 *   get:
 *     summary: Get Activities by type
 *     description: Get activities by type
 *     tags: [Activity]
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         description: api-key
 *         required: true
 *         schema:
 *           type: string
 *           example: secretapikey
 *       - in: path
 *         name: type
 *         required: true
 *         description: Activity type (internal, external, learning, project)
 *         schema:
 *           type: string
 *       - in: query
 *         name: sort
 *         description: Sort order (asc, desc)
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         description: Maximum number of activities to retrieve
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
