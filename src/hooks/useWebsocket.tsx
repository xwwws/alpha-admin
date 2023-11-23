import React, { useEffect, useRef, useState } from 'react';
import { WebSocketStatus } from "@/utils/componentSettingUtils";
import DispatchEvent from "@/utils/DispatchEvent";
import { message } from 'antd';
import { GET_TOKEN } from "@/utils/auth";
import QueryString from "qs";

export interface ISendMessage {
  nodeid: string | number;
  interval: string | number;
}

export interface IMsgGet {
  custom_name:string;
  current_time: string;
  description: string;
  label: string;
  name: string;
  nodeid: number;
  server_time: string;
  value: number;
  value_type: number;
}

const socketStatus = {
  INIT: 'init',
  CONNECTING: 'connecting',
  DIS_CONNECT: 'disConnect',
  ERROR: 'error',
};

export enum SocketEventEnum {
  OPEN = "SOCKET_OPEN",
  CLOSE = "SOCKET_CLOSE",
  ERROR = "SOCKET_ERROR",
  MSG = "SOCKET_MSG",

}

const useWebsocket = () => {
  const socket = useRef<WebSocket>();
  /**
   * socket状态
   *  init 初始化
   *  connecting 连接中
   */
  const [ socketState, setSocketState ] = useState<string>('init');


  // 连接成功回调
  const socketBeforeSend = (event: any) => {
    setSocketState(socketStatus.CONNECTING);
    DispatchEvent.emit(SocketEventEnum.OPEN);
  };
  // 连接成功回调
  const socketOnOpen = () => {
    setSocketState(socketStatus.CONNECTING);
    DispatchEvent.emit(SocketEventEnum.OPEN);
  };
  // 关闭链接回调
  const socketOnClose = () => {
    setSocketState(socketStatus.DIS_CONNECT);
    DispatchEvent.emit(SocketEventEnum.CLOSE);
  };
  // 出错回调
  const socketOnError = (err: any) => {
    setSocketState(socketStatus.ERROR);
    message.error("socket连接失败,请重试");
    DispatchEvent.emit(SocketEventEnum.ERROR, err);
  };
  // 接收消息回调
  const socketOnMessage = (event: { data: string }) => {
    const { data } = event;
    const resData: IMsgGet = JSON.parse(data);
    DispatchEvent.emit(SocketEventEnum.MSG, resData);
  };

  function socketInit(url: string) {
    return new Promise((resolve, reject) => {

      url+= `?${QueryString.stringify({
        token: GET_TOKEN()
      })}`
      const socketObj = new WebSocket(url);
      // [ `Authorization:Bearer ${GET_TOKEN()}` ]
      socketObj.addEventListener("open", socketOnOpen);
      socketObj.addEventListener("close", socketOnClose);
      socketObj.addEventListener("error", socketOnError);
      socketObj.addEventListener("message", socketOnMessage);
      socket.current = socketObj;
      // 当socket 连接成功时  触发事件
      DispatchEvent.on(SocketEventEnum.OPEN, resolve);
    });
  }

  /**
   * send socket msg
   * @param msg
   */
  function sendMessage(msg: ISendMessage[]) {
    if (socket?.current?.readyState === WebSocketStatus.OPEN) {
      socket?.current?.send(JSON.stringify(msg));
    } else {
      setTimeout(() => {
        sendMessage(msg)
      },100)
    }
  }

  /**
   * 连接或重新连接socket
   */
  async function connect(url: string) {
    // 当前状态正在连接中 断开连接
    if (socketState === socketStatus.CONNECTING) {
      await disConnect();
    }
    await socketInit(url);
  }

  /**
   * 断开连接
   */
  async function disConnect() {
    return new Promise((resolve, reject) => {
      socket?.current?.close();
      DispatchEvent.on(SocketEventEnum.CLOSE, resolve);
    });
  }

  return {
    sendMessage,
    connect,
    disConnect,
  };
};

export default useWebsocket;
