namespace Login {
  interface Permission {
    id:number;
    parent_id: number;
    code:string;
    name:string;
    children? : Permission[]
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
    menus: Permission[];
  }
}
