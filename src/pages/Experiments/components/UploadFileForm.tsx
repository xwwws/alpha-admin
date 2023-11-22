import React, { useImperativeHandle, useState, forwardRef, useCallback } from 'react';
import { Button, Form, Input, Modal, Upload } from "antd";
import type { UploadFile } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { IForm } from "@/pages/typings";
import { uploadExpAnnex } from "@/api/experiments";

interface IProps {
  [key: string]: any;
}

export interface IRef {
  show: () => void;
}

const UploadFileForm: React.FC<IProps> = (props, ref: any) => {
  const {} = props;
  const [ form ] = Form.useForm();
  const [ isShow, setIsShow ] = useState<boolean>(false);
  const { id } = useParams();
  const [ fileList, setFileList ] = useState<UploadFile[]>();
  const show = () => {
    form.resetFields();
    setIsShow(true);
  };
  /**
   * 暴露给父组件方法
   */
  useImperativeHandle(ref, () => ({ show }));
  const onCancel = () => {
    setIsShow(false);
  };
  const formRules: IForm.IFormRules = {
    file: [ { required: true, message: '请选择文件' } ],
    description: [ { required: false, message: '输入描述信息' } ],
  };
  const finish = useCallback(async (data: any) => {
    const params: Experiments.UploadExpAnnex = {
      name: data.file.file.name,
      file: data.file.fileList[0].originFileObj,
      description: data.description || ''
    };
    const res = await uploadExpAnnex(id as string, params);
  }, [ id ]);
  return (
    <>
      <Modal
        title={'上传附件'}
        open={isShow}
        onCancel={onCancel}
        footer={null}
      >
        <Form form={form} onFinish={finish}>
          <Form.Item label="文件" name={'file'} rules={formRules.file}>
            <Upload
              beforeUpload={file => false}
              fileList={fileList}
              onChange={({fileList}) => setFileList(fileList)}
              maxCount={1}
            >
              <Button icon={<UploadOutlined/>}>选择文件</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="描述" name="description" rules={formRules.description}>
            <Input.TextArea rows={2}/>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 11 }}>
            <Button htmlType={'submit'} type={'primary'}>确定</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

// @ts-ignore
export default forwardRef(UploadFileForm);
