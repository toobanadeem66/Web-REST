import axios from 'axios';

const token = JSON.parse(localStorage.getItem("token"));
const header = { headers: { Authorization: `Bearer ${token}` } };


export async function getStatusById(id) {

   var response =  await axios.get(`http://localhost:3000/status/${id}`, header)
      .catch(err => {
        console.log(err)
      })

      return response;
}