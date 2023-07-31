const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            'insert into user(firstName, lastName, email, gender, password) values (?,?,?,?,?)',[
                data.firstName,
                data.lastName,
                data.email,
                data.gender,
                data.password
            ], (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    deleteUser: (data, callBack) => {
        pool.query(
            'delete from user where id = ?',[
                data.id
            ], (error, results, fields) => {
                if(error){
                    console.log("err : ", error);
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    }
}

            
        
        