import React from 'react';
import { Col, Form, Input, Row, Select } from "antd";
import { IForm } from "@/pages/typings";
import { useModel } from "@@/exports";

interface IProps {
  name: number;

  [key: string]: any;
}

const formRules: IForm.IFormRules = {
  area_name: [ { required: true, message: '请选择托盘区域' } ],
  number: [
    { required: true, message: '请输入数字' },
    { pattern: /^\d+(.\d+)?$/, message: '请输入数字' },
  ],
};
const CreateFlowMix3: React.FC<IProps> = (props) => {
  const { name } = props;
  const { areas } = useModel('useExperimentModel');

  return (
    <>
      <Row gutter={10}>
        <Col span={12}>
          <Form.Item
            name={[ name, 'area_name' ]}
            label="托盘区域"
            rules={formRules.area_name}
          >
            <Select options={areas}/>
          </Form.Item>
        </Col>



        <Col span={6}>
          <Form.Item
            labelCol={{span:9}}
            name={[ name, 'time' ]}
            label="时间"
            rules={formRules.number}
          >
            <Input addonAfter="s"/>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default CreateFlowMix3;
