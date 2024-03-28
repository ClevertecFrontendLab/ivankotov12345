import { InfoCircleOutlined } from '@ant-design/icons';
import { Switch, Typography } from 'antd';
import classNames from 'classnames';

import styles from './setting-item.module.scss'

type SettingItemProps = {
  text: string,
  tooltipText: string,
  checked?: boolean,
  disabled?: boolean,
  onClick?: () => void,
}

const { Text } = Typography;

export const SettingsItem: React.FC<SettingItemProps> = ({
  text,
  tooltipText,
  disabled,
  checked,
  onClick
}) => (
  <li className={styles.wrapper}>
    <Text
      editable={{
        icon: <InfoCircleOutlined className={styles.logo} />,
        tooltip: tooltipText,
      }}
      className={disabled
        ? classNames(styles.text, styles.text_disabled)
        : styles.text}
    >
      {text}
    </Text>
    
    <Switch
      disabled={disabled}
      checked={checked}
      onClick={onClick}
    />
  </li>
)