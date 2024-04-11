import { CheckCircleFilled, ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { getDeleteInvitationFetch } from '@redux/slices/invite';
import { JointStatus } from '@typing/enums/joint-status';
import { UserJointTrainingsType } from '@typing/types/user-joint-trainings-types';
import { Avatar, Button, Modal, Typography } from 'antd';

import styles from './pal-modal.module.scss';

type PalModalProps = {
  user: UserJointTrainingsType,
  isModalOpen: boolean,
  setIsModalOpen: (isModalOpen: boolean) => void,
}

const { Text } = Typography

export const PalModal: React.FC<PalModalProps> = ({ user, isModalOpen, setIsModalOpen }) => {
  const dispatch = useAppDispatch();

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
       icon: <CheckCircleFilled className={styles.iconSuccess} />,
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
      icon: <ExclamationCircleOutlined className={styles.iconInfo} />,
      tooltip: 'Повторный запрос будет доступен через 2 недели'
      }}
      className={styles.status}
     >
      тренировка отклонена
     </Text>
    )
  }

  return null;
 }

  const onClose = () => {
    setIsModalOpen(false);

  }

  const onDeletePal = () => {
    dispatch(getDeleteInvitationFetch(user.inviteId));
    setIsModalOpen(false);
  }

  return (
  <Modal
    open={isModalOpen}
    onCancel={onClose}
    footer={null}
    centered={true}
    className={styles.modalWrapper}
    maskStyle={{
        backgroundColor: 'rgba(121, 156, 213, 0.5)',
        backdropFilter: 'blur(5px)'
      }}
  >

      <div className={styles.cardUser}>
        <Avatar
          src={user.imageSrc}
          size='large'
          icon={<UserOutlined />}
          className={styles.avatar}
        />

        <div className={styles.nameWrapper}>
          {user.name.split(/ (.+)/).map((string) => (
            <Text key={string}>{string}</Text>
          ))}
        </div>
      </div>

      <ul className={styles.cardItemsList}>
        <li>
          <Text type='secondary' className={styles.description}>
            Тип тренировки:
          </Text>

          <Text className={styles.text}>{user.trainingType}</Text>
        </li>

        <li>
          <Text type='secondary' className={styles.description}>Средняя нагрузка:</Text>

          <Text className={styles.text}>{user.avgWeightInWeek} кг/нед</Text>
        </li>
      </ul>

      {currentUsesrStatus(user.status)}

      <Button onClick={onDeletePal}>Отменить тренировку</Button>
  </Modal>
 )
}
