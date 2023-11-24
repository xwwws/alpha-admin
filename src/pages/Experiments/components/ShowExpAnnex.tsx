import { Button, Modal, Tooltip } from 'antd';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { formatColumns } from "@/utils/componentSettingUtils";
import { UploadOutlined } from "@ant-design/icons";
import UpdateExpAnnex, { IUpdateExpAnnexRef } from "@/pages/Experiments/components/UpdateExpAnnex";

interface IProps {
  attachments: Experiments.ExpInfoAttachments[];

  [key: string]: any;
}

export interface IShowExpAnnexRef {
  show: () => void;
}

const ShowExpAnnex: React.FC<IProps> = (props, ref: any) => {
  const { attachments } = props;
  const [ isShow, setIsShow ] = useState<boolean>(false);
  const UpdateExpAnnexRef = useRef<IUpdateExpAnnexRef>(null)
  const onCancel = () => {
    setIsShow(false);
  };

  const columns = formatColumns<Experiments.ExpInfoAttachments>([
    { title: '附件id', dataIndex: 'id', key: 'id' },
    { title: '源文件名', dataIndex: 'filename', key: 'filename' },
    { title: '文件名', dataIndex: 'name', key: 'name' },
    {
      title: '文件地址',
      width: '200px',
      render: (text, record) =>
        <a
          target={'_blank'}
          type={"link"}
          href={`${location.origin}/api/static/${record.file_url}`}
        >
          {record.file_url}
        </a>

    },
    { title: '创建时间', dataIndex: 'created_at', key: 'created_at', width: 150 },
    { title: '更新时间', dataIndex: 'updated_at', key: 'updated_at', width: 150 },
    { title: '实验id', dataIndex: 'expt_id', key: 'expt_id' },
    { title: '实验', dataIndex: 'expt_name', key: 'expt_name' },
    { title: '步骤id', dataIndex: 'step_id', key: 'step_id' },
    { title: '步骤', dataIndex: 'step_name', key: 'step_name' },
    { title: '备注', dataIndex: 'description', key: 'description' },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 120,
      render: (text, record, action) => [
        <Tooltip key={"info"} placement="top" title="重新上传">
          <Button
            type={'link'}
            icon={<UploadOutlined/>}
            onClick={() => UpdateExpAnnexRef.current?.show(record)}
          />
        </Tooltip>
      ]
    },
  ]);
  /**
   * 暴露给父组件方法
   */
  const show = () => setIsShow(true);
  useImperativeHandle(ref, () => ({ show }));

  return (
    <>

      <Modal
        title={'附件'}
        open={isShow}
        onCancel={onCancel}
        footer={null}
        width={`80%`}
      >
        <ProTable
          search={false}
          options={false}
          pagination={false}
          dataSource={attachments}
          columns={columns}
          scroll={{ x: columns.length * 100 }}
        />
        <UpdateExpAnnex
          ref={UpdateExpAnnexRef}
        />
      </Modal>
    </>
  );
};

// @ts-ignore
export default forwardRef(ShowExpAnnex);
