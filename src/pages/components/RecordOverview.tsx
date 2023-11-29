import React from 'react';
import { Badge, Descriptions, DescriptionsProps, Drawer } from "antd";
import { StepStatusMap } from "@/utils/dataMaps";

interface IProps {
  isShow: boolean;
  onClose: () => void;
  data: string[];

  [key: string]: any;
}

const RecordOverview: React.FC<IProps> = (props) => {
  const { onClose, isShow, data } = props;

  const items: DescriptionsProps[`items`] = data.map((item, index) => ({
    key: index,
    label: `${index + 1}`,
    children: item
  }));
  return (
    <>
      <Drawer
        placement={'right'}
        title={'记录总览'}
        onClose={onClose}
        open={isShow}
        width={800}
      >

        <Descriptions
          labelStyle={{ width: '50px', textAlign: 'center' }}
          size={'small'}
          column={1}
          bordered
          items={items}
        >
        </Descriptions>
      </Drawer>
    </>
  );
};

export default RecordOverview;
