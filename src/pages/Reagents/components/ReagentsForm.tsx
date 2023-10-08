import { createReagent, editReagent, getReagentDetail } from '@/api/reagents';
import { IForm } from '@/pages/typings';
import { formItemLayout } from '@/utils';
import { useLocation, useNavigate, useParams } from '@@/exports';

import { Button, DatePicker, Form, Input, message } from 'antd';
import dayjs from 'dayjs';
import React, { useLayoutEffect, useState } from 'react';

interface IProps {
  [key: string]: any;
}

const formRules: IForm.IFormRules = {
  number: [{ required: true, message: '请输入序号' }],
  deputy_number: [{ required: true, message: '请输入副序列' }],
  cas: [{ required: true, message: '请输入CAS号' }],
  name: [{ required: true, message: '请输入药品名' }],
  concentration: [{ required: true, message: '请输入浓度' }],
  melting_point: [{ required: true, message: '请输入熔点' }],
  boiling_point: [{ required: true, message: '请输入沸点' }],
  solution_density: [{ required: true, message: '请输入密度' }],
  solvent: [{ required: true, message: '请输入溶剂' }],
  solute_molecular_weight: [{ required: true, message: '请输入分子量' }],
};
const ReagentsForm: React.FC<IProps> = (props) => {
  const location = useLocation();
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  useLayoutEffect(() => {
    const { pathname } = location;
    setIsEdit(pathname.includes('/reagent/edit'));
    // 是否是修改试剂页面
    if (isEdit) {
      (async () => {
        const res = await getReagentDetail(params.id as string);
        form.setFieldsValue({
          ...res.data,
          preparation_time: dayjs(res.data.preparation_time),
        });
      })();
    }
  }, [location, params, isEdit]);
  const submit = async (val: API.Reagents.Create) => {
    val.preparation_time = dayjs(val.preparation_time).format('YYYY-MM-DDThh:mm:ss');
    setLoading(true);
    if (isEdit) {
      try {
        await editReagent(params.id as string, val);
        setLoading(false);
        messageApi.success('修改成功');
        navigate('/exp/reagent');
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        await createReagent(val);
        setLoading(false);
        messageApi.success('添加溶剂成功');
        navigate('/exp/reagent');
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <>
      {contextHolder}
      <Form
        {...formItemLayout}
        form={form}
        onFinish={submit}
        style={{ width: '700px', margin: '0 auto' }}
      >
        {params.id && (
          <Form.Item label={'id'}>
            <strong>{params.id}</strong>
          </Form.Item>
        )}
        <Form.Item label={'序号'} name={'number'} rules={formRules.number}>
          <Input></Input>
        </Form.Item>
        <Form.Item label={'副序列'} name={'deputy_number'} rules={formRules.deputy_number}>
          <Input></Input>
        </Form.Item>
        <Form.Item label={'CAS号'} name={'cas'} rules={formRules.cas}>
          <Input></Input>
        </Form.Item>
        <Form.Item label={'药品名'} name={'name'} rules={formRules.name}>
          <Input></Input>
        </Form.Item>
        <Form.Item label={'分子量'} name={'solute_molecular_weight'}>
          <Input addonAfter="g/mol"></Input>
        </Form.Item>
        <Form.Item label={'溶剂'} name={'solvent'} rules={formRules.solvent}>
          <Input></Input>
        </Form.Item>
        <Form.Item label={'密度'} name={'solution_density'} rules={formRules.solution_density}>
          <Input addonAfter="g/ml"></Input>
        </Form.Item>
        <Form.Item label={'浓度'} name={'concentration'} rules={formRules.concentration}>
          <Input addonAfter="mol/L"></Input>
        </Form.Item>
        <Form.Item label={'沸点'} name={'boiling_point'} rules={formRules.boiling_point}>
          <Input addonAfter="℃"></Input>
        </Form.Item>
        <Form.Item label={'熔点'} name={'melting_point'} rules={formRules.melting_point}>
          <Input addonAfter="℃"></Input>
        </Form.Item>
        <Form.Item label={'制备时间'} name={'preparation_time'} rules={formRules.preparation_time}>
          <DatePicker showTime />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6 }}>
          <Button type="primary" htmlType={'submit'} loading={loading}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ReagentsForm;
