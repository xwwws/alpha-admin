import { MinusCircleOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { Card, Col, Form, Input, Row, Select, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useModel } from 'umi';

interface IProps {
  form: FormInstance<any>;
  name: number;
  restField: { fieldKey?: number | undefined };
  onDelete: () => void;
  index: number;

  [key: string]: any;
}

interface IStepRemarksInfo {
  name: string,
  label: string,
  showReagent: boolean,
}

const prerequisite = [ '>', '<', '=', '≠' ];

const ToolsBox = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
const CreateMethodItem: React.FC<IProps> = (props) => {
  const { onDelete, restField, name, form } = props;
  const [ method, setMethod ] = useState<string>('');
  const { methods, nodeIds } = useModel('useExperimentModel');
  const handleMethodChange = async (val: string) => {
    form.setFieldValue([ 'flow_data', name ], { action: val });
    setMethod(val);
  };

  const step_name = Form.useWatch([ 'flow_data', name, 'action' ], form);
  useEffect(() => {
    step_name && setMethod(step_name);
  }, [ step_name ]);
  return (
    <Card style={{ marginBottom: '20px' }}>
      <ToolsBox>
        <MinusCircleOutlined onClick={onDelete}/>
      </ToolsBox>
      <Row gutter={10}>
        <Col span={10}>
          <Form.Item
            {...restField}
            name={[ name, 'action' ]}
            label="指令"
            rules={[ { required: true, message: '请选择指令' } ]}
          >
            <Select
              options={methods}
              placeholder="请选择指令"
              onChange={handleMethodChange}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={10}>
        {/*row - 2*/}
        <Col span={4} style={{ textAlign: "center" }}>
          先决条件
        </Col>

        <Col span={6}>
          <Form.Item
            {...restField}
            name={[ name, 'prerequisite_nodeid' ]}
          >
            <Select
              allowClear
              options={nodeIds}
              placeholder="请选择节点"
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            {...restField}
            name={[ name, 'prerequisite_operator' ]}
          >
            <Select
              allowClear
              options={prerequisite.map((item) => ({ label: item, value: item }))}
              placeholder="请选择条件"
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            {...restField}
            name={[ name, 'prerequisite_value' ]}
          >
            <Input allowClear/>
          </Form.Item>
        </Col>
      </Row>

      {/*以下都是选择指令之后展示的内容*/}


    </Card>
  );
};
export default CreateMethodItem;
