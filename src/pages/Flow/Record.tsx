import { PageContainer } from '@ant-design/pro-components';
import { Badge, Button, Card, Collapse, message } from 'antd';
import type { CollapseProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "umi";
import PreAndNext from "@/pages/components/PreAndNext";
import { getFlowRecord } from "@/api/flows";
import FlowRecordItem from "@/pages/Flow/components/FlowRecordItem";
import { StepStatusMap } from "@/utils/dataMaps";
import RecordOverview from "@/pages/components/RecordOverview";
import CollectedDataWrap from "@/pages/components/CollectedDataWrap";

interface IProps {
  [key: string]: any;
}

const Record: React.FC<IProps> = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ collapseItems, setCollapseItems ] = useState<CollapseProps['items']>([]);
  const [ collectedData, setCollectedData ] = useState<API.DataAcquisitionsResults[]>([]);
  /**
   * 上一条 下一条
   * @param type
   */
  const handlePrevOrNext = async (type: string) => {
    const res = await getFlowRecord(id as string, {
      sibling: type
    });
    if (`${res.data.id}` === id) {
      message.warning(`已经是${type === 'prev' ? '第' : '最后'}一条了`);
    } else {
      navigate(`/exp/flow/${res.data.id}/record`, { replace: true });
    }
  };
  const getRecord = async () => {
    const res = await getFlowRecord(id as string);
    setCollapseItems(res.data.flow_data.map((item, index) => ({
      key: index,
      label: `${index + 1}. ${item.label} - ${item.action}`,
      // @ts-ignore
      extra: <Badge status={StepStatusMap[item.status]} text={item.status}/>,
      children: <FlowRecordItem recordItem={item}/>,
    })));
    setCollectedData(res.data.data_acquisitions_results)
  };
  useEffect(() => {
    getRecord();
  }, [ id ]);
  return (
    <PageContainer
      extra={[
        // <Button
        //   key={'recordOverview'}
        //   onClick={() => setIsShowOverView(true)}
        // >
        //   总览
        // </Button>,
        <Button
          key={'add'}
          onClick={() => navigate(`/exp/flow/${id}/detail`, { replace: true })}
        >
          查看详情
        </Button>,
      ]}>
      <Card>
        <PreAndNext
          onPreOrNext={handlePrevOrNext}
        />
        <CollectedDataWrap collected_data={collectedData}/>
        <Collapse
          accordion
          defaultActiveKey={[ '0' ]}
          items={collapseItems}
        />
      </Card>

      {/*<RecordOverview*/}
      {/*  isShow={isShowOverView}*/}
      {/*  onClose={() => setIsShowOverView(false)}*/}
      {/*  data={steps.map(({step_description}) => step_description)}*/}
      {/*/>*/}
    </PageContainer>
  );
};

export default Record;
