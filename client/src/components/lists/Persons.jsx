import { useQuery } from '@apollo/client'
import { List } from 'antd'
import React from 'react'
import { GET_PERSONS } from '../../queries'
import PersonCard from '../listItems/PersonCard'
// import ContactCard from '../listItems/ContactCard'

const getStyles = () => ({
  list: {
    width: '100%'
  }
})

const Persons = () => {
  const styles = getStyles()

  const {loading, error, data} = useQuery(GET_PERSONS)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <List
      grid={{ gutter: 20, column: 1 }}
      style={styles.list}
    >
      {data.persons.map(({ id, firstName, lastName }) => (
      <List.Item key={id}>
        <PersonCard key={id} id={id} firstName={firstName} lastName={lastName} />
      </List.Item>
      ))}
    </List>
  )
}

export default Persons