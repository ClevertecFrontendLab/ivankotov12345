import { Fragment, useEffect, useState } from 'react';
import { HighlightText } from '@components/highlight-text';
import { CreateTrainingSidebar } from '@components/sidebars';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setInviteUserId } from '@redux/slices/invite';
import { jointTrainingsSelect } from '@redux/slices/joint-trainings';
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

  const onSelectUser = (user: UserJointTrainingsType) => {
    setIsSidebarOpen(true);
    setSelectedUser(user);
    dispatch(setInviteUserId(user.id));
  }

  return (
    <Fragment>
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={currentUsers}
      pagination={{
        pageSize: 12,
      }}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <Card>
            <div>
              <Avatar src={item.imageSrc} />
              <HighlightText
                name={item.name}
                searchValue={searchValue}
              />
            </div>

            <p>
              <Text>Тип тренировки:</Text>
              <Text>{item.trainingType}</Text>
            </p>
            <p>
              <Text>Средняя нагрузка:</Text>
              <Text>{item.avgWeightInWeek} кг/нед</Text>
            </p>

            <Button onClick={() => onSelectUser(item)}>Создать тренировку</Button>
          </Card>
        </List.Item>
      )}
    />
    {isSidebarOpen &&
      <CreateTrainingSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        selectedUser={selectedUser}
      />}
    </Fragment>
  )
}