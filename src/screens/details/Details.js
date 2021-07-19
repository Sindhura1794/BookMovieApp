import React, { Fragment } from "react";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { withStyles } from "@material-ui/styles";
import Rating from "@material-ui/lab/Rating";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  Typography,
} from "@material-ui/core";
import "./Details.css";
import YouTube from "react-youtube";

function Details(props) {
  const details = props.location.state.details;
  console.log(details);

  let videoCode;
  if (details.trailer_url) {
    videoCode = details.trailer_url.split("v=")[1].split("&")[0];
  }

  const opts = {
    height: "350",
    width: "95%",
    playerVars: {
      autoplay: 1,
    },
  };

  function _onReady(e) {
    // access to player in all event handlers via event.target
    e.target.pauseVideo();
  }

  const StyledRating = withStyles({
    icon: {
      color: "black",
    },
    iconFilled: {
      color: "yellow",
    },
    iconHover: {
      color: "yellow",
    },
  })(Rating);

  return (
    <Fragment>
      <div className="backButton">
        <Typography variant="button">&lt; Back to Home</Typography>
      </div>
      <div className="wrapper">
        <div className="poster">
          <img src={details.poster_url} alt={details.title}></img>
        </div>
        <div className="description">
          <Typography variant="h2">{details.title} </Typography>
          <Typography style={{ fontWeight: "bold" }}>
            Genre: &nbsp;
            {
              <Typography style={{ display: "inline-block" }}>
                {details.genres}
              </Typography>
            }
          </Typography>
          <Typography style={{ fontWeight: "bold" }}>
            Duration: &nbsp;
            {
              <Typography style={{ display: "inline-block" }}>
                {details.duration}
              </Typography>
            }
          </Typography>
          <Typography style={{ fontWeight: "bold" }}>
            Release Date: &nbsp;
            {
              <Typography style={{ display: "inline-block" }}>
                {details.release_date}
              </Typography>
            }
          </Typography>
          <Typography style={{ fontWeight: "bold" }}>
            Rating: &nbsp;
            {
              <Typography style={{ display: "inline-block" }}>
                {details.rating}
              </Typography>
            }
          </Typography>
          <Typography style={{ fontWeight: "bold", marginTop: "16px" }}>
            Plot: &nbsp;
            {
              <Typography style={{ display: "inline-block" }}>
                <a href={details.wiki_url}>(Wiki Link) </a>
                {details.storyline}
              </Typography>
            }
          </Typography>
          <Typography style={{ fontWeight: "bold", marginTop: "16px" }}>
            Trailer: &nbsp;
            <YouTube
              videoId={videoCode}
              opts={opts}
              onReady={_onReady}
            ></YouTube>
          </Typography>
        </div>
        <div className="rating">
          <Typography style={{ fontWeight: "bold" }}>
            Rate this movie: &nbsp;
            {
              <div>
                <StyledRating
                  name="customized-color"
                  defaultValue={0}
                  getLabelText={(value) =>
                    `${value} Heart${value !== 1 ? "s" : ""}`
                  }
                  precision={1.0}
                  icon={<StarBorderIcon color="black" fontSize="inherit" />}
                />
              </div>
            }
          </Typography>
          <Typography style={{ fontWeight: "bold", marginTop: "16px" }}>
            Artists: &nbsp;
          </Typography>
          <div>
            <GridList cellHeight={200} cols={2}>
              {details.artists.map((p) => (
                <GridListTile cellHeight={250} cols={1}>
                  <img
                    src={p.profile_url}
                    alt=""
                    style={{ cursor: "pointer" }}
                  />
                  <GridListTileBar title={p.first_name}></GridListTileBar>
                </GridListTile>
              ))}
            </GridList>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Details;
