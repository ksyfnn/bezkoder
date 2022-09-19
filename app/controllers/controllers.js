const ngide = require('../models/query');

exports.create = (req, res) =>{
    if(!req.body){
        res.status(400).send({
            message: "content can't be empty"
          });
    }
// create data
    console.log(req)
    const create = new ngide ({
    nama : req.body.nama,
    umur : req.body.umur,
    aktivitas : req.body.aktivitas
   });

   ngide.create(create, (err, data) => {
    if(err)
        res.status(404).send({
            message: err.message || "beberapa error saat membuat data"
        })
        else res.send(data);
   });
};

exports.findOne = (req,res) => {
    ngide.findById (req.params.id, (err, data) => {
        if(err){
            if (err.kind === "not found"){
                res.status(404).send({
                    message : `data not found with id ${req.params.id}`
                });
            }
            else{
                res.status(500).send({
                    message : 'not retrieving data with id ' + req.params.id
                });
            }
        }
        else{
            res.send(data)
        }
    });
}

exports.findAllData = (req,res) => {
    const title = req.params.res;
    ngide.findAll (title, (err, data) => {
        if(err)
        res.status(505).send({
            message: err.message ||"some error occured while retrieveing data"
        });
        else res.send(data)
    });
};

exports.updateData = (req, res) => {
    if(!req.body){
        res.status(400).send({
            message : "content cant not be empty"
        });
    }

    console.log(req.body);
    ngide.update(
        req.params.id,
        new ngide (req.body),
        (err, data) => {
            if (err){
            if (err.kind === "not found"){
                res.status(404).send({
                    message : `not found data with id ${req.params.id}`
                });
            }else {
                res.status(500).send({
                    message : `error updating data with id ` +req.params.id
                });
            }
        }
        else res.send(data);
        });
};

exports.delete = (req, res) => {
   ngide.deleteData(req.params.id, (err, data) => {
    if (err){
        if(err.kind === "not found"){
            res.status(404).send({
                message: `not found delete data with id ${req.params.id}`
                });
            }
            else res.status(500).send({
                message : "couldn't delete data with id " +req.params.id
            });
        }
        else res.send({message : 'delete was successfuly'})
   });
};