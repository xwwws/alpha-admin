import React, { useCallback, useEffect, useRef } from 'react';
import styled from "styled-components";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import type { ActionType } from "@ant-design/pro-components";
import { formatColumns } from "@/utils/componentSettingUtils";
import { Card, Tag } from "antd";
import dayjs from "dayjs";
import { getDeviceHis } from "@/api/devices";

interface IProps {
  deviceName: string;

  [key: string]: any;
}

const DeviceHisStyle = styled.div`
  .title {

  }
`;

const DeviceHis: React.FC<IProps> = (props) => {
  const { deviceName } = props;
  const tableRef = useRef<ActionType>();

  // table columns
  const columns: ProColumns<API.Methods.MethodHis>[] = formatColumns<API.Methods.MethodHis>([
    { title: 'ID', key: "id", dataIndex: 'id' },
    { title: '指令', key: "action", dataIndex: 'action' },
    { title: '指令名称', key: "label", dataIndex: 'label', width: '120px' },
    { title: '实验名称', key: "expt_name", dataIndex: 'expt_name' },
    {
      title: '开始时间',
      valueType: 'dateTimeRange',
      dataIndex: 'start_time',
      key: 'start_time',
      width: '180px',
      search: {
        transform: (value: any) => {
          return {
            start_time_before: value[0],
            start_time_after: value[1],
          };
        }
      },
      render: (text, record) => {
        return record.start_time;
      }
    },
    { title: '结束时间', dataIndex: 'end_time', key: 'end_time', width: '180px' },
    {
      title: 'args',
      key: 'args',
      dataIndex: 'args',
      render: (text, record) => (
        <>
          {
            record.args.map((item, index) => (
              <>
                <Tag color={'orange'} key={index}>{item}</Tag>
              </>
            ))
          }
        </>
      )
    },
    {
      title: 'result',
      key: 'result',
      dataIndex: 'result',
      render: (text, record) => (
        <>
          {
            record.result.map((item, index) => (
              <>
                <Tag color={'processing'} key={index}>{item}</Tag>
              </>
            ))
          }
        </>
      )
    },
  ]);

  // 获取table数据
  const requestMethod = useCallback(async (params: any) => {
    const paramsData: Devices.DeviceHisReq = {
      page: params.current,
      page_size: params.pageSize,
    };
    if (params.start_time_before && params.start_time_after) {
      paramsData.start_time_before = dayjs(params.start_time_before).format('YYYY-MM-DD HH:mm:ss');
      paramsData.start_time_after = dayjs(params.start_time_after).format('YYYY-MM-DD HH:mm:ss');
    }
    const res = await getDeviceHis(deviceName, paramsData);
    return { data: res.data.data, success: true, total: res.data.total };
  }, [ deviceName ]);
  useEffect(() => {
    tableRef.current?.reload();
  }, [ deviceName ]);
  return (
    <DeviceHisStyle>
      <Card title={'设备调用历史'} size={"small"} hoverable>
        {/*@ts-ignore*/}
        <ProTable request={requestMethod}
          actionRef={tableRef}
          rowKey={({ id }) => `${id}`}
          columns={columns}
          options={false}
          scroll={{ x: columns.length * 190 }}
          pagination={{
            showSizeChanger: false,
            showQuickJumper: true,
            pageSize: 10,
          }}
        />
      </Card>
    </DeviceHisStyle>
  );
};

export default DeviceHis;
