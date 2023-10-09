import React, { useEffect, useState } from 'react';
import { readCSV } from "@/utils/fileRead";
import type { Icsv } from "@/utils/fileRead";
import CollectedData from "@/pages/Experiments/components/CollectedData";
import styled from 'styled-components';
import { Button, Card } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

interface IProps {
  collected_data: API.Experiments.DataAcquisitionsResults[];

  [key: string]: any;
}

const CollectedDataWarpStyle = styled.div`
  display: grid;
  gap: 20px;
  padding-top: 20px;

  .title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex: auto;
    color: rgba(0, 0, 0, 0.88);
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
  }
`;
const CollectedDataWarp: React.FC<IProps> = (props) => {
  const { collected_data } = props;
  const [ collectedDataList, setCollectedDataList ] = useState<Icsv[]>([]);
  useEffect(() => {
    const getCollectedData = async () => {
      if (!collected_data) return false;
      // 拿到所有图表的数据
      const collectedData = await Promise.all(collected_data.map(item => {
        return readCSV(item.file_url);
      }));
      setCollectedDataList(collectedData);
    };
    getCollectedData();
  }, [ collected_data ]);

  const openUrl = (file_url: string) => {
    const url = `${location.origin}/api/static/acquisitions/${file_url}`
    window.open(url, '_blank');
  };
  return (
    <CollectedDataWarpStyle>
      <div className="title">数据采集信息</div>
      {collectedDataList.map((item,index) => {
        return <Card hoverable key={index}>
          <div className="downloadWarp">
            <Button icon={<DownloadOutlined/>} onClick={() => openUrl(collected_data[index].file_url)}>下载</Button>
          </div>
          <CollectedData data={item}/>
        </Card>;
      })}
    </CollectedDataWarpStyle>
  );
};

export default CollectedDataWarp;
