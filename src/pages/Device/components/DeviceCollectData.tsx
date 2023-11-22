import React, { useCallback, useEffect, useState } from 'react';
import DispatchEvent from "@/utils/DispatchEvent";
import useWebsocket, { IMsgGet, ISendMessage, SocketEventEnum } from "@/hooks/useWebsocket";
import { webSocketUrl } from "@/utils";
import { Descriptions } from 'antd';
import styled from 'styled-components';

interface IProps {
  dataNodes: Devices.dataNodeList[] | undefined;

  [key: string]: any;
}

interface ICollectData {
  current_time: string;
  server_time: string;
  custom_name: string;
  description: string;
  name: string;
  nodeid: number;
  label: string;
  value?: any;
  value_type: string;
}

const CollectDataStyle = styled.div`
  .collectDataTitle {
    font-weight: bold;
    font-size: 18px;
  }

  .CollectData {
    width: 400px;
    margin: 0 auto;
  }

`;

const DeviceCollectData: React.FC<IProps> = (props) => {
  const { dataNodes } = props;
  const { sendMessage, connect } = useWebsocket();
  const [ collectDataList, setCollectDataList ] = useState<ICollectData[]>([]);
  /**
   * 更新数据
   * @param resData
   */
  const updateData = (resData: IMsgGet) => {
    setCollectDataList((val) => {
      const curIndex = val.findIndex(item => item.label === resData.label);
      if (curIndex !== -1) {
        val[curIndex].value = resData.value;
        val[curIndex].custom_name = resData.custom_name;
      }
      return [...val];
    });
  };
  /**
   * 初始化页面
   */
  useEffect(() => {
    // 链接socket
    (async () => {
      // 连接socket
      let url = `ws://${location.host}/ws/sub`;
      // 本地环境连接从 config 环境变量配置
      if (REACT_APP_ENV === 'dev') {
        url = `${webSocketUrl}/ws/sub`;
      }
      await connect(url);
    })();
    // 订阅socket消息
    DispatchEvent.on(SocketEventEnum.MSG, updateData);
    // 取消订阅消息
    return () => {
      DispatchEvent.off(SocketEventEnum.MSG, updateData);
    };
  }, []);
  useEffect(() => {
    // 订阅消息的渲染数据结构
    setCollectDataList(dataNodes?.map(item => ({
      label: item.label,
    })) as ICollectData[]);
    sendMessage(dataNodes?.map(item => ({
      nodeid: item.nodeid,
      interval: 1
    })) as ISendMessage[]);
  }, [ dataNodes ]);
  return (
    <>
      <CollectDataStyle>
        <div className="collectDataTitle">
          采集数据信息
        </div>
        {
          collectDataList && collectDataList.length &&
          <Descriptions
            className={'CollectData'}
            size={'small'}
            labelStyle={{ width: '180px', textAlign: 'center' }}
            bordered
            column={1}
          >
            {collectDataList.map((item, index) => {
              return (
                <Descriptions.Item
                  key={index}
                  labelStyle={{ width: '180px', textAlign: 'center' }}
                  label={item.custom_name}
                >
                  {item.value}
                </Descriptions.Item>
              );
            })}
          </Descriptions>
        }
      </CollectDataStyle>
    </>
  );
};

export default DeviceCollectData;
