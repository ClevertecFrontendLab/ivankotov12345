import { push } from 'redux-first-history';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { Paths } from '@typing/enums/paths';
import { Button, Typography } from 'antd';
import { Footer } from 'antd/lib/layout/layout';

import 'antd/dist/antd.css';
import styles from './app-footer.module.scss';

const { Text } = Typography;

export const AppFooter: React.FC = () => {
  const dispatch = useAppDispatch();

  const onShowFeedbacks = () => dispatch(push(Paths.FEEDBACKS));

  return (
    <Footer className={styles.footer}>
      <Button
        type='text'
        className={styles.reviewsButton}
        onClick={onShowFeedbacks}
        data-test-id='see-reviews'
      >
        Смотреть отзывы
      </Button>

      <div className={styles.footerCard}>
        <div className={styles.textWrapper}>
          <Text className={styles.textLink}>Скачать на телефон</Text>
          <Text type='secondary' className={styles.textRegular}>Доступно в PRO-тарифе</Text>
        </div>

        <div className={styles.buttonsWrapper}>
          <Button type='text' size='small' icon={<AndroidFilled />}>Android OS</Button>
          <Button type='text' size='small' icon={<AppleFilled />}>Apple iOS</Button>
        </div>
      </div>
    </Footer>
  )
}
