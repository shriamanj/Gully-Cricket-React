import { useEffect, useState } from "react";
import Batsmans from "../components/Batsmans";
import Points from "../components/Points";
import Bowlers from "../components/Bowlers";

const PointsTable = () => {
  const [pointsTable, setPointsTable] = useState([]);
  const [batsmans, setBatsmans] = useState([]);
  const [bowlers, setBowlers] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("teamsInfo")) || [];
    let players = [];
    data.forEach((item) => {
      players = [...players, ...item.players];
    });
    const batsmans = players.filter((player) => player.type === "batsman")
    const bowlers = players.filter((player) => player.type === "bowler")
    setBowlers(bowlers.sort((a, b) => b.wickets - a.wickets))
    setPointsTable(data.sort((a, b) => b.points - a.points));
    setBatsmans(batsmans.sort((a, b) => b.runs - a.runs));
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 p-4 sm:p-8 justify-center min-h-[10vh]">
      <Points tableData={[...pointsTable]} />
      <Batsmans tableData={[...batsmans]} />
      <Bowlers tableData={[...bowlers]} />
    </div>
  );
};
export default PointsTable;
