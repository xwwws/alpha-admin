import type { FormRule } from 'antd';

declare namespace IForm {
  interface IFormRules {
    [propName: string]: FormRule[];
  }
}
