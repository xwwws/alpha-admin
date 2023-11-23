import React, { useImperativeHandle, useState, forwardRef, useCallback } from 'react';
import { Button, Form, Input, message, Modal, Upload } from "antd";
import type { UploadFile } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { IForm } from "@/pages/typings";
import { updateExpAnnex } from "@/api/attachments";

interface IProps {

  [key: string]: any;
}

export interface IUpdateExpAnnexRef {
  show: (data: Experiments.ExpInfoAttachments) => void;
}

const UpdateExpAnnex: React.FC<IProps> = (props, ref: any) => {
  const [ form ] = Form.useForm();
  const [ isShow, setIsShow ] = useState<boolean>(false);
  const [ attachmentId, setAttachmentId ] = useState<string | number>('');
  const [ fileList, setFileList ] = useState<UploadFile[]>();
  const show = (data: Experiments.ExpInfoAttachments) => {
    setAttachmentId(data.id)
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
    name: [ { required: true, message: '请输入名称' } ],
    file: [ { required: true, message: '请选择文件' } ],
    description: [ { required: false, message: '输入描述信息' } ],
  };
  const finish = useCallback(async (data: any) => {
    const params: Experiments.UploadExpAnnex = {
      name: data.name,
      file: data.file.fileList[0].originFileObj,
      description: data.description || ''
    };
    const res = await updateExpAnnex(attachmentId as string, params);
    message.success('上传成功')
    setIsShow(false)
  }, [ attachmentId ]);
  return (
    <>
      <Modal
        title={'上传附件'}
        open={isShow}
        onCancel={onCancel}
        footer={null}
      >
        <Form form={form} onFinish={finish}>
          <Form.Item label="名称" name="name" rules={formRules.name}>
            <Input/>
          </Form.Item>
          <Form.Item label="文件" name={'file'} rules={formRules.file}>
            <Upload
              beforeUpload={file => false}
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
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
export default forwardRef(UpdateExpAnnex);
