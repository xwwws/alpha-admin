declare namespace Flows {
  interface ListReq extends API.PagesReq {
    project_id?: string | number;
  }

  interface List {
    id: number;
    name: string;
    status: string;
    created_at: string;
    user_id: number;
    user_username: string;
    project_id: number;
    project_name: string;
    description: string;
  }

  interface Iprerequisite {
    value?: string | boolean;
    nodeid?: string | number;
    operator?: string;
  }

  interface FlowDataItem<T> {
    action: string;
    kwargs: T;
    prerequisite: Iprerequisite;
  }

  interface Detail {
    id: number;
    name: string;
    flow_data: FlowDataItem<Methods.Read | Methods.Write | Methods.sleepReq>[];
    data_acquisitions: API.data_acquisitionParams[];
    status: string;
    description: string;
    user_id: number;
    user_username: string;
    project_id: number;
    project_name: string;
  }


}
