import { Card } from 'antd'
import React, { useState } from 'react'
import { EditOutlined } from '@ant-design/icons'
import UpdateCar from '../forms/car/UpdateCar'
import RemoveCar from '../buttons/RemoveCar'

const CarCard = props => {
  const [id] = useState(props.id)
  const [year, setYear] = useState(props.year)
  const [make, setMake] = useState(props.make)
  const [model, setModel] = useState(props.model)
  const [price, setPrice] = useState(props.price)
  const [personId, setPersonId] = useState(props.personId)

  const [editMode, setEditMode] = useState(false)

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case 'year':
        setYear(value)
        break
      case 'make':
        setMake(value)
        break
      case 'model':
        setModel(value)
        break
      case 'price':
        setPrice(value)
        break
      case 'personId':
        setPersonId(value)
        break
      default:
        break
    }
  }

  return (
    <div>
    {editMode ? (
      <UpdateCar
      id={id}
      year={year}
      make={make}
      model={model}
      price={price}
      personId={personId}
      onButtonClick={handleButtonClick}
      updateStateVariable={updateStateVariable}
      />
    ) : (
    <Card
      style={{ marginBottom: '20px' }}
      type='inner'
      title={`${year} ${make} ${model} -> $ ${price.toLocaleString()}`}
      actions={[
        <EditOutlined key='edit' onClick={handleButtonClick} />,
        <RemoveCar id={id} />
      ]}></Card>
    )}
    </div>
  )
}

export default CarCard