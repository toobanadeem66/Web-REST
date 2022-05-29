import axios from 'axios';
import Api from './Api';
//const token = JSON.parse(localStorage.getItem("token"));
//const header = { headers: { Authorization: `Bearer ${token}` } };


export async function getStatusById(id) {

   var response =  await Api.get(`http://localhost:3000/status/${id}`)
      .catch(err => {
        console.log(err)
      })

      return response;
}