import { Breadcrumbs } from '@components/breadcrumbs';
import { Header } from 'antd/lib/layout/layout';

import styles from './header-commentaries.module.scss'

export const HeaderCommentaries: React.FC = () => (
  <Header className={styles.header}>
    <Breadcrumbs />
  </Header>
  )
