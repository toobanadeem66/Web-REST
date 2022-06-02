import React from 'react'
import MenuItem from "./MenuItem";
import "./product.scss"
import { getFoodItems } from '../../../API calls/FoodItems';
import { getCategoriesById } from '../../../API calls/Categories';
import { useEffect } from 'react';

const Products = (props) => {

    // var img = "https://www.seriouseats.com/thmb/p2R9RuSOnA2LF8wlq0SNRYYHm4M=/1500x1125/filters:fill(auto,1)/perfect-quick-easy-french-toast-hero-03-2a9485bbb12b4cf5abcfef53aa9accd9.jpg"

    // var desc = "this is french toast"

    const [foodItems, setFoodItems] = React.useState([]);
    var prior = []
    const [data, setData] = React.useState([]);

    useEffect(() => {

      getFoodItems().then(data => {
            console.log(data)
            setFoodItems(data.data.Food_items);
        })

    }  , [])

  

    useEffect( () => {
      var rid=localStorage.getItem("CRID")
      const save = async()  => {
      for (var item in foodItems) {
        if(foodItems[item].R_ID == rid){
        var name = "";
        var id = foodItems[item].Cat_id
        await getCategoriesById(id).then((response) => {
          console.log(response.data.categoryData.Cat_Name)
          name = response.data.categoryData.Cat_Name

        })
        //console.log(name)
        if(name == props.title){
        var json = {
          _id: foodItems[item]._id,
          Item_Name: foodItems[item].Item_Name,
          Item_price: foodItems[item].Item_price,
          Item_picture: foodItems[item].Item_picture,
          Item_desc: foodItems[item].Item_desc,
          Cat_Name: name
        }
        //console.log(json)
        prior.push(json)
      }
      } }
      console.log(prior)
      setData(prior)
    
    }

    save()



  }, [foodItems])

  


    
  return (

            <div id='products'>
                <h1> {props.title} </h1>
                <p> Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000</p>
                <div className='a-container'>
                
                {data.map((food) => (
                <MenuItem image = {food.Item_picture} title = {food.Item_Name} desc={food.Item_desc} price= {food.Item_price} data = {food}/>
                ))}
                {/* <MenuItem image = {props.img} title = {props.title} desc={props.desc} price= {props.price}/>
                <MenuItem image = {props.img} title = {props.title} desc={props.desc} price= {props.price} /> */}
                </div>
            </div>
    
  )
}

export default Products