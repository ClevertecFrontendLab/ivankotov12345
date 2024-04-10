import { Fragment, useState } from 'react';
import { ArrowLeftOutlined, DownOutlined } from '@ant-design/icons';
import { CalendarBadgeColors } from '@typing/enums/calendar-badge-colors';
import { CalendarResponseItemType } from '@typing/types/response-types';
import { Button, Divider, Popover, Typography } from 'antd';

import styles from './workouts-popover.module.scss';

type WorkoutPopoverProps = {
  calendarItem: CalendarResponseItemType,
  onRedactTraining: (id: string) => void,
}

const { Text } = Typography;

export const WorkoutsPopover: React.FC<WorkoutPopoverProps> = ({ calendarItem, onRedactTraining }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { name, exercises } = calendarItem;

  const onOpenClick = () =>setIsOpen(true);
  const onBack = () => setIsOpen(false);

    const popoverContent = (
    <Fragment>
        <Button
          icon={<ArrowLeftOutlined />}
          type='text'
          size='large'
          onClick={onBack}
          className={styles.buttonBack}
        >
          {name}
        </Button>

      <Divider
        className={styles.divider}
        style={{
          background: CalendarBadgeColors[name as keyof typeof CalendarBadgeColors]
        }}
      />

      <ul className={styles.exercisesList}>
        {exercises.map((exercise) => (
          <li key={exercise._id}>
            <Text type='secondary'>{exercise.name}</Text>
          </li>
        ))}
      </ul>

      <Divider className={styles.divider} />

      <div className={styles.buttonAddExercisesWrapper}>
        <Button
          block={true}
          onClick={() => onRedactTraining(calendarItem._id)}
        >
          Добавить упражнения
        </Button>
      </div>
    </Fragment>
  )

  return (
    <Popover
      trigger='click'
      open={isOpen}
      showArrow={false}
      placement='bottomRight'
      content={popoverContent}
      overlayClassName={styles.popover}
    >
      <Button
        type='text'
        icon={<DownOutlined />}
        onClick={onOpenClick}
      />
    </Popover>
  )
}
