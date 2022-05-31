const express = require('express');
const { type } = require('express/lib/response');
const router = express.Router();
const Restaurant = require("../Models/restaurant");
const User = require('../Models/User.model')
const{ checkRole,verifyAccessToken} = require('../helpers/jwthelper')


router.get('/', (req, res, next)=>{
  console.log("in")
    Restaurant.find()
    .select("R_ID R_name R_loc R_logo User_ID R_History R_About")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            _id:doc._id,
            R_ID: doc.R_ID,
            R_name: doc.R_name,
            R_loc: doc.R_loc,
            R_logo: doc.R_logo,
            R_History: doc.R_History,
            R_About: doc.R_About,
            User_ID: doc.User_ID,
            request: {
              type: "GET",
              url: "http://localhost:3000/restaurant" 
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

// router.post("/", (req, res, next) => {
//     User.findbyID(req.body.User_ID)
//     .then(restaurant=>{
//         if(!restaurant) {
//             return res.status(404).json({
//                 message: "restaurant not found"
//             });
//         }
//       const Restaurant = new Restaurant({
//         R_ID: new mongoose.Types.ObjectId(),
//         R_name: req.body.R_name,
//         R_loc: req.body.R_loc,
//         R_logo: req.body.R_logo,
//         User_ID: req.body.User_ID
//     });
//     return Restaurant.save();
// })
//     .then(result => {
//         console.log(result);
//         res.status(201).json({
//           message: "Created Restaurant successfully",
//           createdRestaurant: {
//             R_ID: result.R_ID,
//             R_name: result.R_name,
//             R_loc: result.R_loc,
//             R_logo: result.R_logo,
//             User_ID: result.User_ID,
//               request: {
//                   type: 'GET',
//                   url: "http://localhost:3000/restaurant/" + result.R_ID
//               }
//           }
//         });
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json({
//           error: err
//         });
//       });
//   });


  router.get('/:id',verifyAccessToken,checkRole, (req, res, next) => {
    Restaurant.findById({_id: req.params.id})
      .exec()
      .then(restaurant => {
        if (!restaurant) {
          return res.status(404).json({
            message: "restaurant not found"
          });
        }
        res.status(200).json({
          restaurant: restaurant,
          request: {
            type: "GET",
            url: "http://localhost:3000/restaurant"
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  }); 

  router.put('/:id', verifyAccessToken,checkRole, (req, res, next) => {
    console.log(req.body)
    Restaurant.findOneAndUpdate({ R_ID: req.params.id }, {
        $set: {
          R_name: req.body.R_name,
          R_loc : req.body.R_loc,
          R_About :req.body.R_About,
          R_History:req.body.R_History,
          R_logo: req.body.R_logo
        }
    })
        .then(result => {
            res.status(200).json({
                updated_Restaurant: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
  
        })
  })






  // router.delete("/:restaurantID", (req, res, next) => {
  //   restaurant.remove({ R_ID: req.params.restaurantID})
  //     .exec()
  //     .then(result => {
  //       res.status(200).json({
  //         message: "Restaurant deleted",
  //         request: {
  //           type: "POST",
  //           url: "http://localhost:3000/restaurant",
  //           body: { restaurantID: "ID" }
  //         }
  //       });
  //     })
  //     .catch(err => {
  //       res.status(500).json({
  //         error: err
  //       });
  //     });
  // });

module.exports = router;