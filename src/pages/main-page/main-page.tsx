import { CalendarTwoTone, HeartTwoTone, IdcardOutlined } from '@ant-design/icons';
import { ActionCard } from '@components/action-card';
import { ModalResults } from '@components/modal-results';
import { Typography } from 'antd';

import styles from './main-page.module.scss';

const cardsData = [
  {
    key: '1',
    cardLogo: <HeartTwoTone className={styles.iconFilled} />,
    cardName: 'Расписать тренировки',
    buttonText: 'Тренировки',
  },
  {
    key: '2',
    cardLogo: <CalendarTwoTone className={styles.iconFilled} />,
    cardName: 'Назначить календарь',
    buttonText: 'Календарь',
  },
  {
    key: '3',
    cardLogo: <IdcardOutlined className={styles.iconID} />,
    cardName: 'Заполнить профиль',
    buttonText: 'Профиль',
  },
];

const { Title } = Typography;


export const MainPage: React.FC = () => (
    <div className={styles.mainPageWrapper}>
      <ul className={styles.featuresList}>
        <li>
          С CleverFit ты сможешь:
          <ul>
            <li>— планировать свои тренировки на календаре, выбирая тип и уровень нагрузки</li>
            <li>— отслеживать свои достижения в разделе статистики, сравнивая свои результаты с нормами и рекордами</li>
            <li>— создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы о тренировках</li>
            <li>— выполнять расписанные тренировки для разных частей тела, следуя подробным инструкциям и советам профессиональных тренеров</li>
          </ul>
        </li>
      </ul>
      
      <div className={styles.mainTitleWrapper}>
        <Title level={4} className={styles.mainTitle}>
          CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!
        </Title>
      </div>

      <ul className={styles.cardsWrapper}>
      {
        cardsData.map(({key, cardLogo, cardName, buttonText}) => (
          <ActionCard 
            key={key}
            cardLogo={cardLogo}
            cardName={cardName}
            buttonText={buttonText}
            />
        ))
      }
      </ul>
      <ModalResults />
    </div>
  )
