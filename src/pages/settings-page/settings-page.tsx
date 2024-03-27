import { useEffect, useState } from 'react';
import { TariffCard } from '@components/cards';
import { SettingsItem } from '@components/settings-item';
import { SettingsSidebar } from '@components/sidebars';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { changeUserDataFetch } from '@redux/slices/change-user-data';
import { getTariffListFetch } from '@redux/slices/tariff';
import { getUserFetch, userSelect } from '@redux/slices/user';
import { Layout, Typography } from 'antd';

import styles from './settings-page.module.scss';

const { Title } = Typography;

export const SettingsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector(userSelect);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const settingsItems = [
    {
      text: 'Открыт для совместных тренировок',
      tooltipText: 'включеная функция позволит участвовать в совместных тренировках',
      checked: userData?.readyForJointTraining || false,
      onClick: () => {
        dispatch(changeUserDataFetch({
          readyForJointTraining: !userData?.readyForJointTraining
        }));
        dispatch(getUserFetch());
      }
    },
    {
      text: 'Уведомления',
      tooltipText: 'включеная функция позволит получать уведомления об активностях',
      checked: userData?.sendNotification,
      onClick: () => {
        dispatch(changeUserDataFetch({
          readyForJointTraining: !userData?.sendNotification
        }));
        dispatch(getUserFetch());
      },
    },
    {
      text: 'Темная тема',
      tooltipText: 'темная тема доступна для PRO tarif',
      disabled: true,
    },
  ];

  useEffect(() => {
    dispatch(getTariffListFetch())
  }, [dispatch])

  return (
    <Layout className={styles.wrapper}>
      <div>
        <Title level={4}>Мой тариф</Title>

        <div className={styles.cradsWrapper}>
          <TariffCard 
            tariff='FREE'
            setIsSidebarOpen={setIsSidebarOpen}
          />

          <TariffCard
            tariff='PRO'
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>
      </div>

      <ul>
        {
          settingsItems.map(({ text, tooltipText, disabled, checked, onClick }) => (
            <SettingsItem
              text={text}
              tooltipText={tooltipText}
              key={text}
              disabled={disabled}
              checked={checked}
              onClick={onClick}
            />
          ))
        }
      </ul>

      <SettingsSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </Layout>
  )
}
