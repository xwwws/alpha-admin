import React from 'react';
import { Col, Form, Input, Row, Select } from "antd";
import { IForm } from "@/pages/typings";
import { useModel } from "@@/exports";

interface IProps {
  name: number;

  [key: string]: any;
}

const formRules: IForm.IFormRules = {
  nodeid: [{ required: true, message: '请选择节点' }],
};
const CreateFlowRead: React.FC<IProps> = (props) => {
  const { name } = props;
  const { nodeIds } = useModel('useExperimentModel');

  return (
    <>
      <Row gutter={10}>
        <Col span={12}>
          <Form.Item name={[ name, 'nodeid' ]} label="节点id" rules={formRules.nodeid}>
            <Select
              allowClear
              options={nodeIds}
              placeholder="请选择节点"
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
    ;
};

export default CreateFlowRead