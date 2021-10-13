import {
  FIRST_TIME,
  LOCAL_STORAGE_TOUR_KEY,
  NO_THANKS,
  START_TOUR,
  TAKE_A_TOUR,
  WANNA_LEARN
} from '../../constants';

export const FIRST_TIME_MODAL = {
  title: FIRST_TIME,
  message: WANNA_LEARN,
  primaryButton: TAKE_A_TOUR,
  secondaryButton: NO_THANKS,
  onClickPrimary: () => {
    localStorage.setItem(LOCAL_STORAGE_TOUR_KEY, NO_THANKS);
    return START_TOUR;
  },
  onClickSecondary: () =>
    localStorage.setItem(LOCAL_STORAGE_TOUR_KEY, NO_THANKS)
};
