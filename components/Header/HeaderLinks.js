/*eslint-disable*/
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@material-ui/core/IconButton";
import PersonPinIcon from "@mui/icons-material/PersonPin";

// core components
import CustomDropdown from "/components/CustomDropdown/CustomDropdown.js";
import Button from "/components/CustomButtons/Button.js";

import styles from "/styles/jss/nextjs-material-kit/components/headerLinksStyle.js";

import { truncateEthAddress } from "../../utils/truncAddress";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const [address, setAddress] = useState(null);
  useEffect(() => {
    const addr = localStorage.getItem("walletAddress");
    setAddress(addr);
  }, []);

  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const classes = useStyles();

  const disconnectWallet = async () => {
    localStorage.removeItem("walletAddress");
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Please Install MetaMask");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setIsWalletConnected(true);
      setWalletAddress(accounts[0]);

      localStorage.setItem("walletAddress", accounts[0]);
      setAddress(accounts[0]);
      // router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        {address ? (
          <>
            <Button
              type="button"
              onClick={disconnectWallet}
            >
              {truncateEthAddress(address)}
              &nbsp;&nbsp;&nbsp;<LogoutIcon />
            </Button>

            <Link href="/profile">
              <a target="_blank">
                <Button
                  type="button"
                >
                  <PersonPinIcon />
                </Button>
              </a>
            </Link>
          </>
        ) : (
          <Button
            type="button"
            // className="bg-[#1E50FF] outline-none border-none py-3 px-5 rounded-xl font-body cursor-pointer  duration-250 ease-in-out hover:transform-x-1 hover:drop-shadow-xl hover:shadow-sky-600 w-full mt-8 transition transform hover:-translate-y-3 motion-reduce:transition-none motion-reduce:hover:transform-none "
            onClick={connectWallet}
          >
            Connect Wallet
          </Button>
        )}
      </ListItem>
    </List>
  );
}
