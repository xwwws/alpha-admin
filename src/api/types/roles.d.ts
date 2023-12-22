declare namespace Roles {
  interface List {
    id: string;
    name: string;
    description: string;
  }
  interface Create {
    name: string;
    description: string;
  }
}
