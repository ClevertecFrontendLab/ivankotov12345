import { useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { SettingsTable } from '@components/settings-table';
import { DRAWER_WIDTH_DESKTOP, DRAWER_WIDTH_MOBILE, FORMAT_DATE_IN_VIEW_SHORT, MOBILE_WIDTH } from '@constants/constants';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useScreenWidth } from '@hooks/use-screen-width-hook';
import { getPayTariffFetch, tariffSelect } from '@redux/slices/tariff';
import { userSelect } from '@redux/slices/user';
import { Button, Drawer, Radio, RadioChangeEvent, Typography } from 'antd';
import moment from 'moment';

import styles from './settings-sidebar.module.scss'

type SettingsSidebarProps = {
  isSidebarOpen: boolean,
  setIsSidebarOpen: (isSidebarOpen: boolean) => void
}

const { Title, Text } = Typography;

export const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [selectedTariffDays, setSelectedTariffDays] = useState<number | null>(null);
  const [isButtonPayDisabled, setIsButtonPayDisabled] = useState(true);
  const dispatch = useAppDispatch();

  const screenWidth = useScreenWidth();

  const drawerWidth = screenWidth && screenWidth > MOBILE_WIDTH
    ? DRAWER_WIDTH_DESKTOP
    : DRAWER_WIDTH_MOBILE;

  const onClose = () => setIsSidebarOpen(false);

  const { tariffList } = useAppSelector(tariffSelect);
  const { userData } = useAppSelector(userSelect);

  const tariffId = tariffList && tariffList[0]._id;
  const date = userData?.tariff && moment(userData?.tariff.expired).format(FORMAT_DATE_IN_VIEW_SHORT);

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
    setIsSidebarOpen(false);
    if(tariffId && selectedTariffDays) {
      dispatch(getPayTariffFetch({
        tariffId,
        days: selectedTariffDays
      }))
    }
  }

  useEffect(() => {
    if(selectedTariffDays) {
      setIsButtonPayDisabled(false);
    }
  }, [selectedTariffDays])

  return (
    <Drawer
      data-test-id='tariff-sider'
      open={isSidebarOpen}
      mask={false}
      closable={true}
      width={drawerWidth}
      headerStyle={{ display: 'none' }}
      footer={!date && [
        <Button
          onClick={onButtonPayTariff}
          disabled={isButtonPayDisabled}
          size='large'
          type='primary'
          block={true}
          className={styles.buttonPay}
          data-test-id='tariff-submit'
        >
          Выбрать и оплатить
        </Button>
      ]}
      className={styles.drawer}
    >
      <div className={styles.titleWrapper}>
        <Title
        level={5}
        className={styles.title}
        >
          Сравнить тарифы
        </Title>

        <Button
          type='text'
          size='small'
          icon={<CloseOutlined />}
          onClick={onClose}
        />
      </div>

      {date &&
        <div className={styles.titleDateWrapper}>
          <Title level={5} className={styles.titleDate}>Ваш PRO tarif активен до {date}</Title>
        </div>}

      <SettingsTable />
      
      {!userData?.tariff &&
        <div className={styles.selectTariffWrapper} data-test-id='tariff-cost'>
          <Title level={5} className={styles.selectTariffTitle}>Стоимость тарифа</Title>

          <Radio.Group className={styles.radioWrapper}>
          {traiffItemsList?.map(({ text, cost, days }) => (
            <div data-test-id={cost === '10'&& 'tariff-10'}>
              <Radio
                value={days}
                onChange={onChange}
                key={text}
                className={styles.radio}
              >
                <Text className={styles.radioText}>{text}</Text>
            
                <Title
                  level={5}
                  className={styles.textPrice}
                >
                  {`${cost} $`}
                </Title>
              </Radio>
              </div>
            ))}
            </Radio.Group>
          </div>
      }
    </Drawer>
  )
}