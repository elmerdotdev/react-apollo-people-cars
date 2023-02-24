import { Card } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { EditOutlined } from '@ant-design/icons'
import RemovePerson from '../buttons/RemovePerson'
import UpdatePerson from '../forms/person/UpdatePerson'
import Cars from '../lists/Cars'

const PersonCard = props => {
  const [id] = useState(props.id)
  const [firstName, setFirstName] = useState(props.firstName)
  const [lastName, setLastName] = useState(props.lastName)
  const [cars] = useState(props.cars)

  const [editMode, setEditMode] = useState(false)

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case 'firstName':
        setFirstName(value)
        break
      case 'lastName':
        setLastName(value)
        break
      default:
        break
    }
  }

  return (
    <div>
    {editMode ? (
      <UpdatePerson
      id={id}
      firstName={firstName}
      lastName={lastName}
      onButtonClick={handleButtonClick}
      updateStateVariable={updateStateVariable}
      />
    ) : (
      <Card
      style={{ textAlign: 'left' }}
      title={`${firstName} ${lastName}`}
      actions={[
        <EditOutlined key='edit' onClick={handleButtonClick} />,
        <RemovePerson id={id} />
      ]}>
        <Cars cars={cars} />
        <Link to={`/people/${id}`}>Learn More</Link>
      </Card>
    )}
    </div>
  )
}

export default PersonCard