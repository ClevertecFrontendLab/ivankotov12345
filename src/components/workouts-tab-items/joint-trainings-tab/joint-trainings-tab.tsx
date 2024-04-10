import { useEffect, useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { UserJointTrainingsList } from '@components/user-joint-trainings-list';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { calendarSelect } from '@redux/slices/calendar';
import {
  clearUsersJointTrainingsList,
  getPalsFetch,
  getUserJointTrainingsListFetch,
  jointTrainingsSelect
} from '@redux/slices/joint-trainings';
import { trainingListSelect } from '@redux/slices/training-list';
import { Button, Divider, Input, Layout, Typography } from 'antd';

import styles from './joint-trainings-tab.module.scss';

const { Title, Paragraph } = Typography;
const { Search } = Input;

export const JointTrainingsTab: React.FC = () => {
  const dispatch = useAppDispatch();

  const { userJointTrainingsList } = useAppSelector(jointTrainingsSelect);
  const { trainings } = useAppSelector(calendarSelect);
  const { trainingList } = useAppSelector(trainingListSelect);
  const [searchValue, setSearchValue] = useState('');


  const findPreferredExercise = () => {
    const result = trainings && trainings
      .reduce((acc: Array<{name: string, total: number}>, { name, exercises }) => {

        let exercise = acc.find(currExercise => currExercise.name === name);

        if(!exercise) {
          exercise = { name, total: 0 };
          acc.push(exercise);
        }

        exercises.forEach(({ weight = 1, replays = 1, approaches = 1 }) => {
          if(weight && replays && approaches) {
            let current

            if(weight === 0) {
              current = replays * approaches;
            } else {
              current = weight * replays * approaches;
            }

            exercise.total += current;
          }

        });

        return acc;
      }, [])
      .sort((a, b) => b.total - a.total)[0].name;

    const preferredTraining = trainingList?.find((training) => training.name === result);

    return preferredTraining?.key;
  }

  const trainingType = trainings && findPreferredExercise() as string;

  useEffect(() => {
    dispatch(getPalsFetch());
  }, [dispatch]);

  const onRandomUsersClick = () => dispatch(getUserJointTrainingsListFetch(null));
  const onTrainingsTypeUsersClick = () => dispatch(getUserJointTrainingsListFetch(trainingType));
  const onBack = () => dispatch(clearUsersJointTrainingsList());
  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentSearchValue = event.target.value;

    setSearchValue(currentSearchValue);
  };

  return userJointTrainingsList.length > 0
  ? (
      <Layout className={styles.jointTabContainer}>
        <div className={styles.searchWrapper}>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={onBack}
          >
            Назад
          </Button>

          <Search value={searchValue} onChange={onSearchChange} />
        </div>
        <UserJointTrainingsList
          searchValue={searchValue}
        />
      </Layout>
    )
  : (
    <Layout className={styles.jointTabContainer}>
      <div className={styles.selectUserContainer}>
        <div className={styles.textWrapper}>
          <Title level={3} className={styles.title}>
            Хочешь тренироваться с тем, кто разделяет твои цели и темп? Можешь найти друга для совместных тренировок среди других пользователей.
          </Title>

          <Paragraph type='secondary'>
            Можешь воспользоваться случайным выбором или выбрать друга с похожим на твой уровень и вид тренировки, и мы найдем тебе идеального спортивного друга.
          </Paragraph>
        </div>

        <Divider className={styles.divider} />

        <div className={styles.buttonsWrapper}>
          <Button
            type='text'
            size='large'
            onClick={onRandomUsersClick}
            className={styles.buttonRandom}
          >
            Случайный выбор
          </Button>

          <Button
            type='text'
            size='large'
            onClick={onTrainingsTypeUsersClick}
          >
            Выбор друга по моим видам тренировок
          </Button>
        </div>
      </div>

      <div className={styles.palsWrapper}>
        <Title level={4}>Мои партнёры по тренировкам</Title>

        <Paragraph type='secondary'>У вас пока нет партнёров для совместных тренировок</Paragraph>
      </div>
    </Layout>
  )
}
