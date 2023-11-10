import { useTranslation } from 'react-i18next';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLoggedInStatus,
} from 'entities/User/model/selectors/getLoggedInStatus/getLoggedInStatus';
import { useCallback } from 'react';
import { userActions } from 'entities/User/index';
import { useLocation } from 'react-router-dom';
import cls from './Navbar.module.scss';

interface INavbarProps {
  className?: string;
}

export function Navbar({ className }: INavbarProps) {
  const { t } = useTranslation();
  const isLoggedIn = useSelector(getLoggedInStatus);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  if (isLoggedIn) {
    return (
      <div className={classNames(cls.Navbar, {}, [className])}>
        <div className={cls.links}>
          <AppLink
            theme={AppLinkTheme.PRIMARY}
            to={RoutePath.main}
          >
            {t('Главная')}
          </AppLink>

          <AppLink
            theme={AppLinkTheme.PRIMARY}
            to={RoutePath.about}
          >
            {t('О сайте')}
          </AppLink>

          <AppLink
            theme={AppLinkTheme.PRIMARY}
            to={RoutePath.main}
            onClick={onLogout}
          >
            {t('Выйти')}
          </AppLink>
        </div>
      </div>
    );
  }

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.links}>
        {
          pathname === RoutePath.auth
            ? (
              <AppLink
                theme={AppLinkTheme.PRIMARY}
                to={RoutePath.main}
              >
                {t('Главная')}
              </AppLink>
            )
            : (
              <AppLink
                theme={AppLinkTheme.PRIMARY}
                to={RoutePath.auth}
              >
                {t('Авторизация')}
              </AppLink>
            )
        }
      </div>
    </div>
  );
}
