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
import DataAcquisition from "@/pages/components/DataAcquisition";

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

const StepMap: IStepRemarksInfo[] = [
  { name: 'add_solvent_step', label: '注射器加液', showReagent: true },
  { name: 'pipette_step', label: '移液', showReagent: true },
  { name: 'add_solid_step', label: '加固', showReagent: true },
  { name: 'do_peristaltic_step', label: '蠕动泵加液', showReagent: true },
  { name: 'heating_stir_step', label: '加热搅拌', showReagent: false },
  { name: 'do_mix3_planet_step', label: '行星搅拌', showReagent: false },
];

const ToolsBox = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
const CreateStepItem: React.FC<IProps> = (props) => {
  const { onDelete, restField, name, form } = props;
  const [ step, setStep ] = useState<string>();
  const [ reagents, setReagents ] = useState<API.ReagentsInfo[]>([]);
  const [ reagent, setReagent ] = useState<API.ReagentsInfo>();
  const [ reagentShow, setReagentShow ] = useState<boolean>(false);
  const { steps } = useModel('useExperimentModel');
  const getReagents = async (step: string) => {
    // 是否需要试剂
    const isNeedReagent: boolean = StepMap.find(({ name }) => name === step)?.showReagent as boolean;
    setReagentShow(isNeedReagent);
    if (isNeedReagent) {
      const res = await getReagentsByStep(step);
      setReagents(res.data);
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
      {/*行星搅拌*/}
      {step === 'do_mix3_planet_step' && <Mix3 reagent={reagent} name={name}/>}
      {step && (
        <DataAcquisition name={[ name, 'data_acquisitions' ]}/>
      )}
    </Card>
  );
};
export default CreateStepItem;
