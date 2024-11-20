import { useEffect, useState } from "react";
import { addExpedition, deleteExpedition, fetchUserExpeditions, updateExpedition } from "../../domain/api/routes/components/expeditions";

const useExpeditionActions = () => {
  const [expeditions, setExpeditions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserExpeditions();
        setExpeditions(data);
      } catch (error) {
        console.error("Error fetching expeditions:", error.message);
        setErrorMessage("Failed to fetch expeditions.");
      }
    };

    fetchData();
  }, []);

  const handleAdd = async (expedition) => {
    try {
      setErrorMessage("");
      setSuccessMessage("");
      await addExpedition(expedition);
      setSuccessMessage("Expedition added successfully!");

      const data = await fetchUserExpeditions();
      setExpeditions(data);
    } catch (error) {
      console.error("Error adding expedition:", error.message);
      setErrorMessage("Failed to add expedition.");
    }
  };

  const handleUpdate = async (expedition) => {
    try {
      setErrorMessage("");
      setSuccessMessage("");
      await updateExpedition(expedition._id, expedition);
      setSuccessMessage("Expedition updated successfully!");
    } catch (error) {
      console.error("Error updating expedition:", error.message);
      setErrorMessage("Failed to update expedition.");
    }
  };

  const handleDelete = async (expeditionId) => {
    try {
      setErrorMessage("");
      setSuccessMessage("");

      await deleteExpedition(expeditionId);

      setExpeditions((prev) =>
        prev.filter((expedition) => expedition._id !== expeditionId)
      );
      setSuccessMessage("Expedition removed successfully!");
    } catch (error) {
      console.error("Error removing expedition:", error.message);
      setErrorMessage("Failed to remove expedition.");
    }
  };

  return {
    expeditions,
    errorMessage,
    successMessage,
    handleAdd,
    handleUpdate,
    handleDelete,
  };
};

export default useExpeditionActions;
