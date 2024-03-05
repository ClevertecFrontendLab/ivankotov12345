import { Breadcrumb } from 'antd';

import { Paths } from '@typing/enums/paths';
import { Link } from 'react-router-dom';
import { history } from '@redux/configure-store';

const breadcrumbNamesMap: Record<string, string> = {
  [Paths.MAIN]: 'Главная',
  [Paths.FEEDBACKS]: 'Отзывы пользователей'
};

export const Breadcrumbs: React.FC = () => {
  const pathSnippets = history.location.pathname.split('/').filter(i => i);
  const isPathMain = history.location.pathname.includes(Paths.MAIN);
  return (
    <Breadcrumb>
      <Breadcrumb.Item key='Главная'>
        <Link to={Paths.MAIN}>Главная</Link>
      </Breadcrumb.Item>
      {!isPathMain &&
      pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
          <Breadcrumb.Item key={url}>
            <Link to={url}>{breadcrumbNamesMap[url]}</Link>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  )
}
