import { useEffect, useState } from "react";

const PointsTable = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("pointsTable"));
    setTableData(data.sort((a, b) => b.points - a.points));
  }, []);

  return (
    <div className="p-8 flex justify-center items-center min-h-[60vh]">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-300 w-full max-w-3xl animate-fade-in">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white text-lg">
              <th className="py-3 rounded-tl-2xl">POS</th>
              <th className="text-start">Team</th>
              <th>Matches</th>
              <th>Wins</th>
              <th>Loss</th>
              <th className="rounded-tr-2xl">Points</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, index) => (
              <tr className={`text-center text-base border-t border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-200 transition-all duration-200`}>
                <td className="p-3 font-bold text-gray-700">{index + 1}</td>
                <td className="font-semibold text-start text-gray-800">{data.teamName}</td>
                <td className="text-gray-700">{data.matches}</td>
                <td className="text-gray-700">{data.wins}</td>
                <td className="text-gray-700">{data.loss}</td>
                <td className="font-semibold text-gray-800">{data.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default PointsTable;
