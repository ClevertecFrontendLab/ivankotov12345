import { useState } from 'react';
import { DownOutlined, UpOutlined, UserOutlined } from '@ant-design/icons';
import { InvitationListPopover } from '@components/invitation-list-popover';
import { FORMAT_DATE_IN_VIEW } from '@constants/constants';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { getInvitationResponseFetch, inviteSelect } from '@redux/slices/invite';
import { TrainingTypeText } from '@typing/enums/training-type-text';
import { Avatar, Button, Card, List, Typography } from 'antd';
import moment from 'moment';

import styles from './invitations-list.module.scss';

const { Text, Paragraph } = Typography;

export const InvitationsList: React.FC = () => {
  const dispatch = useAppDispatch()
  const { responseData } = useAppSelector(inviteSelect);
  const [isListAll, setIsListAll] = useState(false);

  const dataToShow = isListAll ? responseData : responseData.slice(0, 1);

  const toggleShowlist = () => {
    setIsListAll(!isListAll);
  }

  const onInviteButtonClick = (id: string, status: 'accepted' | 'rejected') => {
    dispatch(getInvitationResponseFetch({
      id,
      status
    }));
  }

  const loadMore = (
    <Button
      onClick={toggleShowlist}
      type='text'
      icon={isListAll ? <UpOutlined /> : <DownOutlined />}
      className={styles.buttonShowFullList}
    >
      {isListAll
        ? 'Скрыть все сообщения'
        : 'Показать все сообщения'}
    </Button>
  )

  return (
    <section className={styles.invitationsListWrapper}>
      <Text>Новое сообщение {`(${responseData.length})`}</Text>
      <List
        itemLayout='horizontal'
        dataSource={dataToShow}
        loadMore={loadMore}
        renderItem={(item) => (
          <List.Item key={item._id}>
            <Card className={styles.card}>
              <div className={styles.userContainer}>
                <Avatar
                  src={item.from.imageSrc}
                  icon={<UserOutlined />}
                  size='large'
                  className={styles.avatar}
                />
                
                <div className={styles.textWrapper}>
                  <Text>{item.from.firstName}</Text>
                  <Text>{item.from.lastName}</Text>
                </div>
              </div>

              <div className={styles.textContainer}>
                <Text type='secondary'>
                  {moment(item.createdAt).format(FORMAT_DATE_IN_VIEW)}
                </Text>

                <Paragraph className={styles.text}>
                  Привет, я ищу партнёра для совместных {`[${TrainingTypeText[item.training.name as keyof typeof TrainingTypeText]}]`}. Ты хочешь присоединиться ко мне на следующих тренировках?
                </Paragraph>

                <InvitationListPopover
                  title={item.training.name}
                  date={item.training.date}
                  period={item.training.parameters.period}
                  exercises={item.training.exercises}
                />
              </div>

              <div className={styles.buttonsContainer}>
                <Button
                  type='primary'
                  size='large'
                  className={styles.buttonApply}
                  onClick={() => onInviteButtonClick(item._id, 'accepted')}
                >
                  Тренироваться вместе
                </Button>

                <Button
                  size='large'
                  onClick={() => onInviteButtonClick(item._id, 'rejected')}
                >
                  Отклонить запрос
                </Button>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </section>
  )
}
