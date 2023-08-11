import type { FormRule } from 'antd';

declare namespace IForm {
  interface IFormRules {
    [propName: string]: FormRule[];
  }
}

declare namespace ITypes {
  interface EnumType {
    label: string;
    value: string | number;
  }
}
