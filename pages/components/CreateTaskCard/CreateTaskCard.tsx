import { Controller } from 'react-hook-form'
import { CheckOutlined } from '@ant-design/icons'
import { Button as AntdButton, Card, Checkbox, Col, Form, Input, Row } from 'antd'
import styled from 'styled-components'

import { Center } from '@/src/shared/components'

import { useCreateTaskCard } from './hooks/useCreateTaskCard'

const Button = styled(AntdButton)`
  width: 100%;
`

const TypographyError = styled.span`
  color: red;
`

const FormItem = styled(Form.Item)`
  margin: 0px;
  padding: 0px;
`

export const CreateTaskCard = () => {
  const { state, functions } = useCreateTaskCard()

  return (
    <Card>
      <Form onFinish={functions.handleSubmit(functions.onSubmit)}>
        <Row gutter={[16, 8]}>
          <Col span={1} xs={{ span: 2 }}>
            <Center>
              <FormItem>
                <Controller
                  name="status"
                  defaultValue={false}
                  control={state.control}
                  render={({ field: { onChange, value } }) => (
                    <Checkbox checked={value} onChange={onChange} />
                  )}
                />
              </FormItem>
            </Center>
          </Col>
          <Col span={21} xs={{ span: 19 }}>
            <FormItem>
              <Controller
                name="name"
                defaultValue=""
                control={state.control}
                rules={{ required: true, maxLength: 150 }}
                render={({ field }) => <Input placeholder="Задача" {...field} />}
              />
            </FormItem>
            {state.errors.name && <TypographyError>Это поле обязательное</TypographyError>}
          </Col>
          <Col span={2} xs={{ span: 3 }}>
            <Button type="primary" htmlType="submit">
              <CheckOutlined />
            </Button>
          </Col>
          <Col span={1} xs={{ span: 2 }}></Col>
          <Col span={23} xs={{ span: 22 }}>
            <FormItem>
              <Controller
                name="description"
                defaultValue=""
                rules={{ required: true, maxLength: 150 }}
                control={state.control}
                render={({ field }) => <Input placeholder="Описание" {...field} />}
              />
            </FormItem>
            {state.errors.description && <TypographyError>Это поле обязательное!</TypographyError>}
          </Col>
        </Row>
      </Form>
    </Card>
  )
}
