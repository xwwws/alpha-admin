import React, { useEffect, useState } from 'react';
import { Badge, Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import CollectedDataWarp from "@/pages/Experiments/components/CollectedDataWarp";
import { experimentStatesMap, IExpState } from "@/utils/dataMaps";

interface IProps {
  detail: Flows.Detail;

  [key: string]: any;
}

const FlowDetail: React.FC<IProps> = (props) => {
  const { detail } = props;
  const [ status, setStatus ] = useState<IExpState>();
  useEffect(() => {
    setStatus(experimentStatesMap.find(item => item.value === detail.status))
  }, [detail])
  const descriptionItems: DescriptionsProps[`items`] = [
    { key: '0', label: '名称', children: detail.name },
    {
      key: '1', label: '状态', children: <>

        <Badge
          status={status?.status.toLocaleLowerCase() as 'success'}
          text={status?.label}
        />
      </>
    },
    { key: '2', label: '所属项目', children: detail.project_name },
    { key: '3', label: '项目id', children: detail.project_id },
    { key: '4', label: '用户', children: detail.user_username },
    { key: '5', label: '用户id', children: detail.user_id },
    { key: '6', label: '描述', children: detail.description, span: 2 },
    {
      key: '7',
      label: '采集数据',
      children: (
        <div>
          {detail?.data_acquisitions?.map((item, index) => (
            <p key={index}>nodeid: {item.nodeid} interval: {item.interval}</p>
          ))}
        </div>
      ),
      span: 2,
    },
  ];
  return (
    <>
      <Descriptions
        bordered
        column={2}
        labelStyle={{ width: '180px', textAlign: 'center' }}
        size={'small'}
        items={descriptionItems}
      />
    </>
  );
};

export default FlowDetail;
