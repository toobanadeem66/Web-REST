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

  export async function updateCategoriesById(id,updatename,updateparent) {
console.log(updatename)
console.log(id)
   var response = await Api.put(`http://localhost:3000/Category/${id}`,
   {
      Cat_Name:updatename,
      Parent_id:updateparent,
   })
      .catch(err => {
         console.log(err)
      })

      return response;
}



// export async function addCategory() {
//       var response = await Api.post(`http://localhost:3000/Category`,
//    {
     
//      Cat_Name:catname,
//      Parent_id:pid,
//      R_ID:rid,
//      Cat_ID:catid

//    })
//    .catch(err => {
//      console.log("err");
//    });

//       return response;
// }

export async function deleteCategory(categoryID) {
   var response = await Api.delete(`http://localhost:3000/Category/${categoryID}`)
         .catch(err => {
         console.log(err);
         });
   
         return response
   }
