import * as React from 'react';
const { useState, useEffect } = React;
import OverviewContainer from '../Components/OverviewContainer';
import Notifications from '../Components/Notifications';
import BarChart from '../Charts/BarChart.jsx';
import Loader from '../Utility/Loader';

export default function DataOverview() {

  const [containersArray, setContainersArray] = useState([]);

  useEffect(() => {
    const sse = new EventSource('http://localhost:3000/cont/fullstream');
    sse.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setContainersArray(data);
    };
    sse.onerror = () => sse.close();
    console.log('data info', containersArray);
    return () => {
      sse.close();
    };
  }, []);


  const notifs = [];
  for (let i = 0; i < containersArray.length; i++) {
    // we would need to loop through the array of containers
    const element = containersArray[i];
    //string to be reasigned after we check the health of the container
    let health = 'Good Shape';
    let danger = 'border-blue-400';
    //removing everything and leaving only numbers
    const cpu = Number(element.CPUPerc.replace(/\D+/g, '').slice(0, 2));
    const memory = Number(element.MemPerc.replace(/\D+/g, '').slice(0, 2));

    if (cpu > 75 || memory > 75) {
      health = 'Bad Shape';
      danger = 'border-red-400';
    }
    if (cpu > 75) {
      notifs.push(
        `Container ${containersArray[i].Name} has a very high CPU Usage!`,
      );
    }
    if (memory > 75) {
      notifs.push(
        `Container ${containersArray[i].Name} has a very high MEM Usage!`,
      );
    }
    // containers.push(
    //   <OverviewContainer
    //     key={`c${containersArray[i].ID}`}
    //     id={`containerNum${i}`}
    //     name={containersArray[i].Name}
    //     health={health}
    //     notifs={notifs}
    //     className={`justify-self-center border-4 ${danger} rounded-md max-h-[5%] min-h-[100%] min-w-[100%] `}
    //   />,
    // );
  }

  return (
    <>
      <div className="text-center p-5 h-[7%] items-center text-3xl font-bold underlined">
        <header className="content-center">Data Overview</header>
      </div>
      {containersArray.length === 0
        ? 
        <Loader />
        : (
          <div className='overflow-auto'>
            <div>
              <BarChart data={containersArray.map(container => {
                //const MemTotal = container.MemUsage.split(' / ')[1];
                const BlockIn = container.BlockIO.split(' / ')[0];
                const BlockOut = container.BlockIO.split(' / ')[1];
                return ({
                  CPUPerc: parseFloat(container.CPUPerc) * 10,
                  MemPerc: parseFloat(container.MemPerc) * 10,
                  BlockIn: parseFloat(BlockIn),
                  BlockOut: parseFloat(BlockOut),
                  // MemUsage: parseFloat(container.MemUsage),
                  // MemTotal: parseFloat(MemTotal) * 1000 
                });
              })} />
            </div>
            {/* <div className="border-t-4 h-[25%]">
              <Notifications notifs={notifs} />git
            </div> */}
          </div>
        )}
    </>
  );
}
