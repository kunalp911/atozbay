import React from "react";
import logos from "../../../Assets/image/bay.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { makeStyles } from "@material-ui/core";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import "../selling.css";
import { getToken } from "../../../Helper/Storage";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    //   color: theme.palette.text.secondary,

    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  selected: {
    border: `2px solid black`,
  },
}));

const conditions = [
  {
    label: "New",
    description:
      "Brand new, unworn and defect-free with original box, packaging, and accessories.",
  },
  {
    label: "Used",
    description:
      "Brand new, unworn, and defect-free with all accessories but missing the original box.",
  },
  {
    label: "New with defects",
    description:
      "Brand new and unworn with missing accessories or defects (scuffs, marks, manufacturing flaws, cuts, damaged box, etc.).",
  },
  {
    label: "Pre-owned",
    description: "Used, worn, or has signs of wear on any part.",
  },
];

const SelectCondition = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const token = getToken();
  const [selected, setSelected] = React.useState(null);
  const [conditionName, setConditionName] = React.useState("");

  // console.log(fitName);
  const handleSelectValue = (value) => {
    setConditionName(value);
  };

  const handleSelect = (index) => {
    setSelected(index);
  };

  const handleSubmit = () => {
    if (token) {
      navigate("/add-product", {
        state: {
          condition: conditionName,
        },
      });
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="container col-12 d-flex justify-content-between border-bottom">
        <ArrowBackIosIcon
          onClick={() => navigate("/selling")}
          style={{ cursor: "pointer", margin: "20px 0px" }}
        />
        <img
          src={logos}
          alt="logo"
          width={125}
          style={{ margin: "20px 0px" }}
          onClick={() => navigate("/")}
        />
        <p></p>
      </div>
      <Container maxWidth="sm" sx={{ mt: 2, mb: 3 }}>
        <Box mb={4}>
          <Typography sx={{ fontWeight: "600", fontSize: "20px" }} gutterBottom>
            Select condition
          </Typography>
          {/* <Typography variant="body2" color="textSecondary">
            Disclose all defects to prevent returns and earn better feedback.{" "}
            <a href="#examples-of-defects">Examples of defects</a>.
          </Typography> */}
        </Box>
        <Grid container spacing={3}>
          {conditions.map((condition, index) => (
            <Grid item xs={12} key={index}>
              <Paper
                className={`${classes.paper} ${
                  selected === index ? classes.selected : ""
                }`}
                onClick={() => {
                  handleSelect(index);
                  handleSelectValue(condition.label);
                }}
              >
                <Typography sx={{ fontWeight: "600" }}>
                  {condition.label}
                </Typography>
                <Typography sx={{ fontSize: "12px" }}>
                  {condition.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Box mt={4}>
          <button
            className="btn btn-continess"
            disabled={!conditionName}
            onClick={handleSubmit}
          >
            Continue
          </button>
        </Box>
      </Container>
    </div>
  );
};

export default SelectCondition;
