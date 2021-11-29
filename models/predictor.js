const db = require("../config/db")

class predictor {
    static findAllColleges() {
        let sql = "SELECT * FROM colleges WHERE college_id > 2";

        return db.execute(sql);
    }
}

module.exports = predictor;
