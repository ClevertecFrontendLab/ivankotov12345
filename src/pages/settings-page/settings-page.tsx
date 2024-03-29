import { useEffect, useState } from 'react';
import { push } from 'redux-first-history';
import { TariffCard } from '@components/cards';
import { ModalFeedbacks } from '@components/modal-feedbacks';
import { SettingsItem } from '@components/settings-item';
import { SettingsSidebar } from '@components/sidebars';
import { TariffResultModal } from '@components/tariff-result-modal';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { changeUserDataFetch } from '@redux/slices/change-user-data';
import { getTariffListFetch } from '@redux/slices/tariff';
import { getUserFetch, userSelect } from '@redux/slices/user';
import { Paths } from '@typing/enums/paths';
import { Button, Layout, Typography } from 'antd';

import styles from './settings-page.module.scss';

const { Title } = Typography;

export const SettingsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector(userSelect);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSendFeedbackOpen, setIsSendFeedbackOpen] = useState(false)

  useEffect(() => {
    if(userData?.tariff) {
      setIsDisabled(false);
    }
  }, [userData]);

  const settingsItems = [
    {
      text: 'Открыт для совместных тренировок',
      tooltipText: 'включеная функция позволит участвовать в совместных тренировках',
      checked: userData?.readyForJointTraining,
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
          sendNotification: !userData?.sendNotification
        }));
        dispatch(getUserFetch());
      },
    },
    {
      text: 'Темная тема',
      tooltipText: 'темная тема доступна для PRO tarif',
      disabled: isDisabled,
    },
  ];

  useEffect(() => {
    dispatch(getTariffListFetch())
  }, [dispatch])

  const onSendFeedbackButton = () => setIsSendFeedbackOpen(true);
  const onShowFeedbacksButon = () => dispatch(push(Paths.FEEDBACKS));

  return (
    <Layout className={styles.wrapper}>
      <div className={styles.innerContainer}>
        <div>
          <Title level={4} className={styles.title}>Мой тариф</Title>

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

        <ul className={styles.switchWrapper}>
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

        <div>
          <Button
            type='primary'
            onClick={onSendFeedbackButton}
          >
            Написать отзыв
          </Button>

          <Button
            type='link'
            onClick={onShowFeedbacksButon}
          >
            Смотреть все отзывы
          </Button>
        </div>

        <SettingsSidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      <ModalFeedbacks
        isSendFeedbackOpen={isSendFeedbackOpen}
        setIsSendFeedbackOpen={setIsSendFeedbackOpen} />
      
      <TariffResultModal />
    </Layout>
  )
}
