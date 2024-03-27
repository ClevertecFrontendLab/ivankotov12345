import { CloseOutlined } from '@ant-design/icons';
import { SettingsTable } from '@components/settings-table';
import { Button, Drawer, Typography } from 'antd';

type SettingsSidebarProps = {
  isSidebarOpen: boolean,
  setIsSidebarOpen: (isSidebarOpen: boolean) => void
}

const { Title } = Typography;

export const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const onClose = () => setIsSidebarOpen(false);

  return (
    <Drawer
      open={isSidebarOpen}
      mask={false}
      closable={true}
      headerStyle={{ display: 'none' }}
    >
      <div>
        <Title level={5}>Сравнить тарифы</Title>
        <Button
          icon={<CloseOutlined />}
          onClick={onClose}
        />
      </div>
      <SettingsTable />

      <Button>
        Выбрать и оплатить
      </Button>
    </Drawer>
  )
}
