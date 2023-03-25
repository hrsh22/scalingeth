import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "../components/Header/Header.js";
import Footer from "../components/Footer/Footer.js";
import Button from "../components/CustomButtons/Button.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import NavPills from "../components/NavPills/NavPills.js";
import Parallax from "../components/Parallax/Parallax.js";

import styles from "../styles/jss/nextjs-material-kit/pages/profilePage.js";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();

  const [nftList, setNFTList] = useState([]);
  const [nftImage, setNFTImage] = useState([]);
  const [nftData, setNFTData] = useState([]);

  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  const parseURL = async (url) => {
    const data = await fetch(url);
    const json = await data.json();
    console.log(json);
    return json;
  };

  const getImage = (url) => {
    let image = url;
    image = image.toString();
    console.log(image.slice(7, 66));
    // https://bafyreiearcor5tvq7jiqsmx6teotmcaibqn7k6waqigibnemxzif5pjvsq.ipfs.nftstorage.link/metadata.json
    return "https://" + image.slice(7, 66) + ".ipfs.nftstorage.link/image.jpg";
  };
  async function fetchData() {
    try {
      const addr = localStorage.getItem("walletAddress");

      const response = await axios.get(
        `http://nftmintapi-production.up.railway.app/api/ERC721Transfers?owner=${addr}`
      );
      console.log(response.data.allNFTs.length);
      var dataList = [];
      var imgList = [];
      for (var i = 0; i < response.data.allNFTs.length; i++) {
        var data = await parseURL(response.data.allNFTs[i].tokenURI);
        var image = getImage(data.image);
        console.log(data);
        dataList.push(data);
        imgList.push(image);
      }
      setNFTList(response.data.allNFTs);
      setNFTData(dataList);
      console.log(dataList);
      setNFTImage(imgList);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Header
        color="transparent"
        brand="MintBoxx 📦"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />

      <Parallax image="https://static.vecteezy.com/system/resources/previews/005/406/681/original/rocket-in-hole-vector.jpg"></Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLDERscs5d-zl6ao7Gp7c1nRJlSVFtWpzT3t180tFNg_UP_YLx1YXMOOMLJGCasvy0gho&usqp=CAU"
                      alt="..."
                      className={imageClasses}
                    />
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            {nftData.length > 0 && (
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                  <GridContainer justify="center">
                    {nftList.map((item, key) => (
                      <>
                        <GridItem xs={12} sm={12} md={6}>
        
                          <h6>{nftData[key].name}</h6>
                          <img
                            alt="..."
                            src={nftImage[key]}
                            className={navImageClasses}
                          />
                        </GridItem>
                      </>
                    ))}
                  </GridContainer>
                </GridItem>
              </GridContainer>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
