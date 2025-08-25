self.onmessage = async function(e) {
  const receivedData = e.data;
  console.log(`Worker: received ${JSON.stringify(e.data)}`);
  await new Promise(resolve => setTimeout(resolve, 5000)); // Sleep for 5 seconds
  // TODO: perform computations
  self.postMessage({ result: "Computation complete!" });
};
