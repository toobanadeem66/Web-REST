import axios from 'axios';


var token = JSON.parse(localStorage.getItem("token"))
const header = { headers: { Authorization: `Bearer ${token}` } }; 

export  async function getUsers() {
  var response = await axios.get("http://localhost:3000/auth", header)
      .catch(err => {
        console.log(err);
      });

      return response
  }

  export  async function getUsersById(id) {
    var response = await axios.get(`http://localhost:3000/auth/${id}`, header)
        .catch(err => {
          console.log(err);
        });
  
        return response
    }