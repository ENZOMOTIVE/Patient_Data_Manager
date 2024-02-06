import React from "react";
import "./navbar.css";
import healthReport from "../../assets/health-report.png";
import { useDispatch, useSelector } from "react-redux";
import { loadAccount } from "../../store/interactions";

const Navbar = () => {
  const dispatch = useDispatch();
  const provider=useSelector((state)=>state.provider.connection);
  const connectHandler=async()=> {
    await loadAccount(provider,dispatch);
  }
  const networkHandler=async(e)=> {
    await window.ethereum.request({
    method:"wallet_switchEthereumChain",
    params: [
      {
        chainId: e.target.value,
      },
        ],
    });
  };
  return (
    <div className="Navbar">
        <div className="nav__name">
            <img src={healthReport} width= "40" height= "40" alt=" healthrecord_image"/>
                <h2>Medical Record Storer</h2>
        </div>
        <div className="nav__networkSelector">
            <select name="network" id="network" onCharge={networkHandler} >
                 <option value= "0" disabled>
                    Select Network
                 </option>
                 <option value="31337"> Localhost</option>
                 <option value="11155111"> Sepolia</option>
            </select>
        </div>

        <div className="nav__balance">
          <button className="nav__balance-box" onClick={connectHandler}>Connect</button>
        </div>
    </div>
    
  );
};

export default Navbar