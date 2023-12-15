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
  coordinates: [
    { required: true, message: '请输入坐标' },
    { pattern: /^\d+$/, message: '坐标输入错误' },
    { max: 10, message: '坐标长度过长' },
  ],
  height: [
    { required: true, message: '请输入速度' },
    { pattern: /^\d+(.\d+)?$/, message: '输入错误' },
    { max: 10, message: '速度过快' },
  ]
};
const CreateFlowUnCap: React.FC<IProps> = (props) => {
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
            name={[ name, 'y' ]}
            label="y"
            rules={formRules.coordinates}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            labelCol={{span:9}}
            name={[ name, 'height' ]}
            label="高度"
            rules={formRules.height}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default CreateFlowUnCap;
