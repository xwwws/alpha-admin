import { IForm } from '@/pages/typings';
import { useModel } from '@@/exports';
import { Col, Form, Input, Row, Select } from 'antd';
import React from 'react';

interface IProps {
  name: string | number;
  reagent: API.ReagentsInfo | undefined;

  [key: string]: any;
}

const Mix3: React.FC<IProps> = (props) => {
  const { areas } = useModel('useExperimentModel');

  const { name } = props;
  const formRules: IForm.IFormRules = {
    src_area_name: [{ required: true, message: '请选择托盘区域' }],
    dst_area_name: [{ required: true, message: '请选择托盘区域' }],
    coordinates: [
      { required: true, message: '请输入坐标' },
      { pattern: /^\d+$/, message: '坐标输入错误' },
      { max: 10, message: '坐标长度过长' },
    ],
    time: [
      { required: true, message: '请输入时间' },
      { pattern: /^\d+(.\d+)?$/, message: '输入错误' },
      { max: 10, message: '输入有误' },
    ],
  };

  return (
    <>
      <Row gutter={10}>
        <Col span={12}>
          <Form.Item
            name={[name, 'dst_area_name']}
            label="目标区域"
            rules={formRules.dst_area_name}
          >
            <Select options={areas} />
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
          <Form.Item name={[name, 'time']} label="时间" rules={formRules.time}>
            <Input addonAfter="s" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
export default Mix3;
