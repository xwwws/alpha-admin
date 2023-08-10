import { Outlet } from '@@/exports';
import React from 'react';
interface IProp {
  [propName: string]: any;
}
const Index: React.FC<IProp> = () => {
  return <Outlet />;
};

export default Index;
