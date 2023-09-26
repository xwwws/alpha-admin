
const { REACT_APP_ENV } = process.env;
export default  {
  define: {
    REACT_APP_ENV,
    WS_URL: 'ws://192.168.10.19:80',
    BASE_URL: 'http://192.168.10.19:80'
  }
}

