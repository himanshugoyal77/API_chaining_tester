import { FaRegCopy } from "react-icons/fa6";
import { useEffect, useState } from "react";
import ace from "brace";
import { JsonEditor as Editor } from "jsoneditor-react";

import "@contentful/forma-36-react-components/dist/styles.css";
import "jsoneditor-react/es/editor.min.css";
import "brace/mode/json";
import "brace/theme/github";
import Tooltip from "./Tooltip";

const ApiResponse = ({ response, body, setBody }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [key, setKey] = useState(null);
  const [activeDiv, setActiveDiv] = useState(null);

  useEffect(() => {
    //insert();
  }, []);

  useEffect(() => {
    const jsoneditorValue = document.getElementsByClassName("jsoneditor-value");

    for (let i = 0; i < jsoneditorValue.length; i++) {
      jsoneditorValue[i].addEventListener("focus", () => {
        const activeKey = Object.keys(body).find(
          (key) =>
            body[key] === jsoneditorValue[i].innerText.toString().substring(1)
        );
        setActiveDiv(jsoneditorValue[i]);
        setKey(activeKey);
        const { x, y } = jsoneditorValue[i].getBoundingClientRect();
        setPosition({
          x,
          y,
        });
        appendToolTip(x, y);
      });
    }
  }, [body]);

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
    }, 500);
  };

  const appendToBody = (key) => {
    return (value) => {
      const newBody = { ...body };
      newBody[key] = value;

      setBody(newBody);
      activeDiv.innerText = `"${value}"`;
    };
  };

  const insert = () => {
    const elements = document.getElementsByClassName(
      "jsoneditor-button jsoneditor-contextmenu-button"
    );
    if (elements.length > 0) {
      const btns = document.getElementsByClassName(
        " jsoneditor-expandable jsoneditor-expanded"
      );
      document
        .getElementsByClassName(
          "jsoneditor-button jsoneditor-contextmenu-button"
        )[0]
        .classList.add("__web-inspector-hide-shortcut__");

      for (let i = 0; i < btns.length; i++) {
        btns[i].style.display = "none";
      }

      const dragArea = document.getElementsByClassName(
        "jsoneditor-dragarea"
      )[0];

      for (let i = 0; i < dragArea?.length; i++) {
        dragArea[i].style.position = "relative";
        const deleteIcon = document.createElement("span");
        deleteIcon.classList.add("delete-icon");
        deleteIcon.innerHTML = "X";
        deleteIcon.style.position = "absolute";

        dragArea[i].appendChild(deleteIcon);
      }

      const lastElement = elements[elements.length - 1];
      lastElement.click();
      document
        .getElementsByClassName("jsoneditor-insert jsoneditor-default")[0]
        .click();
    } else {
      console.error("No elements found with the specified class");
    }
  };

  const updateBody = (e) => {
    const key = Object.keys(e)[0];
    if (!key) return;
    setBody(e);
  };

  return (
    <div className="w-full md:w-1/3 h-full flex flex-col justify-between gap-4">
      <div className="h-full request-body relative bg-bgDark rounded-md">
        <div
          className="h-1/2 flex justify-between items-center bg-bgSoft px-4 py-2 rounded-tl-md
        rounded-tr-md
        "
        >
          <h4>Request Body</h4>
          <FaRegCopy className="cursor-pointer" />
        </div>
        {
          <div className="h-[250px] overflow-y-scroll no-scrollbar">
            {
              <Editor
                mode="tree"
                history
                value={body}
                onChange={(e) => updateBody(e)}
                ace={ace}
                theme="ace/theme/github"
              />
            }
          </div>
        }
      </div>

      <div className="request-body bg-bgDark rounded-md">
        <div
          className="flex justify-between items-center bg-bgSoft px-4 py-2 rounded-tl-md
        rounded-tr-md
        "
        >
          <h4>Response</h4>
          <FaRegCopy className="cursor-pointer" />
        </div>
        <textarea
          name="body"
          disabled
          id="body"
          rows={10}
          value={JSON.stringify(response, null, 2)}
          className="overflow-y-scroll no-scrollbar bg-bgDark mt-2 rounded-bl-md rounded-br-md"
        ></textarea>
      </div>

      {showTooltip && (
        <div
          style={{
            position: "absolute",
            top: "30px",
            bottom: `${position.x}px`,
            right: `${position.y + 100}px`,
            zIndex: "9999",
          }}
          className={`w-80 h-96 bg-bgDark rounded-md border border-primaryColor`}
        >
          <Tooltip
            setShowToolTip={setShowTooltip}
            appendToUrl={appendToBody(key)}
          />
        </div>
      )}
    </div>
  );
};

export default ApiResponse;
