import React from 'react';
import { Col, Form, Input, Row, Select } from "antd";
import { IForm } from "@/pages/typings";
import { useModel } from "@@/exports";

interface IProps {
  name: number;

  [key: string]: any;
}

const formRules: IForm.IFormRules = {
  node_index: [{ required: true, message: '请选择节点' }],
};
const CreateFlowWrite: React.FC<IProps> = (props) => {
  const { name } = props;
  const { nodeIds } = useModel('useExperimentModel');

  return (
    <>
      <Row gutter={10}>
        <Col span={12}>
          <Form.Item name={[ name, 'node_index' ]} label="节点id" rules={formRules.node_index}>
            <Select
              allowClear
              options={nodeIds}
              placeholder="请选择节点"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={[ name, 'node_index' ]} label="值" rules={[ { required: true, message: '请输入内容' } ]}>
            <Input
              style={{ width: `150px` }}
              placeholder={'请输入内容'}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
    ;
};

export default CreateFlowWrite;
