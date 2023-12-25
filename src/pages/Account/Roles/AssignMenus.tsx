import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, message, Modal, Tree } from 'antd';
import React, { useEffect, useState } from 'react';
import type { DataNode } from 'antd/es/tree';
import styled from "styled-components";
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useParams } from "react-router-dom";
import { useNavigate } from "@@/exports";
import { getMenuList } from "@/api/menus";
import { getRoleMenusById, saveRoleMenus } from "@/api/roles";

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

interface ITreeData {
  title: string,
  key: string,
  children?: ITreeData[]
}

const format2Tree = (tree: Menus.List[]): ITreeData[] => {
  return tree.map((item) => {
    const result: ITreeData = {
      title: item.name,
      key: `${item.id}`
    };
    if (item.children && item.children.length > 0) {
      result.children = format2Tree(item.children);
    }
    return result;
  });
};

const AssignMenus: React.FC<IProps> = (props) => {
  const navigate = useNavigate();

  const [ messageApi, contextHolder ] = message.useMessage();
  const { roleId } = useParams();
  const [ allPermissions, setAllPermissions ] = useState<DataNode[]>([]);
  const [ checkedKeys, setCheckedKeys ] = useState<(string | number)[]>([]);


  /**
   * 获取所有菜单
   */
  const getMenuPms = async () => {
    const res = await getMenuList();
    setAllPermissions(format2Tree(res.data));
  };

  /**
   * 获取当前角色菜单权限
   */
  const getRoleMenus = async (id: string | number) => {
    const res = await getRoleMenusById(id);
    setCheckedKeys(res.data.map(item => `${item}`))
  };

  /**
   * 保存菜单信息
   */
  const handleConfirm = async () => {
    Modal.confirm({
      title: '是否保存角色菜单配置?',
      icon: <ExclamationCircleFilled/>,
      onOk: async () => {
        console.log(roleId);
        if (roleId) {
          await saveRoleMenus(roleId, checkedKeys.map(item => Number(item)));
          messageApi.success('菜单配置成功');
          navigate('/account/roles/list');
        }
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
    getMenuPms();
    roleId && getRoleMenus(roleId);
  }, [ roleId ]);

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

export default AssignMenus;
