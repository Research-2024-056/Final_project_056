
import { BrowserRouter as BRouter, Route, Routes } from "react-router-dom";
import Dashboard from './pages/Common/Dashboard';
import PreProductionMain from './pages/PreProduction_component/PreProductionDasboard';
import Durabilitycheck from './pages/PreProduction_component/Durability_check';




function App() {
  return (
    <BRouter>
    <Routes>
    <Route exact path="/" element={<Dashboard></Dashboard>} />



    {/* Pre Prodction Page URLs */}
    <Route exact path="/PreProductionMain" element={<PreProductionMain></PreProductionMain>} />
    <Route exact path="/Durabilitycheck" element={<Durabilitycheck></Durabilitycheck>} />
   
   
    </Routes>
  </BRouter>
  );
}

export default App;
