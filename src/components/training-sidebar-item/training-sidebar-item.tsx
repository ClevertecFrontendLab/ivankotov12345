import { Input, InputNumber } from 'antd';

import { ExerciseType } from '@typing/types/exercise-types';

import styles from './training-sidebar-item.module.scss'

type PropsType = {
  exercise: ExerciseType,
  index: number
  changeExercise: (index: number, changedExercise: ExerciseType) => void,
}

export const TrainingSidebarItem: React.FC<PropsType> = ({ exercise, changeExercise, index }) => {
  const onTrainigNameChange = (e: React.ChangeEvent<HTMLInputElement>) => 
    changeExercise(index, {...exercise, name: e.target.value});
  const onApproachesChange = (value: number | null) => 
    changeExercise(index, {...exercise,  approaches: value});
  const onWeightChange = (value: number | null) => 
    changeExercise(index, {...exercise,  weight: value});
  const onReplaysChange = (value: number | null) => 
    changeExercise(index, {...exercise,  replays: value});
  return (
    <div>
      <Input
        placeholder='Упражнение'
        value={exercise.name}
        onChange={onTrainigNameChange}
      />

      <div className={styles.inputsNumberWrapper}>
        <div>
          <span>Подходы</span>
          <InputNumber
            value={exercise.approaches}
            min={1}
            addonBefore='+'
            onChange={(value) => onApproachesChange(value)}
          />
        </div>

        <div className={styles.inputsWeightWrapper}>
          <div>
            <span>Вес, кг</span>
            <InputNumber
              value={exercise.weight}
              onChange={(value) => onWeightChange(value)}
              min={0}
            />
          </div>

          <span>X</span>
          
          <div>
            <span>Количество</span>
            <InputNumber
              value={exercise.replays}
              onChange={(value) => onReplaysChange(value)}
              min={0}
            />
          </div>
        </div>
      </div>
    </div>
  )
}