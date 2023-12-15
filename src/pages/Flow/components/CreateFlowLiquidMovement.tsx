import React from 'react';
import { Col, Form, Input, Row, Select } from "antd";
import { IForm } from "@/pages/typings";
import { useModel } from "@@/exports";

interface IProps {
  name: number;

  [key: string]: any;
}

const formRules: IForm.IFormRules = {
  src_area_name: [{ required: true, message: '请选择托盘区域' }],
  dst_area_name: [{ required: true, message: '请选择托盘区域' }],
  coordinates: [
    { required: true, message: '请输入坐标' },
    { pattern: /^\d+$/, message: '坐标输入错误' },
    { max: 10, message: '坐标长度过长' },
  ],
  height: [
    { required: true, message: '请输入数字' },
    { pattern: /^\d+$/, message: '请输入数字' }
  ],
};
const CreateFlowLiquidMovement: React.FC<IProps> = (props) => {
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
            labelCol={{span:9}}
            name={[ name, 'tip_length' ]}
            label="枪头长度"
            rules={formRules.height}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            labelCol={{span:9}}
            name={[ name, 'total' ]}
            label="移液总量"
            rules={formRules.height}
          >
            <Input addonAfter="ml" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name={[ name, 'take_once' ]}
            labelCol={{span:12}}
            label="单次吸液量"
            rules={formRules.height}
          >
            <Input addonAfter="ml" />
          </Form.Item>
        </Col>

        {/*  第四行*/}

        <Col span={8}>
          <Form.Item
            labelCol={{span:12}}
            name={[ name, 'spit_once' ]}
            label="单次吐液量"
            rules={formRules.height}
          >
            <Input addonAfter="ml" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            labelCol={{span:12}}
            name={[ name, 'interval' ]}
            label="吐液间隔时长"
            rules={formRules.height}
          >
            <Input addonAfter="s" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            labelCol={{span:12}}
            name={[ name, 'speed' ]}
            label="吸液吐液速度"
            rules={formRules.height}
          >
            <Input addonAfter="s" />
          </Form.Item>
        </Col>

      </Row>
    </>
  );
};

export default CreateFlowLiquidMovement;
