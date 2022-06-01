import Api from './Api';

export async function AddFoodItems() {
  var response = Api.post("http://localhost:3000/Food_item")
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
export async function deletefooditem(id) {

  var response = await Api.delete(`http://localhost:3000/Food_item/${id}`)
    .catch(err => {
      console.log("err");
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

export async function updatefooditembyid(id) {

  var response = await Api.put(`http://localhost:3000/Food_item/${id}`)
    .catch(err => {
      console.log("err");
    });

  return response
}

