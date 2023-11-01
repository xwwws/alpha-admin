import React from 'react';
import { Modal } from "antd";
import CollectedDataWarp from "@/pages/Experiments/components/CollectedDataWarp";

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
        <CollectedDataWarp collected_data={collected_data}/>
      </Modal>
    </>
  );
};

export default StepHisChart;
