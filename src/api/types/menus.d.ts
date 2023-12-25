declare namespace Menus {
  interface List {
    id: number;
    name: string;
    code: string;
    code_path: string;
    description: string;
    parent_id: number;
    children?: Menus.List[];
  }

  interface Create {
    name: string;
    code: string;
    description: string;
    parent_id: number;
  }

  interface Edit {
    name: string;
    description: string;
  }

  interface permission {
    id: number,
    summary: string,
    name: string
  }

  interface AllPermission {
    tag: string,
    api_permission_list: permission[]
  }
}
