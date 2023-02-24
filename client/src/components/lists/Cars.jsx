import React from 'react'
import CarCard from '../listItems/CarCard'

const Cars = ({ cars }) => {
  return (
    <>
    {cars.map(car => (
      <CarCard key={car.id} id={car.id} year={car.year} make={car.make} model={car.model} price={car.price} personId={car.personId} />
    ))}
    </>
  )
    
}

export default Cars