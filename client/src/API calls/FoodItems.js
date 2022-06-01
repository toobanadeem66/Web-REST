import Api from './Api';
import { useState } from "react";

export async function AddFoodItems(updatename,updatecategory,updateprice,updateURL,updatedes,R_ID) {
  var response = Api.post("http://localhost:3000/Food_item",
  {
    Item_Name:updatename,
    Cat_id:updatecategory,
    Item_price:updateprice,
    Item_picture: updateURL,
    Item_desc: updatedes,
    R_ID:R_ID

  })
    .catch(err => {
      console.log("err");
    });

  return response
}

export async function getFoodItems() {
  var response = Api.get("http://localhost:3000/Food_item")
    .catch(err => {
      console.log("err");
    });

  return response
}
export async function deleteFoodItem(id) {
  var response = Api.delete(`http://localhost:3000/Food_item/${id}`)
    .catch(err => {
      console.log(err);
    });

  return response
}

export async function getfooditembyid(id) {

  var response = await Api.get(`http://localhost:3000/Food_item/${id}`)
    .catch(err => {
      console.log("err");
    });

  return response
}

export async function updatefooditembyid(id,updatename,updateprice,updatedes,updateURL,RID) {

  var response = await Api.put(`http://localhost:3000/Food_item/${id}`,
    {
      Item_Name:updatename,
      Cat_id:"623ee33578dfc43825843094",
      Item_price:updateprice,
      Item_picture: updateURL,
      Item_desc: updatedes,
      R_ID:RID

    })
    .catch(err => {
      console.log("err");
    });

  return response
}