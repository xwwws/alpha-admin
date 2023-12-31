import { MinusCircleOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { Card, Col, Form, Input, Row, Select, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useModel } from 'umi';
import CreateFlowRead from "@/pages/Flow/components/CreateFlowRead";
import CreateFlowWrite from "@/pages/Flow/components/CreateFlowWrite";
import CreateFlowSleep from "@/pages/Flow/components/CreateFlowSleep";
import CreateFlowMove from "@/pages/Flow/components/CreateFlowMove";
import CreateFlowAddSol from "@/pages/Flow/components/CreateFlowAddSol";
import CreateFlowUnCap from "@/pages/Flow/components/CreateFlowUnCap";
import CreateFlowReCap from "@/pages/Flow/components/CreateFlowReCap";
import CreateFlowChangeTool from "@/pages/Flow/components/CreateFlowChangeTool";
import CreateFlowPickTip from "@/pages/Flow/components/CreateFlowPickTip";
import CreateFlowLiquidMovement from "@/pages/Flow/components/CreateFlowLiquidMovement";
import CreateFlowMvSolid from "@/pages/Flow/components/CreateFlowMvSolid";
import CreateFlowAddSolid from "@/pages/Flow/components/CreateFlowAddSolid";
import CreateFlowPeristaltic from "@/pages/Flow/components/CreateFlowPeristaltic";
import CreateFlowMix3 from "@/pages/Flow/components/CreateFlowMix3";
import CreateFlowDistillC3 from "@/pages/Flow/components/CreateFlowDistillC3";

interface IProps {
  form: FormInstance<any>;
  name: number;
  restField: { fieldKey?: number | undefined };
  onDelete: () => void;
  index: number;

  [key: string]: any;
}

interface IStepRemarksInfo {
  name: string,
  label: string,
  showReagent: boolean,
}

const prerequisite = [ '>', '<', '==', '<>' ];

const ToolsBox = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
const CreateMethodItem: React.FC<IProps> = (props) => {
  const { onDelete, restField, name, form } = props;
  const [ method, setMethod ] = useState<string>('');
  const { methods, nodeIds } = useModel('useExperimentModel');
  const handleMethodChange = async (val: string) => {
    form.setFieldValue([ 'flow_data', name ], { action: val });
    console.log(val);
    setMethod(val);
  };

  const step_name = Form.useWatch([ 'flow_data', name, 'action' ], form);
  useEffect(() => {
    step_name && setMethod(step_name);
  }, [ step_name ]);
  return (
    <Card style={{ marginBottom: '20px' }}>
      <ToolsBox>
        <MinusCircleOutlined onClick={onDelete}/>
      </ToolsBox>
      <Row gutter={10}>
        <Col span={10}>
          <Form.Item
            {...restField}
            name={[ name, 'action' ]}
            label="指令"
            rules={[ { required: true, message: '请选择指令' } ]}
          >
            <Select
              options={methods}
              placeholder="请选择指令"
              onChange={handleMethodChange}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={10}>
        {/*row - 2*/}
        <Col span={4} style={{ textAlign: "center" }}>
          先决条件
        </Col>

        <Col span={6}>
          <Form.Item
            {...restField}
            name={[ name, 'prerequisite_nodeid' ]}
          >
            <Select
              allowClear
              options={nodeIds}
              placeholder="请选择节点"
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            {...restField}
            name={[ name, 'prerequisite_operator' ]}
          >
            <Select
              allowClear
              options={prerequisite.map((item) => ({ label: item, value: item }))}
              placeholder="请选择条件"
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            {...restField}
            name={[ name, 'prerequisite_value' ]}
          >
            <Input allowClear/>
          </Form.Item>
        </Col>
      </Row>

      {/*以下都是选择指令之后展示的内容*/}
      {/*读值*/}
      {method === 'read' && <CreateFlowRead name={name}/>}

      {/*写值*/}
      {method === 'write' && <CreateFlowWrite name={name}/>}

      {/*等待*/}
      {method === 'sleep' && <CreateFlowSleep name={name}/>}

      {/*移动*/}
      {method === 'methdMvThing' && <CreateFlowMove name={name}/>}

      {/*加液*/}
      {method === 'methdAddSol' && <CreateFlowAddSol name={name}/>}

      {/*开瓶器位开盖*/}
      {method === 'methdUncap' && <CreateFlowUnCap name={name}/>}

      {/*开瓶器位加盖*/}
      {method === 'methdRecap' && <CreateFlowReCap name={name}/>}

      {/*换工具*/}
      {method === 'methdChngTool' && <CreateFlowChangeTool name={name}/>}

      {/*抬起枪头*/}
      {method === 'methdPickTip' && <CreateFlowPickTip name={name}/>}

      {/*开瓶器工位吸液，滴加位吐液  /  移液*/}
      {method === 'methdTrnsLiquid' && <CreateFlowLiquidMovement name={name}/>}

      {/*移固体料仓*/}
      {method === 'methdMvSolid' && <CreateFlowMvSolid name={name}/>}

      {/*加固启动*/}
      {method === 'methdDoAddSolid' && <CreateFlowAddSolid name={name}/>}

      {/*蠕动泵加液*/}
      {method === 'methdDoPeristaltic' && <CreateFlowPeristaltic name={name}/>}

      {/*搅拌3*/}
      {method === 'methdDoMix3' && <CreateFlowMix3 name={name}/>}

      {/*废液蒸馏*/}
      {method === 'methdDoDistillC3' && <CreateFlowDistillC3 name={name}/>}

      {/*以下不展示*/}
      {
        0 > 1 && <>
          {/*行星搅拌*/}
          {method === 'methdDoMix3Planet' && <>行星搅拌</>}

          {/*安装搅拌桨*/}
          {method === 'methdGetPaddle' && <>安装搅拌桨</>}

          {/*卸载搅拌桨*/}
          {method === 'methdPutPaddle' && <>卸载搅拌桨</>}

          {/*"搅拌2*/}
          {method === 'methdDoMix2' && <>"搅拌2</>}

          {/*设置冷凝管温度*/}
          {method === 'methdSetCooler' && <>设置冷凝管温度</>}

          {/*"设置加热带温度*/}
          {method === 'methdSetHeatBand' && <>"设置加热带温度</>}

          {/*"设置磁力搅拌加热器*/}
          {method === 'methdSetStir' && <>"设置磁力搅拌加热器</>}
        </>
      }


    </Card>
  );
};
export default CreateMethodItem;