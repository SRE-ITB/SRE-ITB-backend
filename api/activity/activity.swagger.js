/**
 * @swagger
 * tags:
 *   name: Activity
 *   description: APIs related to activities
 */

/**
 * @swagger
 * /activity:
 *   get:
 *     summary: Get all activities
 *     description: Retrieve a list of all activities
 *     responses:
 *       '200':
 *         description: List of activities retrieved successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /activity/{type}:
 *   get:
 *     summary: Get activities by type
 *     description: Retrieve a list of activities based on activity type
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         description: Activity type
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: List of activities retrieved successfully
 *       '404':
 *         description: Activities not found for the specified type
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /activity:
 *   post:
 *     summary: Create a new activity with documentation
 *     description: Create a new activity entry with associated documentation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/NewActivity'
 *     responses:
 *       '201':
 *         description: Activity and documentation added successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /activity/{id}:
 *   delete:
 *     summary: Delete activity by ID
 *     description: Delete an activity based on its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Activity ID
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: No content
 *       '404':
 *         description: Activity not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /activity/{id}:
 *   put:
 *     summary: Update activity by ID
 *     description: Update an activity based on its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Activity ID
 *         schema:
 *           type: integer
 *       - in: body
 *         name: data
 *         description: Updated activity data
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/UpdateActivity'
 *     responses:
 *       '200':
 *         description: Activity updated successfully
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Activity not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /activity/{id}:
 *   get:
 *     summary: Get activity by ID
 *     description: Retrieve an activity based on its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Activity ID
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Activity retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       '404':
 *         description: Activity not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /activity:
 *   get:
 *     summary: Get all activities
 *     description: Retrieve a list of all activities
 *     responses:
 *       '200':
 *         description: List of activities retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activity'
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NewActivity:
 *       type: object
 *       properties:
 *         thumbnail:
 *           type: string
 *         name:
 *           type: string
 *         execution_time:
 *           type: string
 *         short_description:
 *           type: string
 *         long_description:
 *           type: string
 *         type:
 *           type: string
 *         activity_documentation:
 *           type: array
 *           items:
 *             type: string
 *       example:
 *         thumbnail: "https://example.com/thumbnail.jpg"
 *         name: "Language Workshop: Spanish for Beginners"
 *         execution_time: "2025-09-30T17:30:00.000Z"
 *         short_description: "Start your journey to fluency in Spanish with our interactive language workshop designed for beginners."
 *         long_description: "Start your journey to fluency in Spanish with our interactive language workshop designed for beginners..."
 *         type: "learning"
 *         activity_documentation:
 *           - "https://example.com/dokumentasi1.jpg"
 *           - "https://example.com/dokumentasi2.jpg"
 *
 *     UpdateActivity:
 *       type: object
 *       properties:
 *         thumbnail:
 *           type: string
 *         name:
 *           type: string
 *         execution_time:
 *           type: string
 *         short_description:
 *           type: string
 *         long_description:
 *           type: string
 *         type:
 *           type: string
 *       example:
 *         thumbnail: "https://example.com/new_thumbnail.jpg"
 *         name: "Updated Workshop"
 *         execution_time: "2025-10-15T18:00:00.000Z"
 *         short_description: "Updated short description"
 *         long_description: "Updated long description"
 *         type: "updated_type"
 *
 *     Activity:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         thumbnail:
 *           type: string
 *         name:
 *           type: string
 *         execution_time:
 *           type: string
 *         short_description:
 *           type: string
 *         long_description:
 *           type: string
 *         type:
 *           type: string
 *         activity_documentation:
 *           type: array
 *           items:
 *             type: string
 *       example:
 *         id: 1
 *         thumbnail: "https://example.com/thumbnail.jpg"
 *         name: "Language Workshop: Spanish for Beginners"
 *         execution_time: "2025-09-30T17:30:00.000Z"
 *         short_description: "Start your journey to fluency in Spanish with our interactive language workshop designed for beginners."
 *         long_description: "Start your journey to fluency in Spanish with our interactive language workshop designed for beginners..."
 *         type: "learning"
 *         activity_documentation:
 *           - "https://example.com/dokumentasi1.jpg"
 *           - "https://example.com/dokumentasi2.jpg"
 */
