import { useQuery } from '@apollo/client'
import { List, Typography } from 'antd'
import React from 'react'
import { GET_PERSONS, GET_CARS } from '../../queries'
import PersonCard from '../listItems/PersonCard'

const { Title } = Typography;

const getStyles = () => ({
  list: {
    width: '100%'
  }
})

const Persons = () => {
  const styles = getStyles()

  const {loading, error, data} = useQuery(GET_PERSONS)
  const {loading: loadingC, error: errorC, data: dataC} = useQuery(GET_CARS)

  if (loading || loadingC) return 'Loading...'
  if (error || errorC) return `Error! ${error.message}`

  return (
    <>
      <Title level={4}>Records</Title>
      <List
        grid={{ gutter: 20, column: 1 }}
        style={styles.list}
      >
        {data.persons.map(({ id, firstName, lastName }) => (
        <List.Item key={id}>
          <PersonCard key={id} id={id} firstName={firstName} lastName={lastName} cars={dataC.cars.filter(car => car.personId === id)} />
        </List.Item>
        ))}
      </List>
    </>
  )
}

export default Persons