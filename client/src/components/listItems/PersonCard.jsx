import { Card } from 'antd'
import React, { useState } from 'react'

import { EditOutlined } from '@ant-design/icons'
import RemovePerson from '../buttons/RemovePerson'
// import UpdateContact from '../forms/UpdateContact'

const PersonCard = props => {
  const [id] = useState(props.id)
  const [firstName, setFirstName] = useState(props.firstName)
  const [lastName, setLastName] = useState(props.lastName)

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
      <></>
      // <UpdateContact
      // id={id}
      // firstName={firstName}
      // lastName={lastName}
      // onButtonClick={handleButtonClick}
      // updateStateVariable={updateStateVariable}
      // />
    ) : (
      <Card
      style={{ textAlign: 'left' }}
      title={`${firstName} ${lastName}`}
      actions={[
        <EditOutlined key='edit' onClick={handleButtonClick} />,
        <RemovePerson id={id} />
      ]}>
      </Card>
    )}
    </div>
  )
}

export default PersonCard