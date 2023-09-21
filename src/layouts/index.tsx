import { Outlet } from '@@/exports';
import {Provider} from 'react-redux'
import React from 'react';
// @ts-ignore
import store from "@/redux/store";
interface IProp {
  [propName: string]: any;
}
const Index: React.FC<IProp> = () => {
  return <Provider store={store}>
    <Outlet></Outlet>
  </Provider>;
};

export default Index;
