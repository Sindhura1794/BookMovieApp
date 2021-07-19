import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import "./Home.css";
import {
  CardContent,
  FormControl,
  TextField,
  ImageList,
  GridListTile,
  GridListTileBar,
  InputLabel,
  Input,
  MenuItem,
  Checkbox,
  Select,
  Button,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  customStyle: {
    margin: theme.spacing(1),
  },
  Typography: {
    margin: theme.spacing(2),
    color: theme.palette.primary.light,
    textTransform: "uppercase",
  },
}));

function Home() {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [movies, setMovies] = useState([]);

  const history = useHistory();

  const openDetails = (p) => {
    console.log("inside Home", p);
    history.push("/details", { details: p });
  };

  function handleFilter() {
    console.log("");
  }

  useEffect(() => {
    setIsLoaded(true);
    fetch("http://localhost:8085/api/v1/movies/")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(false);
          setMovies(result.movies);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(false);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Fragment>
        <div className="homeHeader">Upcoming Movies</div>

        <div>
          <ImageList
            rowHeight={350}
            cols={6}
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
            }}
          >
            {movies.map((p) => (
              <GridListTile key={p.id} cellHeight={250} cols={1}>
                <img src={p.poster_url} alt="" />
                <GridListTileBar title={p.title}></GridListTileBar>
              </GridListTile>
            ))}
          </ImageList>
        </div>
        <div style={{ display: "flex" }}>
          <div className="moviesContainer">
            <ImageList rowHeight={350} cols={4}>
              {movies.map((p) => (
                <GridListTile
                  key={p.id}
                  cellHeight={250}
                  cols={1}
                  onClick={() => openDetails(p)}
                >
                  <img
                    src={p.poster_url}
                    alt=""
                    style={{ cursor: "pointer" }}
                  />
                  <GridListTileBar
                    title={p.title}
                    subtitle={"Release Date: " + p.release_date}
                  ></GridListTileBar>
                </GridListTile>
              ))}
            </ImageList>
          </div>

          <div className="filterContainer">
            <Card direction="column" alignitems="center" justify="center">
              <Typography className={classes.Typography}>
                Find Movies By :
              </Typography>
              <CardContent>
                <FormControl className={classes.customStyle} fullWidth>
                  <InputLabel htmlFor="moviename"> Movie Name</InputLabel>
                  <Input name="moviename"></Input>
                </FormControl>
                <br></br>
                <FormControl className={classes.customStyle} fullWidth>
                  <InputLabel htmlFor="genre">Genre</InputLabel>
                  <Select name="genre" value="" placeholder="Genre">
                    {movies.map((p) => (
                      <MenuItem>
                        <Checkbox name={p.genres} /> {p.genres}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br></br>
                <FormControl className={classes.customStyle} fullWidth>
                  <InputLabel htmlFor="artists">Artists</InputLabel>
                  <Select
                    id="artists"
                    name="artists"
                    value=""
                    placeholder="Artists"
                  >
                    {movies.map((p) => (
                      <MenuItem>
                        <Checkbox name={p.artists} />
                        {p.artists}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br></br>
                <FormControl className={classes.customStyle} fullWidth>
                  <TextField
                    id="release-date-start"
                    label="Release Date Start"
                    type="date"
                    placeholder="dd-mm-yyyy"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
                <FormControl className={classes.customStyle} fullWidth>
                  <TextField
                    id="release-date-start"
                    label="Release Date End"
                    type="date"
                    placeholder="dd-mm-yyyy"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.customStyle}
                  onSubmit={handleFilter}
                  fullWidth
                >
                  APPLY
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Home;
