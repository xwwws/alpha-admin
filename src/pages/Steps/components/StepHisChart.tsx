import React from 'react';
import { Modal } from "antd";
import CollectedDataWrap from "@/pages/Experiments/components/CollectedDataWrap";

interface IProps {
  isShow: boolean;
  onCancel: () => void;
  collected_data: API.DataAcquisitionsResults[];

  [key: string]: any;
}

const StepHisChart: React.FC<IProps> = (props) => {
  const { isShow, onCancel,collected_data } = props;
  return (
    <>

      <Modal
        open={isShow}
        onCancel={onCancel}
        footer={null}
        width={'80%'}
      >
        <CollectedDataWrap collected_data={collected_data}/>
      </Modal>
    </>
  );
};

export default StepHisChart;
