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
}
