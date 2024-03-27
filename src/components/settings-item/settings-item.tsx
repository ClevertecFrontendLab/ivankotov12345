import { InfoCircleOutlined } from '@ant-design/icons';
import { Switch, Typography } from 'antd';

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
  <li>
    <Text
      editable={{
        icon: <InfoCircleOutlined />,
        tooltip: tooltipText,
      }}
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