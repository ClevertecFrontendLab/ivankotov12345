import { Button, Checkbox, Input, InputNumber, Typography } from 'antd';

import { ExerciseType } from '@typing/types/exercise-types';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { redactTrainingSelect } from '@redux/slices/redact-training';

import styles from './training-sidebar-item.module.scss'


type PropsType = {
  exercise: ExerciseType,
  index: number
  changeExercise: (index: number, changedExercise: ExerciseType) => void,
  handleRemoveChange: (index: number, isRemoveChecked: boolean) => void,
}

const { Text } = Typography;

export const TrainingSidebarItem: React.FC<PropsType> = ({
  exercise,
  changeExercise,
  handleRemoveChange,
  index }) => {
  const { isRedactingMode } = useAppSelector(redactTrainingSelect);
  const onTrainigNameChange = (e: React.ChangeEvent<HTMLInputElement>) => 
    changeExercise(index, {...exercise, name: e.target.value});
  const onApproachesChange = (value: number | null) => 
    changeExercise(index, {...exercise,  approaches: value});
  const onWeightChange = (value: number | null) => 
    changeExercise(index, {...exercise,  weight: value});
  const onReplaysChange = (value: number | null) => 
    changeExercise(index, {...exercise,  replays: value});
  const incrementApproaches = () => 
    changeExercise(index, {...exercise, approaches: (exercise.approaches || 0) + 1});
  return (
    <li>
      <Input
        placeholder='Упражнение'
        value={exercise.name}
        onChange={onTrainigNameChange}
        addonAfter={
          isRedactingMode 
          && <Checkbox
               onChange={(e) => handleRemoveChange(index, e.target.checked)}
             />
        }
      />

      <div className={styles.inputsNumberWrapper}>
        <div>
          <Text className={styles.label}>Подходы</Text>
          <InputNumber
            value={exercise.approaches}
            min={1}
            addonBefore={
              <Button
                type='text'
                size='small'
                className={styles.buttonPlus}
                onClick={incrementApproaches}
              >
                +
              </Button>
            }
            onChange={(value) => onApproachesChange(value)}
          />
        </div>

        <div className={styles.inputsWeightWrapper}>
          <div>
            <Text className={styles.label}>Вес, кг</Text>
            <InputNumber
              value={exercise.weight}
              onChange={(value) => onWeightChange(value)}
              min={0}
            />
          </div>

          <span className={styles.divider}>X</span>
          
          <div>
            <Text className={styles.label}>Количество</Text>
            <InputNumber
              value={exercise.replays}
              onChange={(value) => onReplaysChange(value)}
              min={0}
            />
          </div>
        </div>
      </div>
    </li>
  )
}