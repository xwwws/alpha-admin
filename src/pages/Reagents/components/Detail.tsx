import { Button, Descriptions, Modal } from 'antd';
import React from 'react';

interface IProps {
  isOpen: boolean;
  data: API.Reagents.List | undefined;
  close: () => void;
  [key: string]: any;
}

const Detail: React.FC<IProps> = (props) => {
  const { isOpen, close, data } = props;

  return (
    <>
      <Modal
        title={'试剂详情'}
        open={isOpen}
        footer={<Button onClick={close}>关闭</Button>}
        onCancel={close}
      >
        <Descriptions column={2}>
          <Descriptions.Item label={'药品名'} span={2}>
            {data?.name}
          </Descriptions.Item>
          <Descriptions.Item label={'序号'}>{data?.number}</Descriptions.Item>
          <Descriptions.Item label={'副序列'}>{data?.deputy_number}</Descriptions.Item>
          <Descriptions.Item label={'CAS号'}>{data?.cas}</Descriptions.Item>
          <Descriptions.Item label={'分子量'}>
            {data?.solute_molecular_weight} g/mol
          </Descriptions.Item>
          <Descriptions.Item label={'溶剂'}>{data?.solvent}</Descriptions.Item>
          <Descriptions.Item label={'密度'}>{data?.solution_density} g/ml</Descriptions.Item>
          <Descriptions.Item label={'浓度'}>{data?.concentration} mol/L</Descriptions.Item>
          <Descriptions.Item label={'沸点'}>{data?.boiling_point} ℃</Descriptions.Item>
          <Descriptions.Item label={'熔点'}>{data?.melting_point} ℃</Descriptions.Item>
          <Descriptions.Item label={'制备时间'}>{data?.preparation_time}</Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  );
};

export default Detail;
