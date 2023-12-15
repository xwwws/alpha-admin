import React from 'react';
import { Col, Form, Input, Row, Select, Switch } from "antd";
import { IForm } from "@/pages/typings";
import { useModel } from "@@/exports";

interface IProps {
  name: number;

  [key: string]: any;
}

const formRules: IForm.IFormRules = {
  tip_area_name: [ { required: true, message: '请选择托盘区域' } ],
  coordinates: [
    { required: true, message: '请输入坐标' },
    { pattern: /^\d+$/, message: '坐标输入错误' },
    { max: 10, message: '坐标长度过长' },
  ],
  height: [
    { required: true, message: '请输入高度' },
    { pattern: /^\d+(.\d+)?$/, message: '输入错误' },
    { max: 10, message: '高度过高' },
  ],
};
const CreateFlowPickTip: React.FC<IProps> = (props) => {
  const { name } = props;
  const { areas } = useModel('useExperimentModel');

  return (
    <>
      <Row gutter={10}>
        <Col span={12}>
          <Form.Item
            name={[ name, 'tip_area_name' ]}
            label="托盘区域"
            rules={formRules.tip_area_name}
          >
            <Select options={areas}/>
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item
            name={[ name, 'tip_area_x' ]}
            label="x"
            rules={formRules.coordinates}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item
            name={[ name, 'tip_area_y' ]}
            label="y"
            rules={formRules.coordinates}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item
            name={[ name, 'tip_area_z' ]}
            label="z"
            rules={formRules.coordinates}
          >
            <Input />
          </Form.Item>
        </Col>

        {/*  第三行*/}

        <Col span={12}>
          <Form.Item
            name={[ name, 'tip_length' ]}
            label="枪头长度"
            rules={formRules.height}
          >
            <Input addonAfter="mm"/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={[ name, 'drop_pre' ]}
            label="是否卸下"
            rules={formRules.drop_pre}
          >
            <Switch />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default CreateFlowPickTip;
