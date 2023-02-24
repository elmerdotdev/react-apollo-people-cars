import { DeleteOutlined } from '@ant-design/icons'
import React from 'react'
import { GET_PERSONS, GET_CARS, REMOVE_PERSON, REMOVE_CAR } from '../../queries'
import { useMutation } from '@apollo/client'
import filter from 'lodash.filter'

const RemovePerson = ({ id }) => {
  const [removePerson] = useMutation(REMOVE_PERSON)
  const [removeCar] = useMutation(REMOVE_CAR)

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
      removeCar({
        variables: {
          id
        },
        update: (cache, { data: { removeCar } }) => {
          const { cars } = cache.readQuery({ query: GET_CARS })
          cache.writeQuery({
            query: GET_CARS,
            data: {
              cars: filter(cars, c => {
                return c.personId !== removeCar.id
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