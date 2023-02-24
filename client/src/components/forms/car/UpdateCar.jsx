import React, { useEffect, useState } from 'react'
import { Button, Form, Input, InputNumber, Select } from 'antd'
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_CAR } from '../../../queries'
import { GET_PERSONS } from '../../../queries'

const { Option } = Select

const UpdateCar = props => {
  const [id] = useState(props.id)
  const [year, setYear] = useState(props.year)
  const [make, setMake] = useState(props.make)
  const [model, setModel] = useState(props.model)
  const [price, setPrice] = useState(props.price)
  const [personId, setPersonId] = useState(props.personId)
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  const {loading, error, data} = useQuery(GET_PERSONS)
  const [updateCar] = useMutation(UPDATE_CAR)

  useEffect(() => {
    forceUpdate()
  }, [])

  const onFinish = values => {
    const { year, make, model, price, personId } = values
    console.log(id, values)
    updateCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId
      }
    })
    props.onButtonClick()
  }

  const updateStateVariable = (variable, value) => {
    props.updateStateVariable(variable, value)
    switch (variable) {
      case 'year':
        setYear(value)
        break
      case 'make':
        setMake(value)
        break
      case 'model':
        setModel(value)
        break
      case 'price':
        setPrice(value)
        break
      case 'personId':
        setPersonId(value)
        break
      default:
        break
    }
  }

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <Form
    form={form}
    name='update-car-form'
    layout='inline'
    onFinish={onFinish}
    size='large'
    style={{
      marginBottom: '10px',
      justifyContent: 'center',
    }}
    initialValues={{
      year: year,
      make: make,
      model: model,
      price: price,
      personId: personId
    }}
    >
      <Form.Item
      label='Year:'
      name='year'
      rules={[{
        required: true,
        message: 'Please input year!'
      }]}
      >
        <InputNumber
        placeholder='Year'
        onChange={e => updateStateVariable('year', e)}
        />
      </Form.Item>

      <Form.Item
      label='Make:'
      name='make'
      rules={[{
        required: true,
        message: 'Please input make!'
      }]}
      >
        <Input
        placeholder='Make'
        onChange={e => updateStateVariable('make', e.target.value)}
        />
      </Form.Item>

      <Form.Item
      label='Model:'
      name='model'
      rules={[{
        required: true,
        message: 'Please input model!'
      }]}
      >
        <Input
        placeholder='Model'
        onChange={e => updateStateVariable('model', e.target.value)}
        />
      </Form.Item>

      <Form.Item label='Price:' name='price' rules={[{
        required: true,
        message: 'Please input price!'
      }]}>
        <InputNumber
          prefix='$'
          onChange={e => updateStateVariable('price', e)}
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
          disabled={
            (!form.isFieldTouched('year') && !form.isFieldTouched('make') && !form.isFieldTouched('model') && !form.isFieldTouched('price')) || form.getFieldsError().filter(({ errors }) => errors.length).length
          }
          >Update Car</Button>
        )}
      </Form.Item>

      <Button
      onClick={props.onButtonClick}
      >Cancel</Button>
    </Form>
  )
}

export default UpdateCar