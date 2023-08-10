import AddSolid from '@/pages/Experiments/components/AddSolid';
import AddSolventStep from '@/pages/Experiments/components/AddSolventStep';
import Pipette from '@/pages/Experiments/components/Pipette';
import { MinusCircleOutlined } from '@ant-design/icons';
import { Card, Col, Form, Row, Select } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useModel } from 'umi';

interface IProps {
  name: number;
  restField: { fieldKey?: number | undefined };
  onDelete: () => void;
  index: number;

  [key: string]: any;
}

const ToolsBox = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
const CreateStepItem: React.FC<IProps> = (props) => {
  const { onDelete, restField, name } = props;
  const [step, setStep] = useState<string>();
  const { stepsMap } = useModel('useExperimentModel');
  return (
    <Card style={{ marginBottom: '20px' }}>
      <ToolsBox>
        <MinusCircleOutlined onClick={onDelete} />
      </ToolsBox>
      <Row gutter={10}>
        <Col span={10}>
          <Form.Item
            {...restField}
            name={[name, 'step_name']}
            label="步骤"
            rules={[{ required: true, message: '请选择步骤' }]}
          >
            <Select options={stepsMap} onChange={setStep} placeholder="请选择步骤" />
          </Form.Item>
        </Col>
      </Row>
      {/*添加溶剂*/}
      {step === 'add_solvent_step' && <AddSolventStep name={name} />}
      {/*加液*/}
      {step === 'pipette_step' && <Pipette name={name} />}
      {/*加固*/}
      {step === 'add_solid_step' && <AddSolid name={name} />}
    </Card>
  );
};
export default CreateStepItem;
