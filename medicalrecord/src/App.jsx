import { useEffect } from "react";
import { loadProvider } from "./store/interactions";
import { useDispatch } from "react-redux";
import './App.css'

function App() {
  const dispatch = useDispatch();
  const loadblockchainData = async () => {
    const provider = loadProvider(dispatch);
    console.log(provider);
  };
  useEffect(() => {
    loadblockchainData();
  });

  return <div className="App"> The blockchain century</div>
}

export default App;