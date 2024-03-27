import { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { SettingsTable } from '@components/settings-table';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { getPayTariffFetch, tariffSelect } from '@redux/slices/tariff';
import { Button, Drawer, Radio, RadioChangeEvent, Typography } from 'antd';

type SettingsSidebarProps = {
  isSidebarOpen: boolean,
  setIsSidebarOpen: (isSidebarOpen: boolean) => void
}

const { Title, Text } = Typography;

export const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [selectedTariffDays, setSelectedTariffDays] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  const onClose = () => setIsSidebarOpen(false);

  const { tariffList } = useAppSelector(tariffSelect);
  const tariffId = tariffList && tariffList[0]._id

  const traiffItemsList = tariffList 
    && tariffList.map((item) => item.periods)[0]
        .map((item) => (
          { ...item, cost: item.cost.toLocaleString('ru-RU') }
          ));
  
  const onChange = (event: RadioChangeEvent) => {
    const currTariffDays = event.target.value;

    setSelectedTariffDays(currTariffDays);
  }

  const onButtonPayTariff = () => {
    if(tariffId && selectedTariffDays) {
      dispatch(getPayTariffFetch({
        tariffId,
        days: selectedTariffDays
      }))
    }
  }

  return (
    <Drawer
      open={isSidebarOpen}
      mask={false}
      closable={true}
      headerStyle={{ display: 'none' }}
    >
      <div>
        <Title level={5}>Сравнить тарифы</Title>
        <Button
          icon={<CloseOutlined />}
          onClick={onClose}
        />
      </div>
      <SettingsTable />

      <Radio.Group>
      {traiffItemsList?.map(({ text, cost, days }) => (
        <Radio value={days} onChange={onChange} key={text}>
          <Text>{text}</Text>
          <Text>{`${cost} $`}</Text>
        </Radio>
      ))}
      </Radio.Group>
      <Button onClick={onButtonPayTariff}>
        Выбрать и оплатить
      </Button>
    </Drawer>
  )
}