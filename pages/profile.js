import React from "react";
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
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
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

<Parallax image="https://static.vecteezy.com/system/resources/previews/005/406/681/original/rocket-in-hole-vector.jpg">

      </Parallax>
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
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={4}>
                    <img
                      alt="..."
                      src="/img/examples/studio-1.jpg"
                      className={navImageClasses}
                    />
                    <img
                      alt="..."
                      src="/img/examples/studio-2.jpg"
                      className={navImageClasses}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <img
                      alt="..."
                      src="/img/examples/studio-5.jpg"
                      className={navImageClasses}
                    />
                    <img
                      alt="..."
                      src="/img/examples/studio-4.jpg"
                      className={navImageClasses}
                    />
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
