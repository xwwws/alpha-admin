// @ts-ignore
/* eslint-disable */

declare namespace API {
  type Pages = {
    limit?: string | number;
    page?: string | number;
  };

  type ReadReq = {
    node_index: string | number;
  };

  type sleepReq = {
    seconds: string | number;
  };

  type MethodsRes = {
    start_time: string;
    end_time: string;
    result: string[];
  };
  type MoveParams = {
    name: string;
    x: string | number;
    y: string | number;
    z: string | number;
  };
  type MoveReq = {
    src_area: MoveParams;
    dst_area: MoveParams;
    height: string | number;
  };

  type CurrentUser = {};
}
