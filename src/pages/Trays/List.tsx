import { getAreasMap } from '@/api/public';
import { deletePosition, getAreasPositionsByAreaType, getAreasTypes } from '@/api/trays';
import AddPosition from '@/pages/Trays/components/AddPosition';
import BindReagentToPosition from '@/pages/Trays/components/BindReagentToPosition';
import TraysArea from '@/pages/Trays/components/TraysArea';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Tabs, message } from 'antd';
import React, { useEffect, useState } from 'react';

interface IProps {
  [key: string]: any;
}

const List: React.FC<IProps> = (props) => {
  const [ areaTypes, setAreaTypes ] = useState<any[]>([]);
  const [ caches, setCaches ] = useState<any[]>([]);
  const [ trayLoading, setTrayLoading ] = useState<boolean>(false);
  const [ trays, setTrays ] = useState<API.Trays.positions[]>([]);
  const [ isShowBindModal, setIsShowBindModal ] = useState<boolean>(false);
  const [ isShowAddModal, setIsShowAddModal ] = useState<boolean>(false);
  const [ trayPositionInfo, setTrayPositionInfo ] = useState<{
    id: number | string;
    reagent_name: string | number | undefined;
    quantity?: string | number | undefined;
    reagent_id?: string | number | undefined;
  }>({
    id: '',
    reagent_name: '',
    quantity: '',
    reagent_id: '',
  });
  const [ activeCache, setActiveCache ] = useState<string>('');
  const [ messageApi, contextHolder ] = message.useMessage();

  const handleCacheChange = async (key: string) => {
    setActiveCache(key);
    if (key) {
      setTrayLoading(trayLoading);
      const res = await getAreasPositionsByAreaType(key);
      setTrays(res.data);
      setTrayLoading(false);
    }
  };
  const handleTabsChange = async (key: string): Promise<void> => {
    if (key) {
      const res = await getAreasMap(key);
      handleCacheChange(res.data[0]?.name);
      setCaches(res.data);
    }
  };
  useEffect(() => {
    // 查询工位列表
    (async () => {
      const res = await getAreasTypes();
      handleTabsChange(res.data[0]?.value);
      setAreaTypes(res.data);
    })();
  }, []);

  const handleBindReagent = (item: API.Trays.positions) => {
    setTrayPositionInfo({
      id: item.id,
      reagent_name: item.reagent_name,
      quantity: item.quantity,
      reagent_id: item.reagent_id,
    });
    setIsShowBindModal(true);
  };

  const handleDeleteReagent = async (item: API.Trays.positions) => {
    await deletePosition(item.id);
    await handleCacheChange(activeCache);
    messageApi.success('已删除');
  };

  const addSuccess = () => {
    setIsShowAddModal(false);
    handleCacheChange(activeCache);
  };

  const bindSuccess = () => {
    setIsShowBindModal(false);
    handleCacheChange(activeCache);
  };
  return (
    <PageContainer
      tabList={areaTypes.map((item, index) => ({
        tab: item.label,
        key: item.value,
        active: index === 0,
        closable: false,
      }))}
      tabProps={{
        type: 'editable-card',
        hideAdd: true,
        onChange: handleTabsChange,
      }}
      extra={[
        <Button
          key={'add'}
          icon={<PlusOutlined/>}
          type={'primary'}
          onClick={() => setIsShowAddModal(true)}
        >
          添加工位
        </Button>,
      ]}
    >
      <Card>
        <Tabs
          tabPosition={'left'}
          items={caches.map((item) => {
            return {
              label: item.label,
              key: item.name,
              children: (
                <div>
                  <TraysArea
                    loading={trayLoading}
                    key={item.name}
                    trays={trays}
                    bindReagent={handleBindReagent}
                    deleteReagent={handleDeleteReagent}
                  />
                </div>
              ),
            };
          })}
          onChange={handleCacheChange}
        ></Tabs>
        {/*给工位绑定试剂*/}
        <BindReagentToPosition
          isOpen={isShowBindModal}
          close={() => setIsShowBindModal(false)}
          trayPositionInfo={trayPositionInfo}
          success={bindSuccess}
        />
        {/*添加工位*/}
        <AddPosition
          isOpen={isShowAddModal}
          close={() => setIsShowAddModal(false)}
          areaTypes={areaTypes}
          success={addSuccess}
        />
      </Card>
      {contextHolder}
    </PageContainer>
  );
};

export default List;
