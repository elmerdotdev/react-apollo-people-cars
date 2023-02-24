import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button, Form, Input, Divider } from 'antd'
import { useMutation } from '@apollo/client'
import { ADD_PERSON, GET_PERSONS } from '../../../queries'

const AddPerson = () => {
  const [id] = useState(uuidv4)
  const [addPerson] = useMutation(ADD_PERSON)

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  const onFinish = values => {
    const { firstName, lastName } = values

    addPerson({
      variables: {
        id,
        firstName,
        lastName
      },
      update: (cache, { data: { addPerson } }) => {
        const data = cache.readQuery({ query: GET_PERSONS })
        cache.writeQuery({
          query: GET_PERSONS,
          data: {
            ...data,
            persons: [...data.persons, addPerson]
          }
        })
      }
    })
  }

  useEffect(() => {
    forceUpdate([])
  }, [])
  

  return (
    <>
      <Divider>Add Person</Divider>
      <Form
        name='add-person-form'
        form={form}
        layout='inline'
        onFinish={onFinish}
        size='large'
        style={{
          justifyContent: 'center',
          marginBottom: '40px'
        }}
      >
        <Form.Item label='First Name:' name='firstName' rules={[{
          required: true,
          message: 'Please input your first name!'
        }]}>
          <Input
            placeholder='First Name'
          />
        </Form.Item>

        <Form.Item label='Last Name:' name='lastName' rules={[{
          required: true,
          message: 'Please input your last name!'
        }]}>
          <Input
            placeholder='Last Name'
          />
        </Form.Item>

        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type='primary'
              htmlType='submit'
              disabled={!form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length}
            >Add Person</Button>
          )}
        </Form.Item>
      </Form>
    </>
  )
}

export default AddPerson