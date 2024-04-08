import { Fragment, useEffect, useState } from 'react';
import { history } from '@redux/configure-store';
import { Paths } from '@typing/enums/paths';

import { HeaderCalendar } from './header-calendar';
import { HeaderCommentaries } from './header-commentaries';
import { HeaderMain } from './header-main';
import { HeaderProfile } from './header-profile';
import { HeaderSettings } from './header-settings';
import { HeaderTrainings } from './header-trainings';

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
    };
    if(currentLocation === Paths.WORKOUTS) {
      return <HeaderTrainings />
    };
    
    return null;
  }
  
  return (
    <Fragment>
      {currentHeader()}
    </Fragment>
  )
}