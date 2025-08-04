const RadioButton = ({ index, teamInfo, onChange }) => {
  return (
    <div>
      <div className="flex gap-8 pb-1">
        <label className="inline-flex items-center cursor-pointer text-gray-800">
          <input
            type="radio"
            id={"batsman" + teamInfo.teamId + index}
            name={teamInfo.teamId + index}
            value="batsman"
            checked={teamInfo.players[index].type === "batsman"}
            onChange={onChange}
            className="peer sr-only"
          />
          <span className="w-4 sm:w-5 h-4 sm:h-5 mr-2 sm:mr-3 rounded-full border-2 border-gray-400 flex items-center justify-center peer-checked:border-gray-800 peer-checked:bg-gray-800 transition-all duration-200">
            <span className="w-2.5 h-2.5 rounded-full bg-white peer-checked:bg-white"></span>
          </span>
          <span className="text-base font-medium">Batsman</span>
        </label>
        <label className="inline-flex items-center cursor-pointer text-gray-800">
          <input
            type="radio"
            id={"bowler" + teamInfo.teamId + index}
            name={teamInfo.teamId + index}
            value="bowler"
            checked={teamInfo.players[index].type === "bowler"}
            onChange={onChange}
            className="peer sr-only"
          />
          <span className="w-4 sm:w-5 h-4 sm:h-5 mr-2 sm:mr-3  rounded-full border-2 border-gray-400 flex items-center justify-center peer-checked:border-gray-800 peer-checked:bg-gray-800 transition-all duration-200">
            <span className="w-2.5 h-2.5 rounded-full bg-white peer-checked:bg-white"></span>
          </span>
          <span className="text-base font-medium">Bowler</span>
        </label>
      </div>
    </div>
  );
};
export default RadioButton;
