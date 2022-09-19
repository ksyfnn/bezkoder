const sql = require('./db.js');

const ngide = function(data){
    this.nama = data.nama;
    this.umur = data.umur;
    this.aktivitas = data.aktivitas;
};
// create data 
ngide.create = (newNgide, result) => {
    sql.query('INSERT INTO tbngide SET ?', newNgide, (err,res) => {
        if(err){
            console.log("err :", err);
            result(err, null);
            return;
        }
        else{
            console.log('created data', {id : res.inserId, ...ngide});
            result(null, {id : res.insertId, ...ngide});
        }
    });
};
// update data
ngide.update = (id, Ngide, result) => {
    sql.query('UPDATE tbngide SET nama = ?, umur = ?, aktivitas = ? WHERE id = ?', 
    [Ngide.nama, Ngide.umur, Ngide.aktivitas, id],
    (err, res) => {
        if (err){
            console.log("error", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not found "}, null);
            return;
        }
        console.log("update data : ", {id : id, ...Ngide });
        result(null, { id : id, ...Ngide })
    });
};
// show data by id
ngide.findById = (id, result) => {
    sql.query(`SELECT * FROM tbngide WHERE id = ${id}`, (err,res) => {
        if (err){
            console.log("error :", err);
            result (err, null);
            return;
        }
        if (res.length){
            console.log("found tutorial", res[0]);    
            result(null, res[0]);
            return;
        }
// not found tutorial with the id
    result({kind: "not found"}, null);
    });
};
// show all data
ngide.findAll = (title, result) =>{
    let query = 'SELECT * FROM tbngide'
    if (title){
        query += `SELECT title WHERE '%${title}%'`;
    }
    sql.query(query, (err, res) => {
        if(err){
            console.log('message : ', err);
            result(null, err);
            return;
        }
        console.log('data :', res);
        result(null, res);

    });
}

ngide.deleteData = (id, result) =>{
    sql.query('DELETE FROM tbngide WHERE id = ?', id, (err,res) => {
        // if id not found
        if (err){
            console.log('error :', err);
            result(err, null);
            reutrn;
        }
        // if id couldn't delete
        if (res.affectedRows == 0) {
            result({kind : "not found"}, null);
            return;
        }
        console.log('data has been delete');
        result(null, res);
    });
}

module.exports = ngide;