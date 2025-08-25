import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v0.28.2/full/pyodide.mjs";

let pyodideReadyPromise = loadPyodide();

const python_script = `
    from js import arrayBuffer
    from pyodide.ffi import JsProxy
    binary_data = arrayBuffer.to_py()
    print('Python received ' + binary_data.to_string())  # binary_data.to_bytes()
    # If final statement is an expression, its value is returned to JavaScript
    'Python processing completed'
`;

self.onmessage = async (event) => {
  // make sure loading is done
  const pyodide = await pyodideReadyPromise;
  self.arrayBuffer = event.data;
  console.log(`Converting ${event.data}...`)
  const context = { data: event.data }; // expecting data to come as an ArrayBuffer
  // Now load any packages we need, run the code, and send the result back.
  await pyodide.loadPackagesFromImports(python_script);
  // make a Python dictionary with the data from `context`
  const dict = pyodide.globals.get("dict");
  const globals = dict(Object.entries(context));
  try {
    // Execute the python code in this context
    const result = await pyodide.runPythonAsync(python_script, { globals });
    self.postMessage({ data: result });
  } catch (error) {
    self.postMessage({ error: error.message });
  }
};