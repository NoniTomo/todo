import { DeleteOutlined, EllipsisOutlined, StarFilled, StarOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Card, Checkbox, Col, Dropdown, Input, Row } from 'antd'

import { Center } from '../Center/Center'

import { useTaskCard } from './hooks/useTaskCard'

export type TaskCardProps = {
  id: number
}

export const TaskCard = ({ id, ...props }: TaskCardProps) => {
  const { state, functions } = useTaskCard({ id })

  const items: MenuProps['items'] = [
    {
      key: 'menu',
      label: <DeleteOutlined style={{ fontSize: '20px' }} />,
      danger: true,
      onClick: () => functions.onDelete()
    }
  ]

  return (
    <Card {...props}>
      <Row gutter={[16, 8]}>
        <Col span={1} xs={{ span: 2 }}>
          <Center>
            <Checkbox
              checked={state.status}
              onChange={(event) => functions.onComplete(event.target.checked)}
            ></Checkbox>
          </Center>
        </Col>
        <Col span={20} xs={{ span: 18 }}>
          <Input value={state.name} onChange={(event) => functions.onNameChange(event.target.value)} />
        </Col>
        <Col span={2} xs={{ span: 2 }}>
          <Center>
            <Button
              onClick={functions.onImportant}
              type="text"
              icon={state.important ? <StarFilled /> : <StarOutlined />}
            />
          </Center>
        </Col>
        <Col span={1} xs={{ span: 2 }}>
          <Center>
            <Dropdown menu={{ items }}>
              <EllipsisOutlined style={{ fontSize: '25px' }} />
            </Dropdown>
          </Center>
        </Col>
        <Col span={1} xs={{ span: 2 }}></Col>
        <Col span={23} xs={{ span: 22 }}>
          <Input
            value={state.description}
            onChange={(event) => functions.onDescriptionChange(event.target.value)}
          />
        </Col>
      </Row>
    </Card>
  )
}
