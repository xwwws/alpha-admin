declare namespace Devices {
  interface methodList {
    action: string;
    label: string;
  }

  interface dataNodeList {
    name: string;
    label: string;
    description: string;
    nodeid: 0;
    value_type: string;
  }

  interface Devices {
    browse_name: string;
    label: string;
    method_list: methodList[];
    data_node_list: dataNodeList[];
  }

  interface DeviceHisReq extends API.PagesReq {
    start_time_after: string;
    start_time_before: string;
  }

  interface DeviceHisRes {
    id: number;
    start_time: string;
    end_time: string;
    duration: number;
    action: string;
    label: string;
    args: string[];
    result: string[];
  }
}
