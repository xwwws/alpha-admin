declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'numeral';
declare module '@antv/data-set';
declare module 'mockjs';
declare module 'react-fittext';
declare module 'bizcharts-plugin-slider';

// 以下变量声明对应config.[env].ts文件内define的变量
declare const REACT_APP_ENV: 'test' | 'dev' | 'uat' | 'prod' | undefined | false;
declare const WS_URL: string;
declare const BASE_URL: string;
