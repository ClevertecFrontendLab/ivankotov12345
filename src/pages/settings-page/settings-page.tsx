import { useEffect, useState } from 'react';
import { push } from 'redux-first-history';
import { TariffCard } from '@components/cards';
import { ModalFeedbacks } from '@components/modal-feedbacks';
import { SettingsItem } from '@components/settings-item';
import { SettingsSidebar } from '@components/sidebars';
import { TariffResultModal } from '@components/tariff-result-modal';
import { MOBILE_WIDTH } from '@constants/constants';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useScreenWidth } from '@hooks/use-screen-width-hook';
import { changeUserDataFetch } from '@redux/slices/change-user-data';
import { getTariffListFetch } from '@redux/slices/tariff';
import { toggleReadyForJoint, toggleSendNotigication, userSelect } from '@redux/slices/user';
import { Paths } from '@typing/enums/paths';
import { Button, Layout, Typography } from 'antd';

import styles from './settings-page.module.scss';

const { Title } = Typography;

export const SettingsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userData, readyForJoint, sendNotification } = useAppSelector(userSelect);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSendFeedbackOpen, setIsSendFeedbackOpen] = useState(false);

  const screenWidth = useScreenWidth()

  const isMobile = !!(screenWidth && screenWidth <= MOBILE_WIDTH)

  useEffect(() => {
    if(userData?.tariff) {
      setIsDisabled(false);
    }
  }, [userData]);

  const settingsItems = [
    {
      text: 'Открыт для совместных тренировок',
      tooltipText: 'включеная функция позволит участвовать в совместных тренировках',
      checked: readyForJoint,
      onClick: () => {
        dispatch(toggleReadyForJoint(!readyForJoint));

        dispatch(changeUserDataFetch({
          readyForJointTraining: !userData?.readyForJointTraining
        }));
      },
      testId: 'tariff-trainings',
      testIdIcon: 'tariff-trainings-icon',
    },
    {
      text: 'Уведомления',
      tooltipText: 'включеная функция позволит получать уведомления об активностях',
      checked: sendNotification,
      onClick: () => {
        dispatch(toggleSendNotigication(!sendNotification));
        
        dispatch(changeUserDataFetch({
          sendNotification: !userData?.sendNotification
        }));
      },
      testId: 'tariff-notifications',
      testIdIcon: 'tariff-notifications-icon',
    },
    {
      text: 'Темная тема',
      tooltipText: 'темная тема доступна для PRO tarif',
      disabled: isDisabled,
      testId: 'tariff-theme',
      testIdIcon: 'tariff-theme-icon',
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
              testId='pro-tariff-card'
            />
          </div>
        </div>

        <ul className={styles.switchWrapper}>
          {
            settingsItems.map(({ text, tooltipText, disabled, checked, onClick, testId, testIdIcon  }) => (
              <SettingsItem
                text={text}
                tooltipText={tooltipText}
                key={text}
                disabled={disabled}
                checked={checked}
                onClick={onClick}
                testId={testId}
                testIdIcon={testIdIcon}
              />
            ))
          }
        </ul>

        <div className={styles.buttonsFeedbackWrapper}>
          <Button
            type='primary'
            onClick={onSendFeedbackButton}
            className={styles.buttonCommentary}
            block={isMobile}
          >
            Написать отзыв
          </Button>

          <Button
            type='link'
            onClick={onShowFeedbacksButon}
            className={styles.buttonCommentaries}
            block={isMobile}
          >
            Смотреть все отзывы
          </Button>
        </div>

        {isSidebarOpen &&
          <SettingsSidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />}
      </div>

      <ModalFeedbacks
        isSendFeedbackOpen={isSendFeedbackOpen}
        setIsSendFeedbackOpen={setIsSendFeedbackOpen}
      />
      
      <TariffResultModal />
    </Layout>
  )
}
