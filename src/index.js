import React, { useState } from "react";
import ReactDOM from "react-dom";
import nameGenerator from "@stackbit/artisanal-names";
import Clipboard from "react-clipboard-polyfill";

import "fontsource-roboto";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";

import { FileCopy, Close , Refresh, GitHub } from "@material-ui/icons";
const useStyles = makeStyles({
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 450,
  },
  copy: {
    display: "inline",
    padding: 5,
  },
});
const meta = {
  title: "Sublime-lucy",
  description: "This is a working title generator for your next project",
  date: "2020",
};
const App = () => {
  const classes = useStyles();
  const [name, setName] = useState(nameGenerator.generate());
  const [copyed, setCopyed] = useState(false);
  const onCopy = () => setCopyed(true);
  const handleClose = () => setCopyed(false);
  return (
    <>
      <CssBaseline />
      <Grid item xs={12} md={12}>
        <CardActionArea component="a" href="#">
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography component="h2" variant="h5">
                  {meta.title} 
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {meta.description} - {meta.date} - <GitHub style={{ fontSize: 16 }} /> <Link color="inherit" href="https://github.com/zsim0n/sublime-lucy">GitHub repo</Link>
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  {name}
                  <Clipboard
                    text={name}
                    onCopy={onCopy}
                    className={classes.copy}
                  >
                    <FileCopy style={{ fontSize: 12 }} color="action" />{" "}
                  </Clipboard>
                  <Snackbar
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    open={copyed}
                    autoHideDuration={1000}
                    onClose={handleClose}
                    message="Copied to clipboard!"
                    action={
                      <>
                        <IconButton
                          size="small"
                          aria-label="close"
                          color="inherit"
                          onClick={handleClose}
                        >
                          <Close fontSize="small" />
                        </IconButton>
                      </>
                    }
                  />
                </Typography>
                <Button
                  variant="contained" color="primary" disableElevation  startIcon={<Refresh />}
                  onClick={() => setName(nameGenerator.generate())}
                >
                  Click!
                </Button>
              </CardContent>
            </div>
            <Hidden xsDown>
              <CardMedia
                className={classes.cardMedia}
                image="https://picsum.photos/640/360"
                title="https://picsum.photos/640/360"
              />
            </Hidden>
          </Card>
        </CardActionArea>
      </Grid>
    </>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
