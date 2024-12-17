import { Select } from 'antd'

export type SelectFilterProps = {
  handleChange: (value: string) => void
  value: string
}

export const SelectFilter = ({ handleChange, value, ...props }: SelectFilterProps) => (
  <Select
    value={value}
    defaultValue={'all'}
    style={{ width: 120 }}
    onChange={handleChange}
    options={[
      { value: 'all', label: 'Все' },
      { value: 'important', label: 'Важные' },
      { value: 'completed', label: 'Выполненные' },
      { value: 'not_completed', label: 'Не выполненные' }
    ]}
    {...props}
  />
)
