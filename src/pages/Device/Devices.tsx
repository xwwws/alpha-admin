import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { getDevices } from "@/api/devices";
import { getAreasMap } from "@/api/public";
import DeviceMethods from "@/pages/Device/components/DeviceMethods";
import DeviceCollectData from "@/pages/Device/components/DeviceCollectData";
import DeviceHis from "@/pages/Device/components/DeviceHis";
import styled from "styled-components";

interface IProps {
  [key: string]: any;
}

const CardContentStyle = styled.div`
  display: grid;
  gap: 10px;
`;

const Devices: React.FC<IProps> = (props) => {
  const [ devices, setDevices ] = useState<Devices.Devices[]>([]);
  const [ currentDevice, setCurrentDevice ] = useState<Devices.Devices>();
  const [ pageLoading, setPageLoading ] = useState<boolean>(true);
  /**
   * 初始化页面
   */
  useEffect(() => {
    (async () => {
      setPageLoading(true);
      const res = await getDevices();
      setDevices(res.data);
      setCurrentDevice(res.data[0]);
      setPageLoading(false);
    })();
  }, []);

  /**
   * 切换page tab
   * @param key
   */
  const handleTabsChange = async (key: string): Promise<void> => {
    setCurrentDevice(devices.find(item => item.browse_name === key));
  };
  return (
    <PageContainer

      loading={{
        spinning: pageLoading,
      }}
      tabList={devices.map((item, index) => ({
        tab: item.label,
        key: item.browse_name,
        active: index === 0,
        closable: false,
      }))}

      tabProps={{
        type: 'editable-card',
        hideAdd: true,
        onChange: handleTabsChange,
      }}
    >
      <Card>
        <CardContentStyle>

          <DeviceMethods
            deviceName={currentDevice?.label}
            methods={currentDevice?.method_list}
          />
          <DeviceCollectData
            dataNodes={currentDevice?.data_node_list}
          />
          {/* 指令调用历史*/}
          {
            currentDevice && <DeviceHis
              deviceName={currentDevice?.browse_name}
            />
          }

        </CardContentStyle>
      </Card>
    </PageContainer>
  );
};

export default Devices;
