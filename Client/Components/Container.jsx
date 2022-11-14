import * as React from 'react';
const { useEffect, useState } = React;


//will need to render individual components for CPU, MEM & Network IO
export default function Container(props) {
  const { ID, Names } = props.info;
  const sse = new EventSource(`http://localhost:3000/cont/constream/?id=${ID}`);

  const [dataInfo, setData] = useState([]);
  
  useEffect(() => {
    sse.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setData(data);
    };
    sse.onerror = () => sse.close;
    console.log('data info', dataInfo);
  });

  

  return (
    <div className='justify-self-center mt-[50px] border-4 border-blue-400 rounded-md min-h-[350px] min-w-[900px]'>
        <div className='grid grid-cols-3 gap-5 mt-2 ml-2 mb-8 font-semibold'>
          <h1>Container Name: {Names}</h1>
          <h1>Container ID:{ID} </h1>
          <button className='ml-auto mr-3 bg-red-400 w-[80px] h-[24px] rounded-lg font-medium'>Turn Off</button>
        </div>
        <div className='grid grid-cols-3 justify-items-center font-semibold'>
          <h1>CPU Usage: { dataInfo[0] ? dataInfo[0].CPUPerc : 0 }</h1>
          <h1>MEM Usage: {dataInfo[0] ? dataInfo[0].MemPerc : 0}</h1>
          <h1>Network I/O: {dataInfo[0] ? dataInfo[0].NetIO : 0}</h1>
        </div>
    </div>
  );
}