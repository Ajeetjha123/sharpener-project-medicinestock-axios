import React from 'react'
import classes from './AvailbleMeals.module.css'
import Card from '../UI/Card';
import MealsItem from './MealsItem/MealsItem';
const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Paracitamol',
    description: 'Used To Solve Fever',
    price: 12.99,
  },
  {
    id: 'm2',
    name: 'Dulo',
    description: 'Used to Solve Fever!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Disprine',
    description: 'Used to Solve Body Pain',
    price: 23.99,
  },
  {
    id: 'm4',
    name: 'Abilify',
    description: 'antipsychotic... medication...',
    price: 19.99,
  },
];

const AvalibleMeals = () => {
const melasList = DUMMY_MEALS.map(meal => <MealsItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price}/>)
return <section className={classes.meals}>
    <Card> 
    <ul>{melasList}</ul>
    </Card>
  </section>
}

export default AvalibleMeals