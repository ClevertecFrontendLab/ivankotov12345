import { push } from 'redux-first-history';
import { CloseOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { tariffSelect } from '@redux/slices/tariff';
import { clearUser, userSelect } from '@redux/slices/user';
import { Paths } from '@typing/enums/paths';
import { Modal, Result } from 'antd';

import styles from './tariff-result-modal.module.scss';

export const TariffResultModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector(userSelect);
  const { isSuccess } = useAppSelector(tariffSelect);

  const afterClose = () => {
    localStorage.removeItem('token');
    sessionStorage.clear();
    dispatch(push(Paths.AUTH));
    dispatch(clearUser());
  }

  return (
    <Modal
      open={isSuccess}
      footer={null}
      centered={true}
      closable={true}
      closeIcon={<CloseOutlined />}
      onCancel={afterClose}
      maskStyle={{
        backgroundColor: 'rgba(121, 156, 213, 0.5)',
        backdropFilter: 'blur(5px)'
      }}
      className={styles.resultModal}
    >
      <Result
        status='success'
        title='Чек для оплаты у вас на почте'
        subTitle={`Мы отправили инструкцию для оплаты вам на e-mail ${userData?.email}. После подтверждения оплаты войдите в приложение заново.`}
        extra='Не пришло письмо? Проверьте папку Спам.'
      />
    </Modal>
  )
}
