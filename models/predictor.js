const db = require("../config/db")

class predictor {

    static findAllColleges(cet_marks) {
        let sql = `SELECT * FROM colleges WHERE lowest <= ${cet_marks}`;

        return db.execute(sql);
    }

    static Colleges(minority, branch, cet_marks) {
        let sql;
        if ((branch === 'NULL') && (minority === 'NULL')) {
            sql = `SELECT * FROM colleges WHERE lowest < ${cet_marks} ORDER BY lowest DESC LIMIT 5`;
        }
        else if (minority === 'NULL') {
            sql = `SELECT * FROM Colleges 
                    WHERE college_id IN (SELECT college_id FROM ${branch} 
                                        WHERE cut_offs_open<=${cet_marks}) ORDER BY lowest DESC LIMIT 5`;
        }
        else if (branch === 'NULL') {
            sql = `SELECT * FROM Colleges WHERE college_id IN (  ( SELECT college_id FROM Colleges WHERE (minority = '${minority}' AND lin_cutoff <= ${cet_marks})) UNION (SELECT college_id FROM Colleges WHERE lowest < ${cet_marks} )  ) ORDER BY lowest DESC LIMIT 5`;
        }
        else {
            sql = `SELECT * FROM colleges WHERE college_id IN ( (SELECT college_id FROM ${branch} WHERE (lin_cut_offs <=${cet_marks} AND college_id IN (SELECT college_id FROM Colleges WHERE minority = '${minority}'))) UNION (SELECT college_id FROM ${branch} WHERE cut_offs_open < ${cet_marks}) ) ORDER BY lowest DESC LIMIT 5`;
        }
        return db.execute(sql);
    }

}

module.exports = predictor;
