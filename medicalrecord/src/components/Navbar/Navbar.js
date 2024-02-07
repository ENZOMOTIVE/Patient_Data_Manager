import React from "react";
import "./navbar.css";
import healthReport from "../../assets/health-report.png";
import { useDispatch, useSelector } from "react-redux";
import { loadAccount } from "../../store/interactions";
import Blockies from "react-blockies";
import config from "../../config.json";

const Navbar = () => {
  const dispatch = useDispatch();
  const provider=useSelector((state)=>state.provider.connection);
  const account = useSelector((state) => state.provider.account);
  const balance = useSelector((state) => state.provider.balance);
  const chainId = useSelector((state) => state.provider.chainId);

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
            <select name="network" id="network" onCharge={networkHandler} value={config[chainId] ? `0x${chainId.toString(16)}` : `0`}>
                 <option value= "0" disabled>
                    Select Network
                 </option>
                 <option value="31337"> Localhost</option>
                 <option value="11155111"> Sepolia</option>
            </select>
        </div>

        <div className="nav__balance">
          {balance ? (
            <p className="nav__myBalance">
              <small>My Balance: </small>
              {Number(balance).toFixed(4)}
            </p>
          ) : (
            <p className="nav__myBalance">
              <small>My Balance: </small>0 ETH
            </p>
          )}
          {account ? (
            <a className="nav__myAccount" href="#">
              <Blockies 
                seed={account}
                size={10}
                scale={3}
                color="2187D0"
                bgColor="#F1F2F9"
                spotColor="#767f92"
                className="identicon"
                    />
              {account.slice(0,5) + "...." + account.slice(38,42)}
              
            </a>
          ):(
            <button className="nav__balance-box" onClick={connectHandler}>Connect</button>
          )}
          
        </div>
    </div>
    
  );
};

export default Navbar;