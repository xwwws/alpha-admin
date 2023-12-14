import React from 'react';
import { Col, Form, Input, Row, Select } from "antd";
import { IForm } from "@/pages/typings";
import { useModel } from "@@/exports";

interface IProps {
  name: number;

  [key: string]: any;
}

const formRules: IForm.IFormRules = {
  src_area_name: [ { required: true, message: '请选择托盘区域' } ],
  dst_area_name: [ { required: true, message: '请选择目标区域' } ],
  coordinates: [
    { required: true, message: '请输入坐标' },
    { pattern: /^\d+$/, message: '坐标输入错误' },
    { max: 10, message: '坐标长度过长' },
  ],
  speed: [
    { required: true, message: '请输入速度' },
    { pattern: /^\d+(.\d+)?$/, message: '输入错误' },
    { max: 10, message: '速度过快' },
  ],
  weight: [
    { required: true, message: '请输入比重' },
    { pattern: /^\d+(.\d+)?$/, message: '输入错误' },
    { max: 10, message: '比重过高' },
  ],
  accuracy: [
    { required: true, message: '请输入精准度' },
    { pattern: /^\d+(.\d+)?$/, message: '输入错误' },
    { max: 10, message: '精准度有误' },
  ]
};
const CreateFlowAddSol: React.FC<IProps> = (props) => {
  const { name } = props;
  const { areas } = useModel('useExperimentModel');

  return (
    <>
      <Row gutter={10}>
        <Col span={12}>
          <Form.Item
            name={[ name, 'src_area_name' ]}
            label="托盘区域"
            rules={formRules.src_area_name}
          >
            <Select options={areas}/>
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item
            name={[ name, 'src_area_x' ]}
            label="x"
            rules={formRules.coordinates}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item
            name={[ name, 'src_area_y' ]}
            label="y"
            rules={formRules.coordinates}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item
            name={[ name, 'src_area_z' ]}
            label="z"
            rules={formRules.coordinates}
          >
            <Input />
          </Form.Item>
        </Col>

        {/*第二行*/}
        <Col span={12}>
          <Form.Item
            name={[ name, 'dst_area_name' ]}
            label="目标区域"
            rules={formRules.dst_area_name}
          >
            <Select options={areas}/>
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item
            name={[ name, 'dst_area_x' ]}
            label="x"
            rules={formRules.coordinates}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item
            name={[ name, 'dst_area_y' ]}
            label="y"
            rules={formRules.coordinates}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item
            name={[ name, 'dst_area_z' ]}
            label="z"
            rules={formRules.coordinates}
          >
            <Input />
          </Form.Item>
        </Col>

        {/*  第三行*/}

        <Col span={8}>
          <Form.Item
            name={[ name, 'speed' ]}
            label="速度"
            rules={formRules.speed}
          >
            <Input addonAfter="ul/s"/>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name={[ name, 'weight' ]}
            label="比重"
            rules={formRules.weight}
          >
            <Input addonAfter="mm"/>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            labelCol={{span:9}}
            name={[ name, 'accuracy' ]}
            label="精确度"
            rules={formRules.accuracy}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default CreateFlowAddSol;
