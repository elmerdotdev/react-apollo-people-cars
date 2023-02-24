import React from 'react'
import { Divider } from 'antd'
import Header from '../layout/Header'
import AddPerson from '../forms/person/AddPerson'
import Persons from '../lists/Persons'
import AddCar from '../forms/car/AddCar'

const Home = () => {
  return (
    <div>
      <Header />
      <Divider />
      <AddPerson />
      <AddCar />
      <Persons />
    </div>
  )
}

export default Home