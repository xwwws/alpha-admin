import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Descriptions, Dropdown, Tag, message } from 'antd';
import type { MenuProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from "@@/exports";
import { getReactionVesselDetail, updateReactionVessel } from "@/api/reactionVessel";
import UpdateVesselPosition from "@/pages/ReactionVessel/components/UpdateVesselPosition";

interface IProps {
  [key: string]: any;
}

const Detail: React.FC<IProps> = (props) => {
  const params = useParams<{ id: string }>();
  const [ messageApi, contextHolder ] = message.useMessage();
  const [ detail, setDetail ] = useState<API.ReactionVessel.Detail>();
  const [ updateLoading, setUpdateLoading ] = useState<boolean>(false);
  const [ isShowModal, setIsShowModal ] = useState<boolean>(false);
  const [ isModalLoading, setIsModalLoading ] = useState<boolean>(false);
  const dropDownItems: MenuProps['items'] = [
    {
      label: '释放',
      key: 'in_use',
    },
    {
      label: '废弃',
      key: 'discarded',
    },
    {
      label: '更新绑定位置',
      key: 'bottle_area',
    },
  ];
  const dropDownClick: MenuProps['onClick'] = async ({ key }) => {
    switch (key) {
      case 'in_use':
        try {
          setUpdateLoading(true);
          await updateReactionVessel(params.id as string, {
            in_use: false
          });
          await getDetail(params.id as string);
          messageApi.success('容器已释放');
        } catch (e) {
        } finally {
          setUpdateLoading(false);
        }
        break;
      case 'discarded':
        try {
          setUpdateLoading(true);
          await updateReactionVessel(params.id as string, {
            discarded: true
          });
          await getDetail(params.id as string);
          messageApi.success('容器已废弃');
        } catch (e) {
        } finally {
          setUpdateLoading(false);
        }
        break;
      case 'bottle_area':
        setIsShowModal(true);
        break;
    }
  };
  const handleUpdatePosition = async (data: API.Coordinates) => {
    setIsModalLoading(true);
    try {
      await updateReactionVessel(params.id as string, { bottle_area: data });
    } catch (e) {
    } finally {
      await getDetail(params.id as string);
      setIsModalLoading(false);
      setIsShowModal(false)
      messageApi.success('反应器位置已更新')
    }
  };

  const getDetail = async (id: string) => {
    const res = await getReactionVesselDetail(id);
    setDetail(res.data);
  };
  useEffect(() => {
    getDetail(params.id as string);
  }, [ params ]);
  return (
    <PageContainer
      extra={[
        <Dropdown
          key="dropdown"
          trigger={[ 'click' ]}
          menu={{
            items: dropDownItems,
            onClick: dropDownClick
          }}
        >
          <Button
            key="btn"
            type={"primary"}
            onClick={(e) => e.preventDefault()}
            loading={updateLoading}
          >
            更新反应器
          </Button>
        </Dropdown>
      ]}
    >
      <Card>
        <Descriptions
          bordered
          title={`${detail?.vessel_name}`}
          column={3}
        >
          <Descriptions.Item label="id">{detail?.id}</Descriptions.Item>
          <Descriptions.Item label="label">{detail?.label}</Descriptions.Item>
          <Descriptions.Item label="序列号">{detail?.serial_number}</Descriptions.Item>
          <Descriptions.Item label="位置id">{detail?.area_position_id}</Descriptions.Item>
          <Descriptions.Item label="使用时长">{detail?.used_times}s</Descriptions.Item>
          <Descriptions.Item label="是否空闲">
            {detail?.in_use ? <Tag color="orange">繁忙</Tag> : <Tag color="success">空闲</Tag>}
          </Descriptions.Item>
          <Descriptions.Item label="是否可回收">
            {detail?.recyclable ? <Tag color="success">可回收</Tag> : <Tag color="default">不可回收</Tag>}
          </Descriptions.Item>
          <Descriptions.Item label="废弃时间">{detail?.discarded_at}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{detail?.created_at}</Descriptions.Item>
          <Descriptions.Item label="更新时间">{detail?.updated_at}</Descriptions.Item>
          <Descriptions.Item label="位置">
            <div>
              <p>name: {detail?.bottle_area?.area_name}</p>
              <p>x: {detail?.bottle_area?.x}</p>
              <p>y: {detail?.bottle_area?.y}</p>
              <p>z: {detail?.bottle_area?.z}</p>
            </div>
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <UpdateVesselPosition
        isLoading={isModalLoading}
        isOpen={isShowModal}
        data={detail?.bottle_area}
        close={() => setIsShowModal(false)}
        submit={handleUpdatePosition}
      />
      {contextHolder}
    </PageContainer>
  );
};

export default Detail;
