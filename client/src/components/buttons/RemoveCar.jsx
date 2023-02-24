import { DeleteOutlined } from '@ant-design/icons'
import React from 'react'
import { GET_CARS, REMOVE_CAR } from '../../queries'
import { useMutation } from '@apollo/client'
import filter from 'lodash.filter'

const RemoveCar = ({ id }) => {
  const [removeCar] = useMutation(REMOVE_CAR)

  const handleButtonClick = () => {
    const result = window.confirm('Are you sure you want to delete this this?')

    if (result) {
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
                return c.id !== removeCar.id
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

export default RemoveCar