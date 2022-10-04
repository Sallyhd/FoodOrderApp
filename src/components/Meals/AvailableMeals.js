import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

const api = axios.create({
  baseURL: "https://foodorderapp-1f778-default-rtdb.firebaseio.com/meals",
});

const AvailableMeals = () => {
  let [meals, setMeals] = useState([]);
  let [httpError , setHttpError] = useState();

  useEffect(() => {
    api.get("/").then((res) => {
      console.log(res.data);
      const loadMeals = [];
      for (const key in res.data) {
        loadMeals.push({
          id:key,
          name:res.data[key].name,
          description:res.data[key].description,
          price:res.data[key].price
        });
      }

      setMeals(loadMeals);
      }).catch((error)=>{
        setHttpError(error.message);
      });
    }, []);

    if(httpError){
      return (<section>
        <p>{httpError }</p>
      </section>);
    }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
