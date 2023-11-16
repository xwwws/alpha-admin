import { Badge, Descriptions, DescriptionsProps, Divider } from 'antd';
import React from 'react';
import { StepStatusMap } from "@/utils/dataMaps";
import styled from "styled-components";

interface IProps {
  content: Steps.StepHisInfo;

  [key: string]: any;
}

const TagStyle = styled.span`
  font-size: 12px;
  word-break: break-all;
`;
const StepHisContent: React.FC<IProps> = (props) => {
  const { content } = props;


  const descriptionInfo: DescriptionsProps[`items`] = [
    { key: '1', label: '步骤id', children: content.id, span: 1 },
    { key: '2', label: '步骤名称', children: content.name, span: 1 },
    {
      key: '3',
      label: '状态',
      // @ts-ignore
      children: <Badge status={StepStatusMap[content.status]} text={content.status}/>,
      span: 1
    },
    { key: '4', label: '标签', children: content.label || '-', span: 1 },
    { key: '5', label: '实验id', children: content.expt_id || '-', span: 1 },
    { key: '6', label: '实验名称', children: content.expt_name || '-', span: 1 },
    { key: '7', label: '试剂id', children: content.reagent_id || '-', span: 1 },
    { key: '8', label: '试剂名称', children: content.reagent_name || '-', span: 1 },
    { key: '9', label: '持续时间', children: content.duration || '-', span: 1 },
    { key: '10', label: '开始时间', children: content.start_time || '-', span: 1 },
    { key: '11', label: '结束时间', children: content.end_time || '-', span: 1 },
    { key: '12', label: '计划量', children: content.quantity_plan || '-', span: 1 },
    { key: '13', label: '实际量', children: content.quantity_real || '-', span: 1 },
    {
      key: '14', label: '结果', children: <>
        {
          content.result.map((item, index) => (
            <>
              {index !== 0 && <Divider/>}
              <TagStyle key={index}>{index + 1}、{item}</TagStyle>
            </>
          ))
        }
      </>,
      span: 2
    },
  ];
  return (

    <Descriptions
      bordered
      column={3}
      labelStyle={{ width: '120px', textAlign: 'center' }}
      contentStyle={{ width: '120px' }}
      size={'small'}
      items={descriptionInfo}
    >
    </Descriptions>
  );
};

export default StepHisContent;
