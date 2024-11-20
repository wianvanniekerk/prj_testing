import { useState, useEffect } from "react";
import PieChartSection from "./pieChartBlock";
import { fetchUserExpeditions } from "../../../../../domain/api/routes/components/expeditions";

const ExpeditionData = () => {
  const [expeditions, setExpeditions] = useState([]);
  const [selectedExpedition, setSelectedExpedition] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserExpeditions();
        setExpeditions(data);
        setSelectedExpedition(data[0] || null); 
      } catch (error) {
        console.error("Error fetching expeditions:", error.message);
        setErrorMessage("Failed to fetch expeditions.");
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (event) => {
    const expeditionId = event.target.value;
    const expedition = expeditions.find((exp) => exp._id === expeditionId);
    setSelectedExpedition(expedition || null);
  };

  return (
    <section className="expeditionInfoBlock">
      <h1>
        <u>Expedition data:</u>
      </h1>

      {errorMessage && <p className="error">{errorMessage}</p>}

      <select
        onChange={handleSelectChange}
        value={selectedExpedition?._id || ""}
      >
        <option value="">Choose an expedition</option>
        {expeditions.map((expedition) => (
          <option key={expedition._id} value={expedition._id}>
            Expedition {expedition.startTime || expedition._id}
          </option>
        ))}
      </select>
      <div className="expeditionScrollContainer">
        {!selectedExpedition ? (
          <div className="expeditionCard">
            <p>Choose an expedition to view its data.</p>
          </div>
        ) : (
          <div key={selectedExpedition._id} className="expeditionCard">
            <table>
              <tbody>
                <tr>
                  <td>Latitude:</td>
                  <td>{selectedExpedition.location?.latitude || "N/A"}</td>
                </tr>
                <tr>
                  <td>Longitude:</td>
                  <td>{selectedExpedition.location?.longitude || "N/A"}</td>
                </tr>
                <tr>
                  <td>Carbon Monoxide:</td>
                  <td>
                    {selectedExpedition.gasStats?.carbonMonoxide
                      ? Math.round(selectedExpedition.gasStats.carbonMonoxide) +
                        " ppm"
                      : "N/A"}
                  </td>
                </tr>
                <tr>
                  <td>Methane:</td>
                  <td>
                    {selectedExpedition.gasStats?.methane
                      ? Math.round(selectedExpedition.gasStats.methane) + " ppm"
                      : "N/A"}
                  </td>
                </tr>
                <tr>
                  <td>Butane:</td>
                  <td>
                    {selectedExpedition.gasStats?.butane
                      ? Math.round(selectedExpedition.gasStats.butane) + " ppm"
                      : "N/A"}
                  </td>
                </tr>
                <tr>
                  <td>Liquefied Petroleum Gas:</td>
                  <td>
                    {selectedExpedition.gasStats?.liquefiedPetroleumGas
                      ? Math.round(
                          selectedExpedition.gasStats.liquefiedPetroleumGas
                        ) + " ppm"
                      : "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {selectedExpedition && selectedExpedition.gasStats && (
          <PieChartSection expedition={selectedExpedition} />
        )}
      </div>
    </section>
  );
};

export default ExpeditionData;
