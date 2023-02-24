import { DeleteOutlined } from '@ant-design/icons'
import React from 'react'
import { GET_PERSONS, REMOVE_PERSON } from '../../queries'
import { useMutation } from '@apollo/client'
import filter from 'lodash.filter'

const RemovePerson = ({ id }) => {
  const [removePerson] = useMutation(REMOVE_PERSON)

  const handleButtonClick = () => {
    const result = window.confirm('Are you sure you want to delete this person?')

    if (result) {
      removePerson({
        variables: {
          id
        },
        update: (cache, { data: { removePerson } }) => {
          const { persons } = cache.readQuery({ query: GET_PERSONS })
          cache.writeQuery({
            query: GET_PERSONS,
            data: {
              persons: filter(persons, c => {
                return c.id !== removePerson.id
              })
            }
          })
        }
      })
    }
  }

  return (
    <DeleteOutlined key='delete' style={{ color: 'red' }} onClick={handleButtonClick} />
  )
}

export default RemovePerson