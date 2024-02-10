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
    const loadBlockchainData = async () => {
      const provider = loadProvider(dispatch);
  
      if (!provider) {
        console.error("Provider is undefined");
        return;
      }
  
      try {
        const chainId = await loadNetwork(provider, dispatch);
        const medical_config = config[chainId]?.MedicalRecords;
        if (!medical_config) {
          console.error(`Medical config not found for chainId: ${chainId}`);
          return;
        }
  
        window.ethereum.on("accountsChanged", () => {
          loadAccount(provider, dispatch);
        });
  
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
  
        // Call loadAccount and await its result
        await loadAccount(provider, dispatch);
  
        const medical = loadMedical(provider, medical_config.address, dispatch);
        loadAllData(provider, medical, dispatch);
        subscribeToEvents(medical, dispatch);
      } catch (error) {
        console.error("Error loading blockchain data:", error);
      }
    };
  
    loadBlockchainData();
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