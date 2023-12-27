import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Checkbox, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from "umi";
import { getRoleList } from "@/api/roles";
import { getUserRoles, setUserRoles } from "@/api/users";
import styled from "styled-components";
import { useNavigate } from "@@/exports";

interface IProps {
  [key: string]: any;
}

const FormWrap = styled.div`
  width: 800px;
  margin: 0 auto;

  .submitWrap {
    display: flex;
    justify-content: center;
  }
`;
const AllocationRoles: React.FC<IProps> = (props) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [ allRoles, setAllRoles ] = useState<Roles.List[]>([]);
  const [ rolesResult, setRolesResult ] = useState<any[]>([]);
  const getAllRoles = async () => {
    const res = await getRoleList({
      page_size: 9999,
      page: 1
    });
    setAllRoles(res.data.data);
  };
  const getCurUserRoles = async (userId: number | string) => {
    const res = await getUserRoles(userId);
    setRolesResult(res.data.map(({ id }) => id));
  };
  useEffect(() => {
    getAllRoles();
    userId && getCurUserRoles(userId);
    // getRoleList
  }, [ userId ]);
  const handleConfirm = async () => {
    userId && await setUserRoles(userId, {
      role_ids: rolesResult
    });
    message.success('角色分配完成');
    navigate('/system/users/list');
  };
  return (
    <PageContainer>
      <Card>
        <FormWrap>

          <Checkbox.Group
            options={allRoles.map(role => ({
              value: role.id,
              label: role.name
            }))}
            value={rolesResult}
            onChange={(value) => setRolesResult(value)}
          />
          <div className="submitWrap">
            <Button type="primary" onClick={handleConfirm}>确定</Button>

          </div>
        </FormWrap>

      </Card>
    </PageContainer>
  );
};

export default AllocationRoles;
