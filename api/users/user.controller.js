const { create, deleteUser } = require('./user.service');
const { genSaltSync, hashSync } = require('bcrypt');

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        }
        );
    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if (results.affectedRows === 0) {
            console.log("rep: ", results);
            return res.json({
              success: 0,
              message: "Record not found",
            });
          }
          return res.json({
            success: 1,
            message: "user deleted successfully",
          });
        });
      }
} 