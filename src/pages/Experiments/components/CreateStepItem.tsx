import { getReagentsByStep } from '@/api/steps';
import AddSolid from '@/pages/Experiments/components/AddSolid';
import AddSolventStep from '@/pages/Experiments/components/AddSolventStep';
import Mix3 from '@/pages/Experiments/components/Mix3';
import Peristaltic from '@/pages/Experiments/components/Peristaltic';
import Pipette from '@/pages/Experiments/components/Pipette';
import { CenterHolderStyle } from '@/utils';
import { MinusCircleOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { Card, Col, Form, Input, Row, Select, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useModel } from 'umi';
import { ITypes } from "@/pages/typings";
import DataAcquisition from "@/pages/Experiments/components/DataAcquisition";

interface IProps {
  form: FormInstance<any>;
  name: number;
  restField: { fieldKey?: number | undefined };
  onDelete: () => void;
  index: number;
  nodes: ITypes.EnumType[];

  [key: string]: any;
}

const ToolsBox = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
const CreateStepItem: React.FC<IProps> = (props) => {
  const { onDelete, restField, name, form, nodes } = props;
  const [ step, setStep ] = useState<string>();
  const [ reagents, setReagents ] = useState<API.ReagentsInfo[]>([]);
  const [ reagent, setReagent ] = useState<API.ReagentsInfo>();
  const [ reagentShow, setReagentShow ] = useState<boolean>(false);
  const { steps } = useModel('useExperimentModel');
  const getReagents = async (step: string) => {
    // heating_stir_step  不用试剂id
    if (step !== 'heating_stir_step') {
      setReagentShow(true);
      const res = await getReagentsByStep(step);
      setReagents(res.data);
    } else {
      setReagentShow(false);
    }
  };
  const handleStepChange = async (val: string) => {
    setStep('loading');
    // 这个步骤中的所有表单
    form.setFieldValue([ 'steps_data', name ], { step_name: val });
    await getReagents(val);
    setStep(val);
  };

  const step_name = Form.useWatch([ 'steps_data', name, 'step_name' ], form);
  useEffect(() => {
    step_name && setStep(step_name);
    step_name && getReagents(step_name);
  }, [ step_name ]);
  const handleReagentChange = (val: string | number) => {
    const curReagent = reagents.find((item) => item.reagent_id === val);
    form.setFieldValue([ 'steps_data', name, 'src_area_name' ], curReagent?.area_name);
    form.setFieldValue([ 'steps_data', name, 'src_area_x' ], `${curReagent?.x}`);
    form.setFieldValue([ 'steps_data', name, 'src_area_y' ], `${curReagent?.y}`);
    form.setFieldValue([ 'steps_data', name, 'src_area_z' ], `${curReagent?.z}`);
    setReagent(reagents.find((item) => item.reagent_id === val));
  };
  return (
    <Card style={{ marginBottom: '20px' }}>
      <ToolsBox>
        <MinusCircleOutlined onClick={onDelete}/>
      </ToolsBox>
      <Row gutter={10}>
        <Col span={10}>
          <Form.Item
            {...restField}
            name={[ name, 'step_name' ]}
            label="步骤"
            rules={[ { required: true, message: '请选择步骤' } ]}
          >
            <Select options={steps} onChange={handleStepChange} placeholder="请选择步骤"/>
          </Form.Item>
        </Col>
      </Row>


      {/*以下都是选择步骤之后展示的内容*/}


      <Row gutter={10}>
        {reagentShow && (
          <Col span={10}>
            <Form.Item
              {...restField}
              name={[ name, 'reagent_id' ]}
              label="试剂"
              rules={[ { required: true, message: '请选择试剂' } ]}
            >
              <Select
                options={reagents.map((item) => ({
                  label: item.reagent_name,
                  value: item.reagent_id,
                }))}
                onChange={handleReagentChange}
                placeholder="请选择试剂"
                allowClear
              />
            </Form.Item>
          </Col>
        )}
      </Row>


      {step === 'loading' && (
        <CenterHolderStyle>
          <Spin/>
        </CenterHolderStyle>
      )}

      {/*添加溶剂*/}
      {step === 'add_solvent_step' && <AddSolventStep reagent={reagent} name={name}/>}
      {/*加液*/}
      {step === 'pipette_step' && <Pipette reagent={reagent} name={name}/>}
      {/*加固*/}
      {step === 'add_solid_step' && <AddSolid reagent={reagent} name={name}/>}
      {/*蠕动泵加液*/}
      {step === 'do_peristaltic_step' && <Peristaltic reagent={reagent} name={name}/>}
      {/*加热搅拌*/}
      {step === 'heating_stir_step' && <Mix3 reagent={reagent} name={name}/>}
      {step && (
        <DataAcquisition
          name={[ name, 'data_acquisitions' ]}
          nodes={nodes}
        />
      )}
    </Card>
  );
};
export default CreateStepItem;
