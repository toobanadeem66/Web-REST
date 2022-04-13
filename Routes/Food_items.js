const express = require('express');
const router = express.Router();
const Food_items = require('../models/Food_items');
const mongoose = require('mongoose');
const{ checkRole,verifyAccessToken} = require('../helpers/jwthelper')

// add new item 
router.post('/', verifyAccessToken, checkRole,(req, res, next) => {
    const fooditem = new Food_items({
        _id: new mongoose.Types.ObjectId,
        Item_Name:req.body.Item_Name,
        Cat_id:req.body.Cat_id,
        Item_price:req.body.Item_price,
        Item_picture: req.body.Item_picture,
        Item_desc: req.body.Item_desc,
        R_ID: req.body.R_ID
    })

    fooditem.save() // saving data to database
        .then(result => {
            console.log(result);
            res.status(200).json({
                newfooditem: result
            })
        })

        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err

            })
        })
})

// Read Category 
router.get('/', verifyAccessToken, (req, res, next) => {
    Food_items.find()
        .exec()
        .then(result => {
            res.status(200).json({
                Food_items: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

// can get Fooditem by their fooditem id 
router.get('/:id', verifyAccessToken, (req, res, next) => {
    console.log(req.params.id);
    Food_items.findById(req.params.id)
        .then(result => {
            res.status(200).json({
                fooditem: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

// delete fooditem request
router.delete('/:id', verifyAccessToken,checkRole, (req, res, next) => {
    Food_items.remove({ _id: req.params.id })
        .then(result => {
            res.status(200).json({
                message: 'Food item deleted',
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

// update fooditem data
router.put('/:id', verifyAccessToken,checkRole, (req, res, next) => {
    Food_items.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            Item_Name:req.body.FooditemName,
            Cat_id:req.body.Cat_id,
            Item_price:req.body.Item_price,
            Item_picture: req.body.item_picture,
            Item_desc: req.body.item_desc
        }
    })
        .then(result => {
            res.status(200).json({
                updated_Fooditem: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })

        })
})

module.exports = router;