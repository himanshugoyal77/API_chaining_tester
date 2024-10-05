import { useState } from "react";
import { FaX } from "react-icons/fa6";
import { MdArrowDropDown } from "react-icons/md";

const Dropdown = ({ api, editApiSequence }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        className="bg-bgSoft p-2 rounded-sm flex justify-between items-center"
      >
        <p>{api.name}</p>
        <span className="cursor-pointer">
          {!open ? <MdArrowDropDown size={20} /> : <FaX size={10} />}
        </span>
      </div>
      {open && (
        <div className="flex ml-2">
          <input type="text" value={api.url} />
          <select
            id="method"
            className="w-20 ml-2"
            value={api.method || "GET"}
            onChange={(e) =>
              editApiSequence({ ...api, method: e.target.value })
            }
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
      )}
    </>
  );
};

export default Dropdown;
