import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./App.css";

const App = () => {
  const [data, dataSet] = useState({});
  const [columns, columnsSet] = useState([]);

  useEffect(() => {
    chrome.runtime.sendMessage(
      {
        type: "performance:metrics:request",
      },
      (d) => {
        dataSet(d);
        const keys = {};
        Object.values(d).forEach((val) => {
          Object.keys(val).forEach((k) => (keys[k] = true));
        });
        columnsSet(Object.keys(keys));
      }
    );
  }, []);

  return (
    <div>
      <h1>Page Ranks</h1>
      <table>
        <thead>
          <tr>
            <th width="20%"></th>
            {columns.map((k) => (
              <th key={k} width={`${80 / columns.length}%`}>
                {k}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((url) => (
            <tr key={url}>
              <td width="20%">{url.slice(0, 30)}</td>
              {columns.map((k) => (
                <td key={[url, k].join("")} width={`${80 / columns.length}%`}>
                  {Math.round((data[url][k] || { average: 0 }).average)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
