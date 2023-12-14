import React from 'react';
import { Col, Form, Input, Row, Select } from "antd";
import { IForm } from "@/pages/typings";
import { useModel } from "@@/exports";

interface IProps {
  name: number;

  [key: string]: any;
}

const formRules: IForm.IFormRules = {
  seconds: [
    { required: true, message: '请输入等待时间' },
    { pattern: /^\d+(.\d+)?$/, message: '输入错误' },
    { max: 6, message: '等待时间过长' },
  ]
};
const CreateFlowSleep: React.FC<IProps> = (props) => {
  const { name } = props;
  return (
    <>
      <Row gutter={10}>
        <Col span={12}>
          <Form.Item name={[ name, 'seconds' ]} label="等待" rules={formRules.seconds}>
            <Input addonAfter="秒" />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
    ;
};

export default CreateFlowSleep;
