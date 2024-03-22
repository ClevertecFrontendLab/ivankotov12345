import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import styles from './sidemenu-switcher.module.scss'

type SidemenuSwitcherProps = {
  collapsed: boolean,
  setCollapsed: (collapsed: boolean) => void,
  testId: string,
}

export const SidemenuSwitcher = ({ collapsed, setCollapsed, testId }: SidemenuSwitcherProps) => {
  const toggleCollapse = () => setCollapsed(!collapsed);

  return (
    <button type='button' className={styles.sideMenuButton} onClick={toggleCollapse} data-test-id={testId}>
      {
      collapsed
        ? <MenuUnfoldOutlined />
        : <MenuFoldOutlined />
      }
    </button>
  )
}
