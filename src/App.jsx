import { Route, Routes } from "react-router";
import Mode from "./pages/Mode";
import Navbar from "./pages/navbar";
import TeamDetail from "./pages/TeamDetail";
import Match from "./components/match";
import PointsTable from "./pages/PointsTable";
import Playground from "./pages/Playground";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Mode />} />
        <Route path="/info" element={<TeamDetail />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/table" element={<PointsTable />} />
      </Routes>
    </>
  );
}

export default App;
