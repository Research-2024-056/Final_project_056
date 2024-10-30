import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { BrowserRouter as BRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Common/Dashboard";
import Login from "./pages/Common/Login"
import Register from "./pages/Common/Register"
import PreProductionMain from "./pages/PreProduction_component/PreProductionDasboard";
import Durabilitycheck from "./pages/PreProduction_component/Durability_check";
import PreProductDecision from "./pages/PreProduction_component/Pre_Product_Decision";
import { FirebaseProvider } from "./components/FirebaseContext";
// Needle part
import MachineSelect from "./pages/NeedlePerformance/MachineSelect";
import NeedleDashboard from "./pages/NeedlePerformance/NeedleDashboard";
import OrderDashboard from "./pages/Order/OrderDashboard";
import NewOrder from "./pages/Order/NewOrder";
import OrderDetails from "./pages/Order/OrderDetails";
import NeedleRealTime from "./pages/NeedlePerformance/NeedleRealTime";
import WorkLoad from "./pages/Order/WorkLoad";
import WorkloadOverview from "./pages/Order/WorkloadOverview";

// Workforce Map
import WorkforceMapDashboard from "./pages/WorkforceMap_component/WorkforceMapDashboard";
import LookUp_performance from "./pages/WorkforceMap_component/LookUp_performance";
import Dynamic_seat_planner from "./pages/WorkforceMap_component/Dynamic_seat_planner";
import Labor_efficiency_analysis from "./pages/WorkforceMap_component/Labor_efficiency_analysis";
import AddSewingMachine from "./pages/Predictive_Maintenance/AddSewingMachine";
import SewingDashboard from "./pages/Predictive_Maintenance/SewingDashboard";

function App() {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch data from the backend API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5005/thingspeak/data'); 
        setData(response.data); 
        console.log(response.data)
        setError(null); // Clear any previous errors
      } catch (err) {
        setError('Failed to fetch data'); 
        console.error(err);
      }
    };

    // Fetch data initially
    fetchData();

   
    const intervalId = setInterval(fetchData, 60000); 

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); 

  return (
    <FirebaseProvider>
    <BRouter>
      <Routes>
        <Route exact path="/dashboard" element={<Dashboard></Dashboard>} />
        <Route exact path="/" element={<Login></Login>} />
        <Route exact path="/register" element={<Register></Register>} />

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
        <Route
          exact
          path="/PreProductDecision"
          element={<PreProductDecision></PreProductDecision>}
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
          path="/needledashboard/:orderkey/:documentid/:ordernumber"
          element={<NeedleDashboard></NeedleDashboard>}
        />
        <Route path="/OrderDetails/:ordernumber" element={<OrderDetails />} />
        <Route
          path="/realTimeDashboard/:orderkey/:documentid/:ordernumber"
          element={<NeedleRealTime />}
        />

        <Route path="/order" element={<OrderDashboard></OrderDashboard>} />

        {/*Predictive Maintenance */}
        <Route
          exact
          path="/AddSewingMachine"
          element={<AddSewingMachine></AddSewingMachine>}
        />
        <Route
          exact
          path="/SewingDashboard"
          element={<SewingDashboard></SewingDashboard>}
        />
        <Route exact path="/Createworkload" element={<WorkLoad></WorkLoad>} />
        <Route
          exact
          path="/workload/:ordernumber/:documentid"
          element={<WorkloadOverview></WorkloadOverview>}
        />
      </Routes>
    </BRouter>
   </FirebaseProvider>
  );
}

export default App;
