import { Footer } from 'antd/lib/layout/layout';
import { Button, Typography } from 'antd';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';

import styles from './app-footer.module.scss';

export const AppFooter: React.FC = () => {
  const { Text } = Typography;
  return (
    <Footer className={styles.footer}>
      <Button type='text' className={styles.reviewsButton}>Смотреть отзывы</Button>

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
