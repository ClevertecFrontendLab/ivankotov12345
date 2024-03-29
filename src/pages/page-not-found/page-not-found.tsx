import { push } from 'redux-first-history';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { Paths } from '@typing/enums/paths';
import { Button, Layout, Result } from 'antd';

import styles from './page-not-found.module.scss'

export const PageNotFound: React.FC = () => {
  const dispatch = useAppDispatch();

  const onClick = () => dispatch(push(Paths.MAIN))

  return (
    <Layout className={styles.wrapper}>
      <Result
        status='404'
        title='Такой страницы нет'
        subTitle='Извините, страница не найдена, возможно, она была удалена или перемещена.'
        extra={
          <Button
            type='primary'
            size='large'
            className={styles.button}
            onClick={onClick}
          >
            На главную
          </Button>
        }
      />
    </Layout>
)
}
