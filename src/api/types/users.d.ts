declare namespace Users {
  interface List {
    id: number;
    username: string;
    name: string;
    email: string;
    phone: string;
    gender: string;
    status: string;
    type: string;
  }

  interface Create {
    passwd: string;
    username: string;
    name: string;
    email: string;
    phone: string;
    gender: unknown;
  }

  interface UserInfo {
    id: number;
    username: string;
    name: string;
    email: string;
    phone: string;
    gender: string;
    status: string;
    type: string;
  }

  interface SetUserInfo {
    name: string;
    email: string;
    phone: string;
    gender: string;
    status: string;
  }

  interface AllocationRoles {
    role_ids: any[]
  }
}
