const express = require("express");
const router = express.Router();
const Order = require("../Models/order");
const restaurant = require("../Models/restaurant");
const User = require('../Models/User.model')
const Status = require("../Models/status")
const{ checkRole,verifyAccessToken} = require('../helpers/jwthelper')
const mongoose = require('mongoose')

// Handle incoming GET requests to /orders
router.get("/",verifyAccessToken,checkRole, (req, res, next) => {
  Order.find()
    .select("Order_ID R_ID Status_ID User_ID Creation_time Delivered_date Total_Price isPaid Tax")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            Order_ID: doc.Order_ID,
            R_ID: doc.R_ID,
            Status_ID: doc.Status_ID,
            User_ID: doc.User_ID,
            Creation_time: doc.Creation_time,
            Delivered_Date: doc.Delivered_Date,
            Total_Price: doc.Total_Price,
            isPaid: doc.isPaid,
            Tax: doc.Tax,
            request: {
              type: "GET",
              url: "http://localhost:3000/orders/" + doc.Order_ID
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});



router.post("/",verifyAccessToken, (req, res, next) => {
  // restaurant.find({R_ID : req.body.R_ID})
  //   .then(restaurant => {
  //     if (!restaurant) {
  //       return res.status(404).json({
  //         message: "restaurant not found"
  //       });
  //     }
  // User.find({_id :req.body.User_ID})
  // .then(User =>{
  //   if (!User) {
  //     return res.status(404).json({
  //       message: "user not found"
  //     });
  //   }
  // Status.find({_id: req.body.Status_ID})
  // .then(Status =>{
  //   if (!Status) {
  //     return res.status(404).json({
  //       message: "order not placed",
      
  //     });
  //   }
      const order = new Order({
        _id: new mongoose.Types.ObjectId,
        R_ID: req.body.R_ID,
        User_ID: req.body.User_ID,
        Creation_time: req.body.Creation_time,
        Delivered_time: req.body.Delivered_time,
        Total_Price: req.body.Total_Price,
        isPaid: req.body.isPaid,
        Tax:req.body.Tax,
        isActive: true,
        Order_Status: req.body.Order_Status
      })
      order.save()
    
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Order stored",
        createdOrder: result,
        request: {
          type: "POST",
          url: "http://localhost:3000/orders"
        }
        })
      })
  
      .catch(err=>{
          console.log(err);
          res.status(500).json({
                  error:err
              
          })
      })
    })


router.get("/getOrders", verifyAccessToken, checkRole, (req,res,next) => {

User.findById(req.payload.aud)

.then(result => {
    Order.find({R_ID: result.R_ID}) 
    .exec()
    .then(result => {
        res.status(200).json({
            Orders: result
            
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})
})



router.get("/:orderId",verifyAccessToken, (req, res, next) => {
  Order.findById({_id: req.params.orderId})
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found"
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:3000/orders"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:orderId",verifyAccessToken,checkRole,(req, res, next) => {

Order.findOneAndUpdate({_id:req.params.orderId},{
    $set:{
        isActive: false
    }
})
.then(result=>{
    res.status(200).json({
        updated_user:result,
        request: {
                  type: "POST",
                  url: "http://localhost:3000/orders",
                  body: { productId: "ID" }
                }
    })
})
.catch(err=>{
    console.log(err);
    res.status(500).json({
        error:err
    })

})
});

router.put('/:id', verifyAccessToken,checkRole, (req, res, next) => {
  console.log(req.body)
  Order.findOneAndUpdate({ _id: req.params.id }, {
      $set: {
         
          Order_Status:req.body.Order_Status,
          isPaid: req.body.isPaid,
          Delivered_time: req.body.Delivered_time
      }
  })
      .then(result => {
          res.status(200).json({
              updated_Order: result
          })
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({
              error: err
          })

      })
})

module.exports= router;