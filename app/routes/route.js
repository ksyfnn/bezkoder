module.exports = app => {
    const ngide = require('../controllers/controllers');
    var router = require('express').Router();
// create data
    router.post("/", ngide.create);
// show data by id
    router.get("/:id", ngide.findOne);
// show all data
    router.get("/", ngide.findAllData);
// update data
    router.put("/:id", ngide.updateData);
// delete data by id
    router.delete("/:id", ngide.delete);
    app.use('/gas', router);
};