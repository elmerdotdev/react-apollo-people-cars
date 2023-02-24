import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button, Form, Input, Divider, Select, InputNumber } from 'antd'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_CAR, GET_CARS, GET_PERSONS } from '../../../queries'

const { Option } = Select

const AddCar = () => {
  const [id] = useState(uuidv4)
  const [addCar] = useMutation(ADD_CAR)
  const {loading, error, data} = useQuery(GET_PERSONS)

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  const onFinish = values => {
    const { year, make, model, price, personId } = values

    addCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_CARS })
        cache.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            cars: [...data.cars, addCar]
          }
        })
      }
    })
  }

  useEffect(() => {
    forceUpdate([])
  }, [])
  

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <>
      {data.persons.length > 0 && (
      <>
        <Divider>Add Car</Divider>
        <Form
          name='add-car-form'
          form={form}
          layout='inline'
          onFinish={onFinish}
          size='large'
          style={{
            justifyContent: 'center',
            marginBottom: '40px'
          }}
        >
          <Form.Item label='Year:' name='year' rules={[{
            required: true,
            message: 'Please input year!'
          }]}>
            <InputNumber
              placeholder='Year'
              max={9999}
            />
          </Form.Item>

          <Form.Item label='Make:' name='make' rules={[{
            required: true,
            message: 'Please input make!'
          }]}>
            <Input
              placeholder='Make'
            />
          </Form.Item>

          <Form.Item label='Model:' name='model' rules={[{
            required: true,
            message: 'Please input model!'
          }]}>
            <Input
              placeholder='Model'
            />
          </Form.Item>

          <Form.Item label='Price:' name='price' rules={[{
            required: true,
            message: 'Please input price!'
          }]}>
            <InputNumber
              prefix='$'
            />
          </Form.Item>

          <Form.Item label='Person' name='personId' rules={[{
            required: true,
          }]}>
            <Select
              placeholder="Select a person"
              allowClear
            >
              {data.persons.map(({ id, firstName, lastName }) => (
                <Option key={id} value={id}>{firstName} {lastName}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item shouldUpdate={true}>
            {() => (
              <Button
                type='primary'
                htmlType='submit'
                disabled={!form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length}
              >Add Car</Button>
            )}
          </Form.Item>
        </Form>
        </>
      )}
    </>
  )
}

export default AddCar