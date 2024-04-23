
import { BrowserRouter as BRouter, Route, Routes } from "react-router-dom";
import Dashboard from './pages/Common/Dashboard';




function App() {
  return (
    <BRouter>
    <Routes>
    <Route exact path="/dashboard" element={<Dashboard></Dashboard>} />
   
   
    </Routes>
  </BRouter>
  );
}

export default App;
