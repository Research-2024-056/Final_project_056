import { BrowserRouter as BRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Common/Dashboard";
import PreProductionMain from "./pages/PreProduction_component/PreProductionDasboard";
import Durabilitycheck from "./pages/PreProduction_component/Durability_check";
import MachineSelect from "./pages/NeedlePerformance/MachineSelect";
import NeedleDashboard from "./pages/NeedlePerformance/NeedleDashboard";
import OrderDashboard from "./pages/Order/OrderDashboard";
import NewOrder from "./pages/Order/NewOrder";
// Workforce Map
import WorkforceMapDashboard from "./pages/WorkforceMap_component/WorkforceMapDashboard";
import LookUp_performance from "./pages/WorkforceMap_component/LookUp_performance";
import Dynamic_seat_planner from "./pages/WorkforceMap_component/Dynamic_seat_planner";
import Labor_efficiency_analysis from "./pages/WorkforceMap_component/Labor_efficiency_analysis";

function App() {
  return (
    <BRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard></Dashboard>} />

        {/* Pre Prodction Page URLs */}
        <Route
          exact
          path="/PreProductionMain"
          element={<PreProductionMain></PreProductionMain>}
        />
        <Route
          exact
          path="/Durabilitycheck"
          element={<Durabilitycheck></Durabilitycheck>}
        />

        {/* Workforce Map Page URLs */}
        <Route
          exact
          path="/WorkforceMapDash"
          element={<WorkforceMapDashboard></WorkforceMapDashboard>}
        />
        <Route
          exact
          path="/LookUpPerformance"
          element={<LookUp_performance></LookUp_performance>}
        />
        <Route
          exact
          path="/DynamicSeatPlanner"
          element={<Dynamic_seat_planner></Dynamic_seat_planner>}
        />
        <Route
          exact
          path="/LaborEfficiencyAnalysis"
          element={<Labor_efficiency_analysis></Labor_efficiency_analysis>}
        />
        <Route
          exact
          path="/machineselect"
          element={<MachineSelect></MachineSelect>}
        />
        <Route exact path="/createneworder" element={<NewOrder></NewOrder>} />
        <Route
          path="/needledashboard/:machineId"
          element={<NeedleDashboard></NeedleDashboard>}
        />
        <Route path="/order" element={<OrderDashboard></OrderDashboard>} />
      </Routes>
    </BRouter>
  );
}

export default App;
