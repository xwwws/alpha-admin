import { IForm } from '@/pages/typings';
import { Col, Form, Input, Row, Select } from 'antd';
import React from 'react';

interface IProps {
  name: string | number;

  [key: string]: any;
}

const Pipette: React.FC<IProps> = (props) => {
  const { name } = props;
  const formItemLayout = {
    labelCol: {
      span: 12,
    },
  };

  const formRules: IForm.IFormRules = {
    src_area_name: [{ required: true, message: '请选择托盘区域' }],
    dst_area_name: [{ required: true, message: '请选择托盘区域' }],
    coordinates: [
      { required: true, message: '请输入坐标' },
      { pattern: /^\d+$/, message: '坐标输入错误' },
      { max: 10, message: '坐标长度过长' },
    ],
    height: [
      { required: true, message: '请输入高度' },
      { pattern: /^\d+$/, message: '高度应为数字' },
      { max: 10, message: '高度过高' },
    ],
  };

  return (
    <>
      <Row gutter={10}>
        <Col span={12}>
          <Form.Item
            name={[name, 'src_area_name']}
            label="托盘区域"
            rules={formRules.src_area_name}
          >
            <Select options={[{ label: 'OP11', value: 'OP11' }]} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name={[name, 'src_area_x']} label="x" rules={formRules.coordinates}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name={[name, 'src_area_y']} label="y" rules={formRules.coordinates}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name={[name, 'src_area_z']} label="z" rules={formRules.coordinates}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={[name, 'dst_area_name']}
            label="目标托盘区域"
            rules={formRules.dst_area_name}
          >
            <Select options={[{ label: 'OP11', value: 'OP11' }]} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name={[name, 'dst_area_x']} label="x" rules={formRules.coordinates}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name={[name, 'dst_area_y']} label="y" rules={formRules.coordinates}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name={[name, 'dst_area_z']} label="z" rules={formRules.coordinates}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            {...formItemLayout}
            name={[name, 'tip_length']}
            label="枪头长度"
            rules={formRules.height}
          >
            <Input addonAfter="cm" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            {...formItemLayout}
            name={[name, 'height']}
            label="高度"
            rules={formRules.height}
          >
            <Input addonAfter="cm" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            {...formItemLayout}
            name={[name, 'total']}
            label="移液总量"
            rules={formRules.height}
          >
            <Input addonAfter="ml" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            {...formItemLayout}
            name={[name, 'take_once']}
            label="单次吸液量"
            rules={formRules.height}
          >
            <Input addonAfter="ml" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            {...formItemLayout}
            name={[name, 'spit_once']}
            label="单次吐液量"
            rules={formRules.height}
          >
            <Input addonAfter="ml" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            {...formItemLayout}
            name={[name, 'interval']}
            label="吐液间隔时长"
            rules={formRules.height}
          >
            <Input addonAfter="s" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            {...formItemLayout}
            name={[name, 'speed']}
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
export default Pipette;
