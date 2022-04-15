import { getCLS, getFCP, getFID, getLCP, getTTFB } from "web-vitals";

const infoDiv = document.createElement("div");
infoDiv.style.position = "absolute";
infoDiv.style.left = 0;
infoDiv.style.top = 0;
infoDiv.style.zIndex = 10000;
infoDiv.style.backgroundColor = "black";
infoDiv.style.color = "white";
infoDiv.style.padding = "1rem";
infoDiv.style.padding = "Arial";
infoDiv.style.display = "grid";
infoDiv.style.gridTemplateCelumns = "repeat(2,1fr)";
infoDiv.style.gridColumnGap = "1rem";
document.body.appendChild(infoDiv);

const metrics = {};

const gatherMetrics = ({ name, value }) => {
  metrics[name] = value;
  infoDiv.innerHTML = Object.keys(metrics)
    .map((k) => `<div>${k}</div><div>${Math.round(metrics[k])}</div>`)
    .join("");

  chrome.runtime.sendMessage({
    type: "performance:metrics",
    name,
    value,
  });
};

getCLS(gatherMetrics);
getFCP(gatherMetrics);
getFID(gatherMetrics);
getLCP(gatherMetrics);
getTTFB(gatherMetrics);
