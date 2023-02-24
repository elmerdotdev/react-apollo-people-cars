import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_PERSON_CARS } from '../../queries'
import { List, Typography } from 'antd'

const People = () => {
  const { id } = useParams()

  const {loading, error, data} = useQuery(GET_PERSON_CARS, {
    variables: {
      personId: id
    }
  })

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <>
      <Typography.Title level={3}>{data.person.firstName} {data.person.lastName}</Typography.Title>
      <List
        bordered
        style={{ marginBottom: '20px' }}
        dataSource={data.personWithCars}
        renderItem={(item) => (
          <List.Item>
            {item.year}, {item.make}, {item.model}, {item.price}
          </List.Item>
        )}
      />
      <Link to="/">Go Back Home</Link>
    </>
  )
}

export default People