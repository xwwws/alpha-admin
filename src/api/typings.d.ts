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
  type MethodsRes = {
    start_time: string;
    end_time: string;
    result: string[];
  };
  type MoveReq = {
    node_index: string | number;
  };
  type MoveRes = {
    start_time: string;
    end_time: string;
    results: string[];
  };
  type CurrentUser = {};
}
