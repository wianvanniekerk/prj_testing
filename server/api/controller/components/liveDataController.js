let latestAnalogValue = null; // Store the latest value globally
 
export const handleAnalogData = (req, res) => {
  const analogValue = req.body.Analog;
 
  if (analogValue !== undefined) {
    latestAnalogValue = analogValue; // Update the latest value
    console.log("Incoming Data!!!");
    console.log(`Received New Analog Value: ${analogValue}`);
    res.status(200).json({ Analog: analogValue });
  } else {
    console.log("No Analog value found in request");
    res.status(400).send("Bad Request: No Analog value found");
  }
};
 
export const getAnalogData = (req, res) => {
  if (latestAnalogValue !== null) {
    res.status(200).json({ Analog: latestAnalogValue });
  } else {
    res.status(404).json({ message: "No analog data available" });
  }
};