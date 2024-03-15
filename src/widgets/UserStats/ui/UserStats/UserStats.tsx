import React, {
  memo, useCallback, useMemo,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  fetchLestaUserDataById,
  getUserRatingStats,
  getUserSessionDelta,
  getUserSessionStats,
  getUserStats,
} from 'entities/Lesta/index';
import { getUserData } from 'entities/User/model/selectors/getUserData/getUserData';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { LOCAL_STORAGE_LESTA } from 'shared/consts/localstorage';
import { getStatsList } from 'widgets/UserStats/lib/getStatsList';
import { UserStatsList } from '../UserStatsList/UserStatsList';
import cls from './UserStats.module.scss';

interface IUserStatsProps {
  className?: string;
  tab?: number;
  id?: number;
}

export const UserStats = memo(({
  className, tab, id,
}: IUserStatsProps) => {
  const { t } = useTranslation();
  const currentUser = useSelector(getUserData);
  const dispatch = useAppDispatch();

  // NEW STORE
  const ratingData = useSelector(getUserRatingStats);
  const userStatistic = useSelector(getUserStats);
  const userSessionStats = useSelector(getUserSessionStats);
  const userSessionDelta = useSelector(getUserSessionDelta);

  const generalStatItems = useMemo(
    () => getStatsList(userStatistic, userSessionDelta),
    [userStatistic, userSessionDelta],
  );
  const ratingStatItems2 = useMemo(() => getStatsList(ratingData), [ratingData]);
  const sessionStatItems = useMemo(() => getStatsList(userSessionStats), [userSessionStats]);

  const handleUpdateSession = useCallback((shouldUpdateSession: boolean) => {
    const lestaAccessToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LESTA.TOKEN));
    dispatch(fetchLestaUserDataById(
      { id, shouldRefreshSession: shouldUpdateSession, lestaAccessToken },
    ));
  }, [dispatch, id]);

  return (
    <section
      className={classNames(cls.userStatsSection, {}, [className])}
    >
      {
        tab === 0 && <UserStatsList data={generalStatItems} />
      }
      {
        tab === 1 && <UserStatsList data={sessionStatItems} />
      }
      {
        tab === 2 && <UserStatsList data={ratingStatItems2} />
      }
      {
        currentUser?.lestaData?.account_id === id
        && (
        <Button
          className={cls.btnUpdateSession}
          size="size_m"
          onClick={() => handleUpdateSession(true)}
        >
          {t('Новая сессия')}
        </Button>
        )
      }
    </section>
  );
});
