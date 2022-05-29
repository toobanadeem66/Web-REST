const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Status = require("../Models/status");
const{ checkRole,verifyAccessToken} = require('../helpers/jwthelper')


router.get("/", verifyAccessToken,checkRole,(req, res, next) => {
  Status.find()
    .select("_id Status_name")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        status: docs.map(doc => {
          return {
            Status_name: doc.Status_name,
            Status_ID: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/status/" + doc._id
            }
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/",verifyAccessToken,checkRole, (req, res, next) => {
  const status = new Status({
    _id: new mongoose.Types.ObjectId(),
    Status_name: req.body.Status_name,
    R_ID: req.body.R_ID
  });
  status.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "updated Status",
        createdStatus: {
            Status_name: result.Status_name,
            Status_ID: result._id,
            request: {
                type: 'GET',
                url: "http://localhost:3000/status/" + result.Status_ID
            }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:statusId", (req, res, next) => {
  const id = req.params.statusId;
  Status.findById({_id: id })
    .select('Status_name  _id')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            status: doc
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:statusId", verifyAccessToken,checkRole,(req, res, next) => {
  const id = req.params.statusId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Status.update({ Status_ID: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Status updated',
          request: {
              type: 'GET',
              url: 'http://localhost:3000/status/' + id
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});



module.exports = router;