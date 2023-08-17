const pool = require('../../config/database');

module.exports = {
    createActivityWithDocumentation: (dataArray, callBack) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return callBack(err);
            }
    
            connection.beginTransaction((err) => {
                if (err) {
                    connection.release();
                    return callBack(err);
                }
    
                const insertQueries = [];
    
                dataArray.forEach((data) => {
                    const activityData = {
                        thumbnail: data.thumbnail,
                        name:data.name,
                        execution_time: data.execution_time,
                        short_description: data.short_description,
                        long_description: data.long_description,
                        type: data.type
                    };
    
                    const insertPromise = new Promise((resolve, reject) => {
                        connection.query(
                            'INSERT INTO activity SET ?',
                            activityData,
                            (error, results, fields) => {
                                if (error) {
                                    connection.rollback(() => {
                                        connection.release();
                                        reject(error);
                                    });
                                } else {
                                    const activityId = results.insertId;
                                    const documentationData = data.activity_documentation.map((dok) => {
                                        return [activityId, dok];
                                    });
    
                                    connection.query(
                                        'INSERT INTO activity_documentation (activity_id, documentation_url) VALUES ?',
                                        [documentationData],
                                        (error, results, fields) => {
                                            if (error) {
                                                connection.rollback(() => {
                                                    connection.release();
                                                    reject(error);
                                                });
                                            } else {
                                                resolve();
                                            }
                                        }
                                    );
                                }
                            }
                        );
                    });
    
                    insertQueries.push(insertPromise);
                });
    
                Promise.all(insertQueries)
                    .then(() => {
                        connection.commit((err) => {
                            if (err) {
                                connection.rollback(() => {
                                    connection.release();
                                    return callBack(err);
                                });
                            }
    
                            connection.release();
                            return callBack(null, "Activity and documentation added successfully");
                        });
                    })
                    .catch((error) => {
                        connection.rollback(() => {
                            connection.release();
                            return callBack(error);
                        });
                    });
            });
        });
    },
    

    getActivityById: (activityId, callBack) => {
        pool.query(
          'SELECT * FROM activity LEFT JOIN activity_documentation ON activity.id = activity_documentation.activity_id WHERE activity.id = ?',
          [activityId],
          (error, results, fields) => {
            if (error) {
              console.error(error);
              return callBack(error);
            }
    
            if (results.length === 0) {
              return callBack(null, null); // Activity not found
            }
    
            // Create an object to store activity data along with documentation
            const activityData = {
              id: results[0].activity_id,
              thumbnail: results[0].thumbnail,
              name: results[0].name,
              execution_time: results[0].execution_time,
              short_description: results[0].short_description,
              long_description: results[0].long_description,
              type: results[0].type,
              activity_documentation: [],
            };
    
            // Collect documentation data
            results.forEach((row) => {
              if (row.documentation_url) {
                activityData.activity_documentation.push(row.documentation_url);
              }
            });
    
            return callBack(null, activityData);
          }
        );
    },

    getActivityByType: (activityType, callBack) => {
        pool.query(
            'SELECT * FROM activity WHERE type = ?',
            [activityType],
            (error, results, fields) => {
                if (error) {
                    console.error(error);
                    return callBack(error);
                }

                const activityList = [];

                results.forEach((row) => {
                    activityList.push({
                        id: row.id,
                        thumbnail: row.thumbnail,
                        name: row.name,
                        execution_time: row.execution_time,
                        short_description: row.short_description,
                        long_description: row.long_description,
                        type: row.type,
                    });
                });

                return callBack(null, activityList);
            }
        );
    },

    getAllActivities: (callBack) => {
        pool.query(
            'SELECT * FROM activity',
            (error, results, fields) => {
                if (error) {
                    console.error(error);
                    return callBack(error);
                }

                const activityList = [];

                results.forEach((row) => {
                    activityList.push({
                        id: row.id,
                        thumbnail: row.thumbnail,
                        name: row.name,
                        execution_time: row.execution_time,
                        short_description: row.short_description,
                        long_description: row.long_description,
                        type: row.type,
                    });
                });

                return callBack(null, activityList);
            }
        );
    },

    updateActivity: (activityId, data, callBack) => {
        pool.getConnection((err, connection) => {
          if (err) {
            return callBack(err);
          }
    
          connection.beginTransaction((err) => {
            if (err) {
              connection.release();
              return callBack(err);
            }
    
            const activityData = {};

            if (data.thumbnail) {
              activityData.thumbnail = data.thumbnail;
            }

            if (data.name) {
              activityData.name = data.name;
            }

            if (data.execution_time) {
              activityData.execution_time = data.execution_time;
            }

            if (data.short_description) {
              activityData.short_description = data.short_description;
            }

            if (data.long_description) {
              activityData.long_description = data.long_description;
            }

            if (data.type) {
                activityData.type = data.type;
            }
    
            connection.query(
              'UPDATE activity SET ? WHERE id = ?',
              [activityData, activityId],
              (error, results, fields) => {
                if (error) {
                  connection.rollback(() => {
                    connection.release();
                    return callBack(error);
                  });
                }
    
                connection.commit((err) => {
                  if (err) {
                    connection.rollback(() => {
                      connection.release();
                      return callBack(err);
                    });
                  }
    
                  connection.release();
                  return callBack(null, results);
                });
              }
            );
          });
        });
    },

    deleteActivity: (activityId, callBack) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return callBack(err);
            }

            connection.beginTransaction((err) => {
                if (err) {
                    connection.release();
                    return callBack(err);
                }

                connection.query(
                    'DELETE FROM activity_documentation WHERE activity_id = ?',
                    [activityId],
                    (error, results, fields) => {
                        if (error) {
                            connection.rollback(() => {
                                connection.release();
                                return callBack(error);
                            });
                        }

                        connection.query(
                            'DELETE FROM activity WHERE id = ?',
                            [activityId],
                            (error, results, fields) => {
                                if (error) {
                                    connection.rollback(() => {
                                        connection.release();
                                        return callBack(error);
                                    });
                                }

                                connection.commit((err) => {
                                    if (err) {
                                        connection.rollback(() => {
                                            connection.release();
                                            return callBack(err);
                                        });
                                    }

                                    connection.release();
                                    return callBack(null, results);
                                });
                            }
                        );
                    }
                );
            });
        });
    },

};
