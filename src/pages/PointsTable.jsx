import { useEffect, useState } from "react";

const PointsTable = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("pointsTable")) || [];
    setTableData(data.sort((a, b) => b.points - a.points));
  }, []);

  return (
    <div className="p-4 sm:p-8 flex justify-center min-h-[10vh]">
      <div className="bg-white rounded-lg shadow-xl border border-gray-300 w-full max-w-3xl animate-fade-in">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-800 font-semibold text-white text-lg">
              <th className="py-3 rounded-tl-lg min-w-12">POS</th>
              <th className="text-start">
                <span className="flex sm:hidden">T</span>
                <span className="hidden sm:flex">Team</span>
              </th>
              <th>
                <span className="flex sm:hidden justify-center min-w-8">M</span>
                <span className="hidden sm:flex justify-center min-w-8">Matches</span>
              </th>
              <th>
                <span className="flex sm:hidden justify-center min-w-8">W</span>
                <span className="hidden sm:flex justify-center min-w-8">Wins</span>
              </th>
              <th>
                <span className="flex sm:hidden justify-center min-w-8">L</span>
                <span className="hidden sm:flex justify-center min-w-8">Loss</span>
              </th>
              <th className="rounded-tr-lg">
                <span className="flex sm:hidden justify-center min-w-8">P</span>
                <span className="hidden sm:flex justify-center min-w-8">Points</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, index) => (
              <tr
                className={`text-center text-base border-t border-gray-200 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } ${
                  index === tableData.length - 1 && "rounded-b-lg"
                } hover:bg-gray-200 transition-all duration-200`}
              >
                <td className="p-3 font-bold text-gray-700">{index + 1}</td>
                <td className="font-semibold text-start text-gray-800">
                  {data.teamName}
                </td>
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
