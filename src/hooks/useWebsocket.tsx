import React, { useEffect, useRef } from 'react';
import { WebSocketStatus } from "@/utils/componentSettingUtils";
import DispatchEvent from "@/utils/DispatchEvent";
import {message} from 'antd'

interface ISendMessage {
  nodeid: string | number;
  interval: string | number;
}

export interface IMsgGet {
  current_time: string;
  name: string;
  nodeid: number;
  server_time: string;
  value: number;
  value_type: number;
}

enum BuildEnv {
  dev = "dev",
  prod = "prod",
  test = "test",
}

export const BUILD_ENV = REACT_APP_ENV as BuildEnv;

const webSocketUrl = {
  [BuildEnv.dev]: WS_URL,
  [BuildEnv.prod]: WS_URL,
  [BuildEnv.test]: WS_URL,
}[BUILD_ENV];

const useWebsocket = () => {
  const socket = useRef<WebSocket>();

  // 链接成功回调
  const socketOnOpen = () => {
    console.log('socket连接成功');
  }
  // 关闭链接回调
  const socketOnClose = () => {
    console.log('socket关闭');
  }
  // 出错回调
  const socketOnError = (err:any) => {
    message.error("socket连接失败,请重试")
    console.log('socket出错',err);
  }
  // 接收消息回调
  const socketOnMessage = (event: { data: string }) => {
    const { data } = event;
    const resData: IMsgGet = JSON.parse(data);
    DispatchEvent.emit('read', resData)

  }

  const socketInit = () => {
    try {
      let url = `ws://${location.host}/ws/sub`;
      // 本地环境连接从 config 环境变量配置
      if(REACT_APP_ENV === 'dev') {
        url = `${webSocketUrl}/ws/sub`;
      }
      const socketObj = new WebSocket(url);
      socketObj.addEventListener("open", socketOnOpen);
      socketObj.addEventListener("close", socketOnClose);
      socketObj.addEventListener("error", socketOnError);
      socketObj.addEventListener("message", socketOnMessage);
      socket.current = socketObj;
    } catch (e) {
      console.log(e);
    }
  }

  // 进入页面链接socket
  useEffect(() => {
    socketInit();
    return () => {
      socket?.current?.close()
    }
  }, []);
  const sendMessage = (msg: ISendMessage[]) => {
    if (socket?.current?.readyState === WebSocketStatus.OPEN) {
      socket?.current?.send(JSON.stringify(msg));
    } else {
      console.error('socket 尚未连接!')
    }
  };
  const connect = () => {
    socketInit()
  }
  const disConnect = () => {
    socket?.current?.close()
  }
  return {
    sendMessage,
    connect,
    disConnect,
  };
};

export default useWebsocket;
