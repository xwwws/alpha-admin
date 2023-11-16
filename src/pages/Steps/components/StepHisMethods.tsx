import React from 'react';
import { Modal } from "antd";

interface IProps {
  isShow: boolean;
  onCancel: () => void;

  [key: string]: any;
}

const StepHisMethods: React.FC<IProps> = (props) => {
  const {} = props;
  const { isShow, onCancel } = props;
  return (
    <>
      <Modal
        open={isShow}
        onCancel={onCancel}
        footer={null}
        width={'80%'}
      >
      </Modal>
    </>
  );
};

export default StepHisMethods;
