import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, message, Modal, Tree } from 'antd';
import React, { useEffect, useState } from 'react';
import { getApiPermissions, getPermissionsByMenuId, savePermissions } from "@/api/menus";
import type { DataNode } from 'antd/es/tree';
import styled from "styled-components";
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useParams } from "react-router-dom";
import { isNumber } from "@/utils";
import { useNavigate } from "@@/exports";

interface IProps {
  [key: string]: any;
}

const FormWrap = styled.div`
  width: 600px;
  margin: 0 auto;

  .submitWrap {
    display: flex;
    justify-content: center;
  }
`;
const AssignPermissions: React.FC<IProps> = (props) => {
  const navigate = useNavigate();

  const [ messageApi, contextHolder ] = message.useMessage();
  const { id } = useParams();
  const [ allPermissions, setAllPermissions ] = useState<DataNode[]>([]);
  const [ checkedKeys, setCheckedKeys ] = useState<(string | number)[]>([]);

  /**
   * 将所有权限格式化为树形结构数据
   * @param data
   */
  const fmt2Tree = (data: Menus.AllPermission[]): DataNode[] => {
    return data.map((dataItem) => ({
      title: dataItem.tag,
      key: dataItem.tag,
      children: dataItem.api_permission_list.map(pmsItem => ({
        title: pmsItem.summary,
        key: pmsItem.id
      }))
    }));
  };
  /**
   * 获取所有的接口权限列表
   */
  const getPms = async () => {
    const res = await getApiPermissions();
    // 将所有权限格式化为树形结构数据
    setAllPermissions(fmt2Tree(res.data));
  };
  /**
   * 获取菜单所属权限
   */
  const getMenuPms = async (id: number | string) => {
    const res = await getPermissionsByMenuId(id);
    setCheckedKeys(res.data);
  };

  /**
   * 保存权限信息
   */
  const handleConfirm = async () => {
    Modal.confirm({
      title: '是否保存菜单权限配置?',
      icon: <ExclamationCircleFilled/>,
      onOk: async () => {
        await savePermissions(id as string, checkedKeys.filter(item => isNumber(item)));
        messageApi.success('权限配置成功');
        navigate('/system/menus/list');

      },
    });
  };
  /**
   * 点击复选框
   */
  const onCheck = (values: any) => {
    setCheckedKeys(values);
  };

  useEffect(() => {
    getPms();
    id && getMenuPms(id);
  }, [ id ]);
  return (
    <PageContainer>
      <Card>
        <FormWrap>
          <Tree

            checkable
            autoExpandParent={false}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            treeData={allPermissions}
          />
          <div className="submitWrap">
            <Button type="primary" onClick={handleConfirm}>确定</Button>
          </div>
        </FormWrap>
      </Card>
      {contextHolder}
    </PageContainer>
  );
};

export default AssignPermissions;
