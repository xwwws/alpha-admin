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
const CreateFlowDistillC3: React.FC<IProps> = (props) => {
  const { name } = props;
  const { areas } = useModel('useExperimentModel');

  return (
    <>
      <Row gutter={10}>
        <Col span={8}>
          <Form.Item
            labelCol={{span:9}}
            name={[ name, 'area_name' ]}
            label="工位号"
            rules={formRules.area_name}
          >
            <Select options={areas}/>
          </Form.Item>
        </Col>



        <Col span={8}>
          <Form.Item
            labelCol={{span:9}}
            name={[ name, 'cooler_sy' ]}
            label="冷凝温度"
            rules={formRules.number}
          >
            <Input addonAfter={'℃'}/>
          </Form.Item>
        </Col>


        <Col span={8}>
          <Form.Item
            labelCol={{span:12}}
            name={[ name, 'heat_band_sy' ]}
            label="加热带温度"
            rules={formRules.number}
          >
            <Input addonAfter={'℃'}/>
          </Form.Item>
        </Col>

        {/*第二行*/}
        <Col span={8}>
          <Form.Item
            labelCol={{span:12}}
            name={[ name, 'stir_temp' ]}
            label="加热板温度"
            rules={formRules.number}
          >
            <Input addonAfter={'℃'}/>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{span:9}}
            name={[ name, 'ibp_temp' ]}
            label="初馏点"
            rules={formRules.number}
          >
            <Input addonAfter={'℃'}/>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{span:9}}
            name={[ name, 'fbp_temp' ]}
            label="终馏点"
            rules={formRules.number}
          >
            <Input addonAfter={'℃'}/>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{span:9}}
            name={[ name, 'stir_mode' ]}
            label="加热模式"
            rules={formRules.number}
          >
            <Input/>
          </Form.Item>
        </Col>

        {/*第3行*/}
        <Col span={8}>
          <Form.Item
            labelCol={{span:9}}
            name={[ name, 'stir_rpm' ]}
            label="搅拌速度"
            rules={formRules.number}
          >
            <Input/>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{span:9}}
            name={[ name, 'wash_time' ]}
            label="冲洗时长"
            rules={formRules.number}
          >
            <Input addonAfter={'s'}/>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{span:9}}
            name={[ name, 'clean_time' ]}
            label="排空时长"
            rules={formRules.number}
          >
            <Input addonAfter={'s'}/>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{span:9}}
            name={[ name, 'suply_time' ]}
            label="补给时长"
            rules={formRules.number}
          >
            <Input addonAfter={'s'}/>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{span:9}}
            name={[ name, 'total_time' ]}
            label="总时长"
            rules={formRules.number}
          >
            <Input addonAfter={'s'}/>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default CreateFlowDistillC3;
