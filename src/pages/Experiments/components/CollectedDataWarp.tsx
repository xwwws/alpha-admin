import React, { useEffect, useState } from 'react';
import { readCSV } from "@/utils/fileRead";
import type { Icsv } from "@/utils/fileRead";
import CollectedData from "@/pages/Experiments/components/CollectedData";
import styled from 'styled-components';
import { Button, Card, Empty } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import CollectedDetails from "@/pages/Experiments/components/CollectedDetails";

interface IProps {
  collected_data: API.DataAcquisitionsResults[];

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
  console.log(collected_data);
  const [ collectedDataList, setCollectedDataList ] = useState<Icsv[]>([]);
  useEffect(() => {
    const getCollectedData = async () => {
      if (!collected_data) return false;
      // 拿到所有图表的数据
      const collectedData = await Promise.all(collected_data.map(async (item) => {
        const result  = await readCSV(item.file_url)
        return {
          ...result,
          name: [item.label]
        }
      }));
      setCollectedDataList(collectedData);
    };
    getCollectedData();
  }, [ collected_data ]);

  const openUrl = (file_url: string) => {
    const url = `${location.origin}/api/static/acquisitions/${file_url}`;
    window.open(url, '_blank');
  };
  return (
    <CollectedDataWarpStyle>
      <div className="title">数据采集信息</div>
      {collectedDataList.length > 0 && collectedDataList.map((item, index) => {
        return <Card hoverable key={index}>
          <div className="downloadWarp">
            <Button icon={<DownloadOutlined/>} onClick={() => openUrl(collected_data[index].file_url)}>下载</Button>
          </div>
          <CollectedData data={item}/>
          {collected_data[index] && <CollectedDetails data={collected_data[index]}/>}
        </Card>;
      })}
      {
        collectedDataList.length === 0 && <>
          <Empty description={'暂无数据'}/>
        </>
      }
    </CollectedDataWarpStyle>
  );
};

export default CollectedDataWarp;
