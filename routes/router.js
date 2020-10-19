const express = require("express");
const router = express.Router();
const schema = require("../models/models");
const authRoute = require("./auth");
const documentmodal = require("../models/documentmodel");

router.post("/post", authRoute, (req, res) => {
  const token = req.headers["authorization"];
  const uuid = token.substring(15, 43);
  let data = schema({
    name: req.body.name,
    image: req.body.image,
    role:req.body.role,
    id: uuid,
  });
  data.save((err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

router.post("/saverecord", authRoute, (req, res) => {
  const token = req.headers["authorization"];
  const uuid = token.substring(15, 43);
  let data = documentmodal({
    data: req.body.data,
    id: uuid,
  });
  data.save((err, result) => {
    if (err) {
      res.send({
        error: err,
        status: 501,
      });
    }
    res.send(result);
  });
});

router.get("/find", authRoute, (req, res) => {
  schema.find((err, result) => {
    if (err) {
      console.log(err);
    }
    if (result) {
      res.send({
        data: result,
        status: 201,
      });
    } else {
      res.send({
        data: null,
      });
    }
  });
});

router.get("/getrecord", authRoute, (req, res) => {
  documentmodal.find((err, result) => {
    if (err) {
      res.send({
        error: err,
        status: 501,
      });
    }
    if (result) {
      res.send({
        data: result,
        status: 201,
      });
    } else {
      res.send({
        data: null,
      });
    }
  });
});

router.get("/find/:id", authRoute, (req, res) => {
  schema.findById(req.params.id, (err, result) => {
    if (err) {
      res.send({
        error: err,
        status: 501,
      });
    }
    res.send(result);
  });
});
router.delete("/remove/:id", authRoute, (req, res) => {
  documentmodal.findByIdAndRemove(req.params.id, (err, result) => {
    if (err) {
      res.send({
        error: err,
        status: 501,
      });
    }
    res.send(result);
  });
});

router.delete("/:id", authRoute, (req, res) => {
  schema.findByIdAndRemove(req.params.id, (err, result) => {
    if (err) {
      res.send({
        error: err,
        status: 501,
      });
    }
    res.send(result);
  });
});

router.put("/:id", authRoute, (req, res) => {
  const token = req.headers["authorization"];
  const uuid = token.substring(15, 43);
  let data = {
    name: req.body.name,
    image: req.body.image,
    role:req.body.role,
    id: uuid,
  };
  schema.findByIdAndUpdate(req.params.id, { $set: data }, (err, result) => {
    if (result) {
      res.send({
        data: result,
        data: "Updated Successfully",
      });
    } else {
      res.send({
        error: err,
        result: null,
        data: "Error in Update",
      });
    }
  });
});

router.get("/sort/:id", authRoute, (req, res) => {
  schema
    .find({})
    .limit(0)
    .skip(0)
    .sort({ name: req.params.id })
    .then((result, error) => {
      if (error) {
        throw error;
      }

      res.send(result);
    });
});
module.exports = router;
