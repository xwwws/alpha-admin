/**
 * project 相关
 */
declare namespace Projects {
  interface ListReq extends PagesReq {
    [key: string]: any;
  }

  interface List {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
  }

  interface CreateProject {
    name: string;
    description: string;
  }

  interface EditProject extends CreateProject {
    id?: string | number;
  }

  interface ProjectDetail {
    id: string | number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
  }


  interface ProDataList {
    id: number;
    name: string;
    project_id: number;
    description: string;
    created_at: string;
    updated_at: string;
  }

  interface CreateProData {
    name: string
    query_config: {
      title: string[]
      sql_expr: string
    }
    description: string
  }


  interface ProDataInfo {
    data: (string|number)[][]
  }
  interface ProDataItemInfo {
    id: number
    name: string
    project_id: number
    query_config: {
      sql_expr: string,
      title: string[]
    }
    description: string
    created_at: string
    updated_at: string
  }
}
