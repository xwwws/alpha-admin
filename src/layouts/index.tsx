// @ts-ignore
import React from 'react';
import { Outlet } from "@@/exports";
interface IProp {
[propName: string]: any
}
const Index:React.FC<IProp> = () => {
  return <Outlet/>
}

export default Index;
