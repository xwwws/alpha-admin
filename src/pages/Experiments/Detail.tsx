import { getExperimentDetailsById } from '@/api/experiments';
import RecordItem from '@/pages/Experiments/components/RecordItem';
import type { IExpState } from '@/utils/dataMaps';
import { experimentStatesMap } from '@/utils/dataMaps';
import { PageContainer } from '@ant-design/pro-components';
import type { DescriptionsProps } from 'antd';
import { Badge, Button, Card, Descriptions, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import CollectedDataWrap from "@/pages/components/CollectedDataWrap";
import { useNavigate } from "umi";
import PreAndNext from "@/pages/components/PreAndNext";
import { UploadOutlined } from "@ant-design/icons";
import UploadFileForm, { IRef } from "@/pages/Experiments/components/UploadExpFileForm";
import ShowExpAnnex, { IShowExpAnnexRef } from "@/pages/Experiments/components/ShowExpAnnex";

interface IProps {
  [key: string]: any;
}

const Detail: React.FC<IProps> = (props) => {
  const [ recordInfo, setRecordInfo ] = useState<Experiments.ExperimentDetailsRes>();
  const [ currentState, setCurrentState ] = useState<IExpState>();
  const { id } = useParams();
  const navigate = useNavigate();
  const UploadExpFileFormRef = useRef<IRef>(null);
  const ShowExpAnnexRef = useRef<IShowExpAnnexRef>(null);
  const getExpInfo = async () => {
    const res = await getExperimentDetailsById(id as string);
    setRecordInfo(res.data);
    setCurrentState(experimentStatesMap.find((item) => item.value === res.data.status));
  };
  useEffect(() => {
    getExpInfo();
  }, [ id ]);
  const handlePrevOrNext = async (type: string) => {
    const res = await getExperimentDetailsById(id as string, {
      sibling: type
    });
    if (`${res.data.id}` === id) {
      message.warning(`已经是${type === 'prev' ? '第' : '最后'}一条了`);
    } else {
      navigate(`/exp/experiment/${res.data.id}/detail`, { replace: true });
    }
  };
  const items: DescriptionsProps[`items`] = [
    {
      key: '0',
      label: '实验名称',
      children: recordInfo?.name,
    },
    {
      key: '1',
      label: '附件',
      children: <>
        <Button
          onClick={() => ShowExpAnnexRef.current?.show()}
        >
          查看附件
        </Button>
        <ShowExpAnnex
          attachments={recordInfo?.attachments}
          ref={ShowExpAnnexRef}
        />
      </>,
    },
    {
      key: '2',
      label: '实验id',
      children: recordInfo?.id,
    },
    {
      key: '3',
      label: '状态',
      children: (
        <Badge
          status={currentState?.status.toLocaleLowerCase() as 'success'}
          text={currentState?.label}
        />
      ),
    },
    {
      key: '4',
      label: '试剂瓶高度',
      children: recordInfo?.bottle_height,
      span: 2,
    },
    {
      key: '5',
      label: '试剂瓶名称',
      children: recordInfo?.bottle_area.name,
    },
    {
      key: '6',
      label: '试剂瓶位置',
      children: (
        <div>
          <p>x: {recordInfo?.bottle_area.x}</p>
          <p>y: {recordInfo?.bottle_area.y}</p>
          <p>z: {recordInfo?.bottle_area.z}</p>
        </div>
      ),
    },

    {
      key: '6-2',
      label: '回收工位',
      children: recordInfo?.recycle_area.name,
    },
    {
      key: '6-3',
      label: '回收瓶位置',
      children: (
        <div>
          <p>x: {recordInfo?.recycle_area.x}</p>
          <p>y: {recordInfo?.recycle_area.y}</p>
          <p>z: {recordInfo?.recycle_area.z}</p>
        </div>
      ),
    },
    {
      key: '6-1',
      label: '备注',
      children: recordInfo?.description,
      span: 2
    },
    {
      key: '7',
      label: '采集数据',
      children: (
        <div>
          {recordInfo?.data_acquisitions_results.map((item, index) => (
            <p key={index}>
              采集信息: {item.name} 间隔: {item.interval}
            </p>
          ))}
        </div>
      ),
      span: 2,
    },
  ];
  return (
    <PageContainer
      extra={[

        <Button
          icon={<UploadOutlined/>}
          key={'upload'}
          onClick={() => UploadExpFileFormRef.current?.show()}
        >
          上传附件
        </Button>,
        <Button
          key={'add'}
          onClick={() => navigate(`/exp/experiment/${id}/record`, { replace: true })}
        >
          实验记录
        </Button>,
      ]}
    >
      <Card>
        <PreAndNext
          onPreOrNext={handlePrevOrNext}
        />
        <Descriptions
          bordered
          column={2}
          labelStyle={{ width: '180px', textAlign: 'center' }}
          size={'small'}
          items={items}
        />
        {recordInfo?.steps_data.map((item, index) => (
          <RecordItem key={index} record={item}/>
        ))}


        {/*采集数据信息*/}
        <CollectedDataWrap
          collected_data={recordInfo?.data_acquisitions_results as API.DataAcquisitionsResults[]}
        />
      </Card>
      <UploadFileForm
        uploadSuccess={getExpInfo}
        ref={UploadExpFileFormRef}
      />
    </PageContainer>
  );
};
export default Detail;
