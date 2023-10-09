
const { REACT_APP_ENV } = process.env;
console.log(REACT_APP_ENV);
export default  {
  define: {
    REACT_APP_ENV,
    WS_URL: 'ws://116.62.122.83:5010',
    BASE_URL: 'http://116.62.122.83:5010',
  }
}

