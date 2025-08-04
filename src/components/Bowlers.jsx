const Bowlers = ({tableData}) => {
return (
      <div className="bg-white rounded-lg shadow-xl border border-gray-300 w-full max-w-3xl animate-fade-in">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-800 font-semibold text-white text-lg">
              <th className="py-3 rounded-tl-lg min-w-12">POS</th>
              <th className="text-start">
                <span className="flex sm:hidden">N</span>
                <span className="hidden sm:flex">Bowler Name</span>
              </th>
              <th>
                <span className="flex sm:hidden justify-center min-w-8">M</span>
                <span className="hidden sm:flex justify-center min-w-8">Matches</span>
              </th>
              <th>
                <span className="flex sm:hidden justify-center min-w-8">W</span>
                <span className="hidden sm:flex justify-center min-w-8">Wickets</span>
              </th>
              <th>
                <span className="flex sm:hidden justify-center min-w-8">E</span>
                <span className="hidden sm:flex justify-center min-w-8">Economy</span>
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
                  {data.name}
                </td>
                <td className="text-gray-700">{data.matches}</td>
                <td className="text-gray-700 font-semibold">{data.wickets}</td>
                <td className="text-gray-700">{data.runs === 0 ? 0 : (data.runs * 6 / data.balls).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
}
export default Bowlers