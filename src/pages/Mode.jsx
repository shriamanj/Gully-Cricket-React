import { useNavigate } from "react-router";
import Button from "../components/Button";
import { useState } from "react";

const Mode = () => {
  const navigate = useNavigate();
  const [series, SetSeries] = useState(false);

  const navigateToInfo = (teams, type) => {
    navigate("/info", { state: { teams: teams, matchType: type } });
  };
  const selectTeams = () => {
    SetSeries(true);
  };

  return (
    <div className="min-h-[calc(100vh_-_64px)] flex items-center justify-center bg-gray-100">
      <div className="w-full  max-w-xl animate-fade-in">
        <div className="flex gap-4">
          <button
            onClick={() => navigateToInfo(2, "single")}
            className="w-80 h-80 flex flex-col items-center justify-center gap-4 text-2xl font-bold px-10 py-8 bg-gray-800 text-white cursor-pointer rounded-2xl shadow-lg hover:bg-gray-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
          >
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 3l4 4-14 14-4-4L17 3z" />
                <circle cx="7" cy="17" r="2" fill="white" />
              </svg>
            </span>
            Single Match
          </button>
          <button
            onClick={selectTeams}
            className="w-80 h-80 flex flex-col items-center justify-center gap-4 text-2xl font-bold px-10 py-8 bg-white cursor-pointer text-gray-800 border border-gray-400 rounded-2xl shadow-lg hover:bg-gray-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
          >
            <span>
              {/* Cricket Ball SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10">
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="white" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12a4 4 0 018 0" />
              </svg>
            </span>
            Series
          </button>
        </div>
        {series && (
          <div className="mt-10 animate-fade-in">
            <p className="text-center text-lg font-semibold text-gray-700 mb-6">
              Select number of teams to play in series
            </p>
            <div className="flex justify-center gap-4">
              {[2, 3, 4, 5].map((num) => (
                <Button
                  key={num}
                  label={num.toString()}
                  onClick={() => navigateToInfo(num, "series")}
                  className="bg-gray-800 text-white px-6 py-3 rounded-xl shadow hover:bg-gray-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Mode;
