import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { PalModal } from '@components/pal-modal';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { jointTrainingsSelect } from '@redux/slices/joint-trainings';
import { Avatar, Card, List, Typography } from 'antd';

import styles from './pals-list.module.scss'

const { Text } = Typography;

export const PalsList: React.FC = () => {
  const { pals } = useAppSelector(jointTrainingsSelect);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const onCardClick = () => setIsModalOpened(true);

  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={pals}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <Card onClick={onCardClick}>
            <div className={styles.cardUser}>
              <Avatar
                src={item.imageSrc}
                size='large'
                icon={<UserOutlined />}
                className={styles.avatar}
              />
              <div className={styles.nameWrapper}>
                {item.name.split(/ (.+)/).map((string) => (
                  <Text key={string}>{string}</Text>
                ))}
              </div>
            </div>

            <ul className={styles.cardItemsList}>
              <li>
                <Text type='secondary' className={styles.description}>
                  Тип тренировки:
                </Text>

                <Text className={styles.text}>{item.trainingType}</Text>
              </li>

              <li>
                <Text type='secondary' className={styles.description}>Средняя нагрузка:</Text>
                <Text className={styles.text}>{item.avgWeightInWeek} кг/нед</Text>
              </li>
              </ul>
          </Card>

          <PalModal
            user={item}
            isModalOpen={isModalOpened}
            setIsModalOpen={setIsModalOpened}
          />
        </List.Item>
      )}
    />
  )
}
