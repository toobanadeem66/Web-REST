import axios from 'axios';
import Api from './Api';

//var token = JSON.parse(localStorage.getItem("token"))
//const header = { headers: { Authorization: `Bearer ${token}` } }; 

export async function getUsers() {
  var response = await Api.get("http://localhost:3000/auth")
    .catch(err => {
      console.log(err);
    });

  return response
}

  export  async function getUsersById(id) {
    var response = await Api.get(`http://localhost:3000/auth/${id}`)
        .catch(err => {
          console.log(err);
        });
  
        return response
    }

  export async function UserLogin() {


  }

  // todo soft delete
export async function deleteUser(id) {
  var response = await Api.delete(`http://localhost:3000/auth/${id}`)
    .catch(err => {
      console.log(err);
    });

  return response
}