import React from 'react';
import Navbar from '../components/Navbar';
import Subnav from '../components/Subnav';

const Dashboard = () => {
//   const [ page, setPage ] = useState(1);
//   const { 
//     resolvedData, 
//     latestData, 
//     status 
//   } = useInfiniteQuery(['planets', page], fetchPlanets);

  return (
    <div className="h-screen bg-gray-800">
        <Navbar />
        <Subnav />
      {/* <h2>Dashboard</h2>

      {status === 'loading' && (
        <div>Loading data</div>
      )}

      {status === 'error' && (
        <div>Error fetching data</div>
      )}

      {status === 'success' && (
        <>
          <button 
            onClick={() => setPage(old => Math.max(old - 1, 1))} 
            disabled={page === 1}>
            Previous Page
          </button>
          <span>{ page }</span>
          <button 
            onClick={() => setPage(old => (!latestData || !latestData.next ? old : old + 1))} 
            disabled={!latestData || !latestData.next}>
            Next page
          </button>
          <div>
            { resolvedData.results.map(planet => <Planet key={planet.name} planet={planet} /> ) }
          </div>
        </>
      )}  */}
    </div>
  );
}
 
export default Dashboard;