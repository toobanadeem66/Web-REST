import Api from './Api';

export async function updateProfile(id,data) {

   console.log("in")
   var response = await Api.put(`http://localhost:3000/restaurant/${id}`,data)
      .catch(err => {
         console.log(err)
      })

      return response;
}

export async function getProfile() {
    console.log("in")

    var response = await Api.get(`http://localhost:3000/restaurant`)
       .catch(err => {
          console.log(err)
       })
 
       return response;
 }

//  export async function getProfile(id) {

//     var response = await Api.get(`http://localhost:3000/restaurant/${id}`)
//        .catch(err => {
//           console.log(err)
//        })
 
//        return response;
//  }