import { useState } from "react";

const ObjectViewer = ({ obj, closeToolTip, appendToUrl }) => {
 
  const [selectedKeyValue, setSelectedKeyValue] = useState(null);

  // Recursive function to display nested objects or arrays
  const displayObject = (obj) => {
    return Object.keys(obj).map((key) => {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        return (
          <div key={key} className="nested">
            <strong onClick={() => handleClick(key, obj[key])}>
              {key}: (object/array)
            </strong>
            <div>{displayObject(obj[key])}</div>
          </div>
        );
      } else {
        return (
          <div
            key={key}
            className="clickable"
            onClick={() => handleClick(key, obj[key])}
          >
            <strong>{key}:</strong> {obj[key]}
          </div>
        );
      }
    });
  };

  const handleClick = (key, value) => {
    appendToUrl(value);
    setSelectedKeyValue({ key, value });
    closeToolTip();
  };

  return (
    <div>
      <div id="objectDisplay">{displayObject(obj)}</div>
    </div>
  );
};

export default ObjectViewer;
