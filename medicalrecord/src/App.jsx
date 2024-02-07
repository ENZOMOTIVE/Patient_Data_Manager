import { useEffect } from "react";
import { loadNetwork, loadProvider } from "./store/interactions";
import { useDispatch } from "react-redux";
import './App.css'
import config from "./config.json";

import Navbar from "./components/Navbar/Navbar";
import Form from "./components/Form/Form";

function App() {
  const dispatch = useDispatch();
  const loadblockchainData = async () => {
    const provider = loadProvider(dispatch);
    const chainId = await loadNetwork(provider,dispatch);
    const medical_config = config[chainId].MedicalRecords;
  };
  useEffect(() => {
    loadblockchainData();
  });

  return( <div className="App">
     <Navbar></Navbar>
     </div>)
}

export default App;