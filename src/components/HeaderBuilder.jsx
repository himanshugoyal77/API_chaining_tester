import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { FaX } from "react-icons/fa6";
import { TiEdit, TiTick } from "react-icons/ti";

const HeaderBuilder = () => {
  const [headers, setHeaders] = useState({
    "Content-Type": "application/json",
    Accept: "application/json",
    "Cache-Control": "no-cache",
  });
  const [headerKey, setHeaderKey] = useState("");
  const [headerValue, setHeaderValue] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [prevValue, setPrevValue] = useState(null);
  const activeInputRef = useRef(null);

  useEffect(() => {
    if (activeInputRef.current) {
      activeInputRef.current.focus();
    }
  }, [headerKey]);

  const addToHeaders = (key, value) => {
    if (key && value) {
      const newHeaders = { ...headers };
      newHeaders[key] = value;
      setHeaders(newHeaders);
      setHeaderKey("");
      setHeaderValue("");
      document.getElementById("header_modal").close();
    } else {
      toast.error("Fields cannot be empty");
    }
  };
  const removeHeader = (key) => {
    const newHeaders = { ...headers };
    delete newHeaders[key];
    setHeaders(newHeaders);
  };

  const updateHeader = (e, key, value) => {
    setHeaderValue(value);
    const newHeaders = { ...headers };
    newHeaders[key] = value;
    setHeaders(newHeaders);
  };

  return (
    <div className="header-section flex flex-col w-1/4 h-screen p-4">
      <button
        className="mb-3 w-full h-10 bg-bgSoft rounded-md text-primaryColor
        hover:bg-bg hover:text-white transition-all ease-in-out duration-300
        "
        onClick={() => document.getElementById("header_modal").showModal()}
      >
        <span className="mr-2"> + </span> Add Header
      </button>

      {Object.keys(headers).map((key, index) => {
        const value = headers[key];
        return (
          <div
            key={index}
            className="my-2 flex justify-between items-center bg-bgSoft px-4 py-2 rounded-md"
          >
            <div className="flex gap-2 items-center">
              <p className="w-32">{key}</p>
              <input
                id={key}
                disabled={isEditing === key ? false : true}
                name={key}
                type="text"
                value={headerKey === key ? headerValue : value}
                onChange={(e) => updateHeader(e, key, e.target.value)}
                className="w-1/2 mr-3"
              />
            </div>
            {isEditing === key ? (
              <button
                onClick={() => {
                  if (headerValue) {
                    setIsEditing(null);
                    setHeaderKey(null);
                    setHeaderValue(null);
                  } else {
                    setHeaderValue(prevValue);
                    toast.error("Field cannot be empty");
                  }
                }}
              >
                <TiTick />
              </button>
            ) : (
              <button
                onClick={() => {
                  activeInputRef.current = document.getElementById(key);
                  setIsEditing(key);
                  setHeaderKey(key);
                  setHeaderValue(value);
                  setPrevValue(value);
                }}
              >
                <TiEdit />
              </button>
            )}
            <button
              className="ml-3 text-white"
              onClick={() => removeHeader(key)}
            >
              <FaX />
            </button>
          </div>
        );
      })}

      <dialog id="header_modal" className="modal">
        <div className="modal-box bg-bgDark">
          <h3 className="font-bold text-lg text-white">Enter Header</h3>
          <div className="flex w-full gap-3 mt-3">
            <input
              type="text"
              className="w-[40%]"
              value={headerKey}
              placeholder="Authorization"
              onChange={(e) => setHeaderKey(e.target.value)}
            />
            <input
              type="text"
              className="flex-grow"
              placeholder="Bearer..."
              value={headerValue}
              onChange={(e) => setHeaderValue(e.target.value)}
            />
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button
                onClick={() => {
                  addToHeaders(headerKey, headerValue);
                }}
                className="h-10 bg-primaryColor border-none  text-center px-4 py-2 rounded-md"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default HeaderBuilder;
