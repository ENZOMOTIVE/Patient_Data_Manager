import { useEffect } from "react";
import { loadNetwork, loadProvider } from "./store/interactions";
import { useDispatch } from "react-redux";
import './App.css'

import Navbar from "./components/Navbar/Navbar";
function App() {
  const dispatch = useDispatch();
  const loadblockchainData = async () => {
    const provider = loadProvider(dispatch);
    const chainId = await loadNetwork(provider,dispatch);
    
  };
  useEffect(() => {
    loadblockchainData();
  });

  return( <div className="App">
     <Navbar></Navbar>
     </div>)
}

export default App;