import axios from 'axios';

//const token = JSON.parse(localStorage.getItem("token"));
//const header = { headers: { Authorization: `Bearer ${token}` } };


import Api from './Api';

export async function getCategoriesById(id) {

   var response = await Api.get(`http://localhost:3000/Category/${id}`)
      .catch(err => {
         console.log(err)
      })

      return response;
}

export  async function getCategories() {
  var response = await Api.get("http://localhost:3000/Category")
      .catch(err => {
        console.log(err);
      });

      return response
  }
