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
}
