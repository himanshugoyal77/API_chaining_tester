import { useEffect, useState } from "react";
import { FaX } from "react-icons/fa6";
import { useSelector } from "react-redux";
import ObjectViewer from "./ObjectViewer";

const Tooltip = ({ setShowToolTip, appendToUrl }) => {
  const cache = useSelector((state) => state.cache);
  const [selectedApi, SetSlectedApi] = useState(null);

  const closeToolTip = () => {
    setShowToolTip(false);
  };


  return (
    <div className="reltive flex flex-col items-center justify-center px-4 py-5">
      <div
        onClick={closeToolTip}
        className="absolute -top-2 -right-2 cursor-pointer rounded-full p-2 bg-primaryColor"
      >
        <FaX size={10} />
      </div>
      <div className="w-full">
        <h3 className="text-primaryColor mb-2">Select API</h3>
        {Object.keys(cache).length > 0 ? (
          <select
            className="h-10"
            value={selectedApi || "Nothing selected"}
            onChange={(e) => SetSlectedApi(e.target.value)}
          >
            {Object.keys(cache).map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        ) : (
          <select className="h-10" value={"No APIs Found"}></select>
        )}
      </div>

      {selectedApi && (
        <div className="w-full h-full mt-4">
          <h3 className="text-primaryColor mb-2">Response Body</h3>
          <div id="objectDisplay" className="h-60 overflow-y-scroll">
            {cache[selectedApi] && (
              <ObjectViewer
                obj={cache[selectedApi].response}
                closeToolTip={closeToolTip}
                appendToUrl={appendToUrl}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
