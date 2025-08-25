self.onmessage = async function(e) {
  const receivedData = e.data;
  if (e.data instanceof ArrayBuffer) {
        const uint8Array = new Uint8Array(e.data);
        const hexString = Array.from(uint8Array)
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join(' ');
        console.log('Worker: received binary (ArrayBuffer) as hex ', hexString);
  } else {
    console.log(`Worker: received ${JSON.stringify(e.data)}`);
  }
  await new Promise(resolve => setTimeout(resolve, 2000)); // Sleep for 2 seconds
  // TODO: perform computations
  self.postMessage({ result: "Computation complete!" });
};
