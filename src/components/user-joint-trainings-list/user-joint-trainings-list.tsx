import { Fragment, useEffect, useState } from 'react';
import { CheckCircleFilled, ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons';
import { HighlightText } from '@components/highlight-text';
import { WorkoutsTrainingSidebar } from '@components/sidebars';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setInviteUserId } from '@redux/slices/invite';
import { jointTrainingsSelect } from '@redux/slices/joint-trainings';
import { JointStatus } from '@typing/enums/joint-status';
import { UserJointTrainingsType } from '@typing/types/user-joint-trainings-types';
import { Avatar, Button, Card, List, Typography } from 'antd';

import styles from './user-joint-trainings-list.module.scss';

type UserJointTrainingsListProps = {
  searchValue: string,
}

const { Text } = Typography;

export const UserJointTrainingsList: React.FC<UserJointTrainingsListProps> = ({ searchValue }) => {
  const dispatch = useAppDispatch()
  const { userJointTrainingsList } = useAppSelector(jointTrainingsSelect);

  const [currentUsers, setCurrentUsers] = useState(userJointTrainingsList);
  const [selectedUser, setSelectedUser] = useState<UserJointTrainingsType>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const filteredUsers = userJointTrainingsList.filter(({ name }) => 
      name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setCurrentUsers(filteredUsers);
  }, [searchValue, userJointTrainingsList]);

  const currentUsesrStatus = (status: string | null) => {
    if(status === JointStatus.PENDING) {
      return (
        <Text className={styles.status}>ожидает подтверждения</Text>
      )
    } 
    if(status === JointStatus.ACCEPTED) {
      return (
        <Text
          editable={{
            icon: <CheckCircleFilled className={styles.iconSucess} />,
            tooltip: false
          }}
          className={styles.status}
        >
          тренировка одобрена
        </Text>
      )
    } 
    if (status === JointStatus.REJECTED) {
      return (
        <Text
          editable={{
          icon: <ExclamationCircleOutlined />,
          tooltip: false
          }}
          className={styles.status}
        >
          тренировка отклонена
        </Text>
      )
    }

    return null;
  }

  const onSelectUser = (user: UserJointTrainingsType) => {
    setIsSidebarOpen(true);
    setSelectedUser(user);
    dispatch(setInviteUserId(user.id));
  }

  return (
    <Fragment>
      <List
        className={styles.cardsWrapper}
        grid={{ gutter: 16, column: 4 }}
        dataSource={currentUsers}
        pagination={{
          pageSize: 12,
        }}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card className={styles.card}>
              <div className={styles.cardUser}>
                <Avatar
                  className={styles.avatar}
                  src={item.imageSrc}
                  size='large'
                  icon={<UserOutlined className={styles.avatarIcon} />}
                />

                <HighlightText
                  name={item.name}
                  searchValue={searchValue}
                />
              </div>

              <ul className={styles.cardItemsList}>
                <li>
                  <Text className={styles.description} type='secondary'>Тип тренировки:</Text>
                  <Text className={styles.text}>{item.trainingType}</Text>
                </li>

                <li>
                  <Text className={styles.description} type='secondary'>Средняя нагрузка:</Text>
                  <Text className={styles.text}>{item.avgWeightInWeek} кг/нед</Text>
                </li>
              </ul>

              <Button
                onClick={() => onSelectUser(item)}
                type='primary'
                size='small'
                block={true}
                className={styles.cardButton}
                disabled={item.status === JointStatus.PENDING}
              >
                Создать тренировку
              </Button>

              {currentUsesrStatus(item.status)}
            </Card>
          </List.Item>
        )}
      />

      {isSidebarOpen &&
        <WorkoutsTrainingSidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          selectedUser={selectedUser}
        />}
    </Fragment>
  )
}