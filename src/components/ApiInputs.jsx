import { useState } from "react";
import Dropdown from "./Dropdown";
import { get, create, getSingle } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { addToCache } from "../state/cacheSlice";
import Tooltip from "./Tooltip";

const ApiInputs = ({ response, setResponse, body }) => {
  const dispatch = useDispatch();
  const [apiSequence, setApiSequence] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState({});
  const [newRequest, setNewRequest] = useState({
    name: "",
    url: "",
    method: "GET",
  });

  const cache = useSelector((state) => state.cache);
  console.log("newRequest", newRequest);

  const appendToUrl = (param) => {
    const req = { ...newRequest };
    req.url += +param;
    setNewRequest(req);
  };

  const appendToolTip = (x, y) => {
    const tooltip = document.createElement("div");
    tooltip.className =
      "bg-bgSoft text-primaryColor text-sm py-2 px-4 text-center rounded-md transition-all ease-in border cursor-pointer";
    tooltip.innerHTML = "Import Value from previous API response";
    tooltip.style.position = "absolute";
    tooltip.style.zIndex = "999";
    tooltip.style.top = `${y}px`;
    tooltip.style.left = `${x}px`;
    document.body.appendChild(tooltip);

    tooltip.addEventListener("click", () => {
      setShowTooltip(true);
    });

    setTimeout(() => {
      document.body.removeChild(tooltip);
    }, 2000);
  };

  const getCachedResponse = async (name) => {
    const cached = cache.find((item) => item.name === name);
    if (cached) {
      return cached.response;
    }
    return {};
  };

  const addApiSequence = async () => {
    if (!newRequest.name || !newRequest.url) {
      return;
    }
    setApiSequence((prev) => [...prev, newRequest]);

    let res = {};
    if (newRequest.method === "GET") {
      res = await get(newRequest.url);
      setResponse(res);
    } else if (newRequest.method === "POST") {
      res = await create(newRequest.url, body);
      setResponse(res);
    }

    const { name, ...all } = newRequest;
    dispatch(
      addToCache({
        key: name,
        body: {
          ...all,
          response: res,
        },
      })
    );
    //setNewRequest({});
  };

  const editApiSequence = (api) => {
    setApiSequence((prev) => {
      const index = prev.findIndex((item) => item.name === api.name);
      prev[index] = api;
      return [...prev];
    });
  };

  return (
    <div className="flex-grow flex flex-col">
      <h4>Test Case Title</h4>

      <textarea
        rows={5}
        id="description"
        className="mt-2"
        placeholder="Describe this test case is about..."
      />

      <div className="api-sequence flex flex-col">
        <h4>Add API Sequence</h4>
        <div className="flex flex-col gap-2 mt-2">
          {apiSequence.map((api, index) => (
            <Dropdown key={index} api={api} editApiSequence={editApiSequence} />
          ))}
          <div className="flex mt-2">
            <input
              type="text"
              id="apiName"
              className="flex-grow"
              placeholder="API Name"
              value={newRequest.name || ""}
              onChange={(e) =>
                setNewRequest((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            {/* dropown here */}
            <select
              id="method"
              className="w-20 ml-2"
              value={newRequest.method || "GET"}
              onChange={(e) =>
                setNewRequest((prev) => ({ ...prev, method: e.target.value }))
              }
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
          <input
            type="text"
            id="apiUrl"
            className="w-full mr-2"
            value={newRequest.url || ""}
            placeholder="API URL"
            onDoubleClick={(e) => {
              const x = e.clientX;
              const y = e.clientY;
              setPosition({ x, y });

              appendToolTip(x, y);
            }}
            onChange={(e) => {
              setNewRequest((prev) => ({ ...prev, url: e.target.value }));
            }}
          />
        </div>

        <div
          className="mt-4 h-8 w-8 bg-bgSoft flex items-center justify-center rounded-sm text-lg cursor-pointer"
          onClick={addApiSequence}
        >
          +
        </div>

        {showTooltip && (
          <div
            style={{
              position: "absolute",
              top: `${position.x - 350}px`,
              left: `${position.y + 150}px`,
              zIndex: "9999",
            }}
            className={`w-80 h-96 bg-bgDark rounded-md border border-primaryColor`}
          >
            <Tooltip
              setShowToolTip={setShowTooltip}
              appendToUrl={appendToUrl}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiInputs;
