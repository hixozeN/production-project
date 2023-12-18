import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Logo } from 'shared/ui/Logo/Logo';
import DiscordIcon from 'shared/assets/icons/discord.svg';
import YoutubeIcon from 'shared/assets/icons/youtube.svg';
import Crown from 'shared/assets/icons/crown.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import cls from './Footer.module.scss';

interface FooterProps {
  className?: string;
}

export const Footer: FC<FooterProps> = ({ className }) => {
  const { t } = useTranslation('footer');

  return (
    <footer className={classNames(cls.Footer, {}, [className])}>
      <Crown className={cls.crownBackground} />
      <div className={cls.wrapper}>
        <Logo theme="footer" />
        <nav>
          <ul className={cls.list}>
            <li className={cls.item}>
              <h2 className={cls.title}>{t('Рейтинг')}</h2>
              <ul className={classNames(cls.list, {}, [cls.inner])}>
                <li className={classNames(cls.item, {}, [cls.inner])}>
                  <AppLink
                    theme={AppLinkTheme.PRIMARY}
                    to="/"
                    className={cls.link}
                  >
                    {t('Лучшие команды')}
                  </AppLink>
                </li>
                <li className={classNames(cls.item, {}, [cls.inner])}>
                  <AppLink
                    theme={AppLinkTheme.PRIMARY}
                    to="/"
                    className={cls.link}
                  >
                    {t('Рейтинг игроков')}
                  </AppLink>
                </li>
              </ul>
            </li>
            <li className={cls.item}>
              <h2 className={cls.title}>{t('Турниры')}</h2>
              <ul className={classNames(cls.list, {}, [cls.inner])}>
                <li className={classNames(cls.item, {}, [cls.inner])}>
                  <AppLink
                    theme={AppLinkTheme.PRIMARY}
                    to="/"
                    className={cls.link}
                  >
                    {t('Текущие')}
                  </AppLink>
                </li>
                <li className={classNames(cls.item, {}, [cls.inner])}>
                  <AppLink
                    theme={AppLinkTheme.PRIMARY}
                    to="/"
                    className={cls.link}
                  >
                    {t('Все')}
                  </AppLink>
                </li>
              </ul>
            </li>
            <li className={cls.item}>
              <h2 className={cls.title}>{t('О площадке')}</h2>
              <ul className={classNames(cls.list, {}, [cls.inner])}>
                <li className={classNames(cls.item, {}, [cls.inner])}>
                  <AppLink
                    theme={AppLinkTheme.PRIMARY}
                    to="/"
                    className={cls.link}
                  >
                    {t('Как играть')}
                  </AppLink>
                </li>
                <li className={classNames(cls.item, {}, [cls.inner])}>
                  <AppLink
                    theme={AppLinkTheme.PRIMARY}
                    to="/"
                    className={cls.link}
                  >
                    {t('Поддержка')}
                  </AppLink>
                </li>
                <li>
                  <AppLink
                    to="/"
                    theme={AppLinkTheme.PRIMARY}
                    className={cls.link}
                  >
                    {t('Пользовательское соглашение')}
                  </AppLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <div className={cls.socials}>
          <AppLink to="/" theme={AppLinkTheme.PRIMARY}>
            <DiscordIcon />
          </AppLink>
          <AppLink to="/" theme={AppLinkTheme.PRIMARY}>
            <YoutubeIcon />
          </AppLink>
        </div>
      </div>
      <p
        className={classNames(cls.copyright, {}, [cls.darkText])}
      >
        {t('Все права защищены. 2023')}
      </p>
    </footer>
  );
};