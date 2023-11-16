import { Descriptions, Tag } from 'antd';
import type { DescriptionsProps } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { CalculateDuration } from "@/utils";

interface IProps {
  method: API.Steps.getMethodsByStepId;
  index: number;

  [key: string]: any;
}

const TagWarp = styled.div`
  display: grid;
  gap: 10px;
  overflow: auto;
`;

const RecordStepMethodInfo: React.FC<IProps> = (props) => {
  const { method, index } = props;
  // 步骤信息
  const descriptionInfo: DescriptionsProps[`items`] = [
    { key: '1', label: 'action', children: method.action, span: 3 },
    // 后台字段加错了 这个不要了
    // { key: '1-1', label: '试剂名称', children: method.reagent_name,span:3 },
    { key: '2', label: 'args', children: method.args.join(','), span: 3 },
    { key: '3', label: '开始时间', children: method.start_time },
    { key: '4', label: '结束时间', children: method.end_time, span: 2 },
    { key: '4-1', label: '运行时长', children: method.duration, span: 3 },
    {
      key: '5', label: '结果', children: method.result.map((item, index) => (
        <TagWarp key={index}>
          <Tag style={{ display: 'block' }}>{item}</Tag>
          <Tag style={{ display: 'block' }}>{item}</Tag>
        </TagWarp>
      )),
      span: 3
    },
  ];
  return (
    <>
      <Descriptions
        column={3}
        labelStyle={{ width: '120px', textAlign: 'center' }}
        size={'small'}
        items={descriptionInfo}
      />
    </>
  );
};

export default RecordStepMethodInfo;
