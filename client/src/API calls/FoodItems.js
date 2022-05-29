import Api from './Api';

export async function getFoodItems() {
  var response = Api.get("http://localhost:3000/Food_item")
    .catch(err => {
      console.log("err");
    });

  return response
}