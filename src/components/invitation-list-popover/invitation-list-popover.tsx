import { Fragment, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { FORMAT_DATE_IN_VIEW, PERIODS_MAP } from '@constants/constants';
import { CalendarBadgeColors } from '@typing/enums/calendar-badge-colors';
import { ExerciseType } from '@typing/types/exercise-types';
import { Badge, Button, Divider, Popover, Typography } from 'antd'
import moment from 'moment';

import styles from './invitation-list-popover.module.scss';

type InvititionListPopoverProps = {
  title: string,
  date: string,
  period?: number,
  exercises: ExerciseType[],
}

const { Text } = Typography;

export const InvitationListPopover: React.FC<InvititionListPopoverProps> = ({
  title,
  date,
  period,
  exercises,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const dateInView = moment(date).format(FORMAT_DATE_IN_VIEW);

  const onPopoverOpen = () => setIsOpen(true);
  const onPopoverClose = () => setIsOpen(false);

  const content = (
    <Fragment>
      <div className={styles.titleWrapper}>
        <Badge
          color={CalendarBadgeColors[title as keyof typeof CalendarBadgeColors]}
          text={title}
        />

        <Button
          type='text'
          size='small'
          icon={<CloseOutlined />}
          onClick={onPopoverClose}
        />
      </div>

      <Divider className={styles.divider} />

      <ul className={styles.contentWrapper}>
        <li>
          <Text className={styles.textPeriod}>{PERIODS_MAP.get(period)}</Text>
          <Text>{dateInView}</Text>
        </li>
        {exercises.map((exercise) => (
          <li key={exercise._id}>
            <Text type='secondary'>{exercise.name}</Text>

            <Text className={styles.textExercisesNumbers}>
              {`${exercise.approaches} x (${exercise.weight === 0
                ? exercise.replays
                : `${exercise.weight} кг`})`}
            </Text>
          </li>
        ))}
      </ul>
    </Fragment>
  )

  return (
    <Popover
      open={isOpen}
      content={content}
      overlayClassName={styles.popover}
      showArrow={false}
      placement='bottomLeft'
      overlayInnerStyle={{transform: 'translateY(-25px)'}}
    >
      <Button
        type='text'
        onClick={onPopoverOpen}
        block={false}
        className={styles.popoverButton}
        title={title}
        
      >
        Посмотреть детали тренировки
      </Button>
    </Popover>
  )
}
