import React, { useState } from "react";
import ApiInputs from "./ApiInputs";
import ApiResponse from "./ApiResponse";

const ApiChainBuilder = () => {
  const [response, setResponse] = useState({});
  const [body, setBody] = useState({});

  return (
    <div className="api-section flex flex-col w-full md:w-3/4 p-4">
      <div className="flex items-center justify-between">
        <h2>New Test Case</h2>
      </div>

      <div className="mt-4 h-full flex flex-col  md:flex-row items-start gap-4">
        <ApiInputs {...{ response, setResponse, body }} />
        <ApiResponse {...{ response, setBody, body }} />
      </div>
    </div>
  );
};

export default ApiChainBuilder;
