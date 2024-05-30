import React, { useState, useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { getUserAuthority } from "./profile";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./WorkoutDetails.css";

//invoice

//mui

import {
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  TextField,
  Button,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import AlarmIcon from "@mui/icons-material/Alarm";
import InfoIcon from "@mui/icons-material/Info";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import DescriptionIcon from "@mui/icons-material/Description";
import ReceiptIcon from "@mui/icons-material/Receipt";

//mui
const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    issue: "",
    updatedAmount: "",
    updatedDate: "",
  });
  const [info, setInfo] = useState(false);
  const [limit, setLimit] = useState(false);
  const [visible, setVisible] = useState(false);
  const [userAuthority, setUserAuthority] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLimitInput, setShowLimitInput] = useState(false);
  const [limitInput, setLimitInput] = useState("");
  const [invoice, setInvoice] = useState(false);

  useEffect(() => {
    const fetchUserAuthority = async () => {
      try {
        if (!user || !user.email) {
          return;
        }

        setLoading(true);
        const authority = await getUserAuthority(user.email); // Call getUserAuthority with user's email
        setUserAuthority(authority);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserAuthority();
  }, [user]); // Fetch authority whenever user object changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(`/datas/${workout._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  const handleAddClick = () => {
    setShowForm(true);
    setVisible(true);
  };

  //mui

  const closePopup = () => {
    setVisible(false);
  };

  const openLimit = () => {
    setLimit(true);
    setShowLimitInput(true);
  };

  const closeLimit = () => {
    setLimit(false);
  };

  const openInfo = () => {
    setInfo(true);
  };

  const closeInfo = () => {
    setInfo(false);
  };

  const openInvoice = () => {
    setInvoice(true);
  };
  const closeInvoice = () => {
    setInvoice(false);
  };
  //mui

  const handleLimitUpdate = async () => {
    if (!user || !limitInput) {
      return;
    }

    try {
      const response = await fetch(`/datas/updatelimit/${workout._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ limit: limitInput }),
      });
      console.log(limitInput);

      if (response.ok) {
        alert("Limit updated successfully!");
        setLimit(false);
        setLimitInput("");
      } else {
        const json = await response.json();
        console.error("Failed to update limit:", json);
        // Handle error case
      }
    } catch (error) {
      console.error("Failed to update limit:", error.message);
      // Handle error case
    }
  };

  const handleInsertClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(`/datas/${workout._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(formData),
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_WORKOUT", payload: json });
      setFormData({ issue: "", updatedAmount: "", updatedDate: "" });
      setShowForm(false);
    }
  };

  return (
    <>
      <div className="bg">
        <div className=" cardstyle">
          <div className="imgcontain">
            {workout.image && (
              <img
                src={`data:image/png;base64, ${workout.image}`}
                alt="Product"
                className="img-thumbnail image"
              />
            )}
          </div>
          <p className="title">{workout.name}</p>
          {/* Conditionally render elements based on user's authority */}
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <>
              {userAuthority === "authorised" && (
                <div className="cardIcon">
                  <CardActions disableSpacing>
                    <IconButton aria-label="add" onClick={handleAddClick}>
                      <AddIcon />
                    </IconButton>
                    <IconButton aria-label="edit">
                      <Link to={`/update/${workout._id}`} className="edit">
                        {" "}
                        <EditIcon />
                      </Link>
                    </IconButton>
                    <IconButton aria-label="delete" onClick={handleClick}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="alert" onClick={openLimit}>
                      <ProductionQuantityLimitsIcon />
                    </IconButton>
                    <IconButton aria-label="expand" onClick={openInfo}>
                      <ExpandMore />
                    </IconButton>

                    {/* invoice */}
                    {/* Generate Invoice button */}
                  </CardActions>
                </div>
              )}
            </>
          )}
        </div>

        <Dialog
          open={info}
          onClose={closeInfo}
          fullWidth
          maxWidth="xs"
          className="boxbg"
        >
          <div className="box1">
            <DialogTitle>
              <IconButton style={{ float: "right" }}>
                <CloseIcon color="dark" onClick={closeInfo}></CloseIcon>
              </IconButton>
            </DialogTitle>

            <DialogContent>
              <div className="box5">
                <Stack>
                  {workout.image && (
                    <img
                      src={`data:image/png;base64, ${workout.image}`}
                      alt="Product"
                      className="img-thumbnail image"
                    />
                  )}

                  <Typography variant="h4" className="text">
                    {workout.name}
                  </Typography>
                  <Typography className="text">
                    <strong>MODEL: </strong>
                    {workout.model}
                  </Typography>
                  <Typography className="text">
                    <strong>AMOUNT: </strong>
                    {workout.amount}
                  </Typography>
                  <Typography className="text">
                    <strong>COUNT: </strong>
                    {workout.count}
                  </Typography>
                  <Typography className="text">
                    <strong>PLACE: </strong>
                    {workout.place}
                  </Typography>
                  <Typography className="text">
                    <strong>WARRANTY DATE: </strong>
                    {workout.warentty_date}
                  </Typography>
                  <Typography className="text">
                    <strong>TOTAL AMOUNT: </strong>
                    {workout.totamount}
                  </Typography>

                  {workout.issue && (
                    <Typography className="text">
                      <Typography variant="h4">Updated Details:</Typography>
                      <strong>Issue: </strong>
                      {workout.issue}
                    </Typography>
                  )}
                  {workout.updatedAmount && (
                    <Typography className="text">
                      <strong>Updated Amount: </strong>
                      {workout.updatedAmount}
                    </Typography>
                  )}
                  {workout.updatedDate && (
                    <Typography className="text">
                      <strong>Updated Date: </strong>
                      {workout.updatedDate}
                    </Typography>
                  )}
                  <IconButton aria-label="expand" onClick={openInvoice}>
                    <ReceiptIcon />
                    <Typography>Invoice</Typography>
                  </IconButton>
                  <Typography className="text">
                    {formatDistanceToNow(new Date(workout.createdAt), {
                      addSuffix: true,
                    })}
                  </Typography>
                </Stack>
              </div>
            </DialogContent>
          </div>
        </Dialog>
        {/* invoice */}
        <Dialog
          open={invoice}
          onClose={closeInvoice}
          fullWidth
          maxWidth="sm"
          className="boxbg"
        >
          <DialogTitle>
            Product Receipt
            <IconButton style={{ float: "right" }}>
              <CloseIcon color="dark" onClick={closeInvoice}></CloseIcon>
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {workout.invoice && (
              <img
                src={`data:image/png;base64, ${workout.invoice}`}
                alt="invoice"
                className="img-thumbnail image"
              />
            )}
          </DialogContent>
        </Dialog>
        {/* invoice */}

        <Dialog
          open={limit}
          onClose={closeLimit}
          fullWidth
          maxWidth="sm"
          className="boxbg"
        >
          <DialogTitle>
            Update Limit
            <IconButton style={{ float: "right" }}>
              <CloseIcon color="dark" onClick={closeLimit}></CloseIcon>
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {showLimitInput && (
              <Stack spacing={2} margin={2}>
                <TextField
                  type="text"
                  id="limitInput"
                  name="limit"
                  value={limitInput}
                  onChange={(e) => setLimitInput(e.target.value)}
                  label="Limit"
                  variant="outlined"
                />
              </Stack>
            )}
            <DialogActions>
              <Button onClick={closeLimit}>Cancel</Button>
              <Button
                color="success"
                variant="contained"
                onClick={handleLimitUpdate}
              >
                Update Limit
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>

        <Dialog
          open={visible}
          onClose={closePopup}
          fullWidth
          maxWidth="sm"
          className="boxbg"
        >
          <div className="box1">
            <DialogTitle>
              Update Details{" "}
              <IconButton style={{ float: "right" }}>
                {" "}
                <CloseIcon color="dark" onClick={closePopup}></CloseIcon>
              </IconButton>{" "}
            </DialogTitle>
            <DialogContent>
              {showForm && (
                <Stack spacing={2} margin={2}>
                  <TextField
                    type="text"
                    id="outlined-multiline-flexible"
                    name="issue"
                    value={formData.issue}
                    onChange={handleInputChange}
                    label="Issue"
                    variant="outlined"
                    multiline
                    maxRows={4}
                  />

                  <TextField
                    type="text"
                    id="updatedAmount"
                    name="updatedAmount"
                    value={formData.updatedAmount}
                    onChange={handleInputChange}
                    label="Updated Amount"
                    variant="outlined"
                  />

                  <TextField
                    type="date"
                    id="updatedDate"
                    name="updatedDate"
                    value={formData.updatedDate}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Stack>
              )}

              <DialogActions>
                <Button onClick={closePopup}>Cancel</Button>
                <Button
                  color="success"
                  variant="contained"
                  onClick={handleInsertClick}
                >
                  Update
                </Button>
              </DialogActions>
            </DialogContent>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default WorkoutDetails;
