import React from 'react';
import { Col, Form, Input, Row, Select } from "antd";
import { IForm } from "@/pages/typings";
import { useModel } from "@@/exports";

interface IProps {
  name: number;

  [key: string]: any;
}

const formRules: IForm.IFormRules = {
  src_tool: [ { required: true, message: '请选择当前工具' } ],
  dst_tool: [ { required: true, message: '请选择目标工具' } ],
};
const CreateFlowChangeTool: React.FC<IProps> = (props) => {
  const { name } = props;
  const { areas } = useModel('useExperimentModel');

  return (
    <>
      <Row gutter={10}>
        <Col span={12}>
          <Form.Item
            name={[ name, 'src_tool' ]}
            label="当前工具"
            rules={formRules.src_tool}
          >
            <Select options={areas}/>
          </Form.Item>
        </Col>


        <Col span={12}>
          <Form.Item
            name={[ name, 'dst_tool' ]}
            label="目标工具"
            rules={formRules.dst_tool}
          >
            <Select options={areas}/>
          </Form.Item>
        </Col>

      </Row>
    </>
  );
};

export default CreateFlowChangeTool;
