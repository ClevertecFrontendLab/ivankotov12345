import { Fragment, useEffect, useState } from 'react';
import { history } from '@redux/configure-store';
import { Paths } from '@typing/enums/paths';

import { HeaderProfile } from './header-profile/header-profile';
import { HeaderCalendar } from './header-calendar';
import { HeaderCommentaries } from './header-commentaries';
import { HeaderMain } from './header-main';
import { HeaderSettings } from './header-settings';

export const AppHeader: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState(history.location.pathname);

  useEffect(() => {
    const unlisten = history.listen((update) => {
      setCurrentLocation(update.location.pathname);
    });

    return () => {
      unlisten();
    }
  }, []);

  const currentHeader = () => {
    if(currentLocation === Paths.MAIN) {
      return <HeaderMain />;
    };
    if(currentLocation === Paths.CALENDAR) {
      return <HeaderCalendar />;
    };
    if(currentLocation === Paths.FEEDBACKS) {
      return <HeaderCommentaries />;
    };
    if(currentLocation === Paths.PROFILE) {
      return <HeaderProfile />;
    };
    if(currentLocation === Paths.SETTINGS) {
      return <HeaderSettings />
    }
    
    return null;
  }
  
  return (
    <Fragment>
      {currentHeader()}
    </Fragment>
  )
}