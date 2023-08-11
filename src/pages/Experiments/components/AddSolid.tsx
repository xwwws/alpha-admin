import { IForm } from '@/pages/typings';
import { Col, Form, Input, Row, Select } from 'antd';
import React from 'react';

interface IProps {
  name: string | number;

  [key: string]: any;
}

const AddSolid: React.FC<IProps> = (props) => {
  const { name } = props;
  const formRules: IForm.IFormRules = {
    src_area_name: [{ required: true, message: '请选择托盘区域' }],
    dst_area_name: [{ required: true, message: '请选择托盘区域' }],
    coordinates: [
      { required: true, message: '请输入坐标' },
      { pattern: /^\d+$/, message: '坐标输入错误' },
      { max: 10, message: '坐标长度过长' },
    ],
    speed: [
      { required: true, message: '请输入速度' },
      { pattern: /^\d+$/, message: '速度应为数字' },
      { max: 10, message: '速度过快' },
    ],
    weight: [
      { required: true, message: '请输入比重' },
      { pattern: /^\d+$/, message: '比重应为数字' },
      { max: 10, message: '比重过高' },
    ],
    height: [
      { required: true, message: '请输入比高度' },
      { pattern: /^\d+$/, message: '高度应为数字' },
      { max: 10, message: '高度过高' },
    ],
    angel: [
      { required: true, message: '请输入比角度' },
      { pattern: /^\d+$/, message: '角度应为数字' },
      { max: 3, message: '角度不正确' },
    ],
    tolerance: [
      { required: true, message: '请输入精准度' },
      { pattern: /^\d+$/, message: '精准度应为数字' },
      { max: 10, message: '精准度有误' },
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
          <Form.Item name={[name, 'speed']} label="速度" rules={formRules.speed}>
            <Input addonAfter="cm" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name={[name, 'weight']} label="比重" rules={formRules.weight}>
            <Input addonAfter="cm" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name={[name, 'tolerance']} label="精确度" rules={formRules.tolerance}>
            <Input addonAfter="cm" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name={[name, 'height']} label="高度" rules={formRules.height}>
            <Input addonAfter="cm" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name={[name, 'angel']} label="角度" rules={formRules.angel}>
            <Input addonAfter="°" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
export default AddSolid;