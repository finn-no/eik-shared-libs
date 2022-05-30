import ReactDOM from "react-dom/server.node";

export default ReactDOM;
export const {
  version,
  renderToString,
  renderToStaticMarkup,
  renderToStaticNodeStream,
  renderToPipeableStream,
  renderToNodeStream,
} = ReactDOM;
// This file exists simply to apply __esModule: true to the module
export const __esModule = true;
