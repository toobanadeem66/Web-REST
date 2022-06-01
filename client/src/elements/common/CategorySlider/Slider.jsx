import React, { useState } from "react";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import Item from "./item";
import "./slider.scss";
import { getCategories } from "../../../API calls/Categories";
import { useEffect } from "react";
import item from "./item";
import {getCatName} from "../../../components/Customer/MenuPage";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }
];

function Slider() {

  const [items, setItems] = useState(["MAIN COURSE", "DESSERT", "DRINK", "STARTER", "SPECIALS","SOUPS"]);
 var prior = [];

  useEffect(() => {
  getCategories().then(res => {
      console.log(res)
      for(var item in res.data.categoryData){
        if(res.data.categoryData[item].Parent_id == -1){
        prior.push(res.data.categoryData[item].Cat_Name)
      } }
      console.log(prior)
    setItems(prior);
  })
  }, []);

  const addItem = () => {
    const nextItem = Math.max(1, items.length + 1);
    setItems([...items, nextItem]);
  };

  const removeItem = () => {
    const endRange = Math.max(0, items.length - 1);
    setItems(items.slice(0, endRange));
  };

  return (
    <div className="App">
      <div className="carousel-wrapper">
        <Carousel breakPoints={breakPoints}>
          {items.map((item) => (
            <Item onClick={() => getCatName({item: item})} key={item}>{item}</Item>
          ))}
        </Carousel>
      </div>
      <hr className="seperatorBelow" />
    </div>
  );
}

export default Slider;