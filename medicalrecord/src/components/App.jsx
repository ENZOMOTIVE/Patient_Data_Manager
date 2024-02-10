import { Route, Routes } from "react-router-dom";
import "../App.css";
import Data from "./Data/Data";
import Form from "./Form/Form";
import Navbar from "./Navbar/Navbar";
import Option from "./Option/Option";
import React ,{ useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  loadAccount,
  loadAllData,
  loadMedical,
  loadNetwork,
  loadProvider,
  subscribeToEvents,
} from "../store/interactions";

import config from "../config.json";
import Alert from "./Alert/Alert";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeBlockchainData = async () => {
      // Load provider and network information
      const provider = loadProvider(dispatch);
      if (!provider) {
        console.error("Provider is undefined");
        return;
      }
      const chainId = await loadNetwork(provider, dispatch);

      // Set up event listeners
      window.ethereum.on("accountsChanged", () => {
        loadAccount(provider, dispatch);
      });
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });

      // Load account and medical data
      await loadAccount(provider, dispatch);
      const medicalConfig = config[chainId]?.MedicalRecords;
      if (!medicalConfig) {
        console.error(`Medical config not found for chainId: ${chainId}`);
        return;
      }
      const medical = loadMedical(provider, medicalConfig.address, dispatch);
      loadAllData(provider, medical, dispatch);
      subscribeToEvents(medical, dispatch);
    };

    initializeBlockchainData();
  }, [dispatch]);

  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
        <Option />
        <Routes>
          <Route path="/" exact element={<Form />} />
          <Route path="/Data" element={<Data />} />
        </Routes>
        <Alert />
      </div>
    </div>
  );
}

export default App;