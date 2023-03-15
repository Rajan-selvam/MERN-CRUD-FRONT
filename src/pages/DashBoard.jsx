import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import avatar from "../img/avatar.jpeg";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Input, Modal } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DashBoard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [openModal, setOpenModal] = useState();
  const [updateID, setUpdateID] = useState();

  const token = localStorage.getItem("token");
  useEffect(() => {
    axios("http://localhost:8080/api/users ", {
      method: "GET",
      headers: {
        token,
      },
    })
      .then((res) => {
        const { users } = res.data;
        setUserData(users);
        setFilteredData(users);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token]);

  const deleteHandler = (id) => {
    axios(`http://localhost:8080/api/user/${id}`, {
      method: "DELETE",
      headers: {
        token,
      },
    }).then((res) => {
      const { message } = res.data;
      alert(message);
    });
  };
  const updateHandler = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get("password") !== data.get("confirmPassword")) {
      return alert("Password Mismatch");
    }
    const apiData = {
      name: data.get("name"),
      userName: data.get("userName"),
      dateOfBirth: data.get("dateOfBirth"),
      mobileNumber: data.get("mobileNumber"),
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
    };
    axios
      .put(`http://localhost:8080/api/user/${updateID}`, apiData, {
        headers: {
          token,
        },
      })
      .then((res) => {
        console.log(res);
      });
  };
const modalOpenHandler = (id) => {
  setOpenModal(true);
  setUpdateID(id);
} 
  const UserData = (
    <Box sx={{ textAlign: "center", marginLeft: 5 }}>
      <Typography variant="h6" sx={{ my: 2, marginTop: 1 }}>
        Users
      </Typography>
      <Divider />
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {filteredData.length > 0 &&
          filteredData.map((user, i) => (
            <ListItem alignItems="flex-start" key={i}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={user.name?.toUpperCase()}
                secondary={
                  <>
                    <div>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Email : {user.email}
                      </Typography>
                    </div>
                    <div>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        dateOfBirth : {user.dateOfBirth}
                      </Typography>
                    </div>
                    <div>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Mobile Number : {user.mobileNumber}
                      </Typography>
                    </div>
                    <div>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Identity : {user._id}
                      </Typography>
                    </div>
                    <div>
                      <Typography
                        sx={{
                          display: "inline",
                          color: "red",
                          cursor: "pointer",
                        }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                        onClick={() => deleteHandler(user._id)}
                      >
                        remove
                      </Typography>
                    </div>
                    <div>
                      <button onClick={() => modalOpenHandler(user._id)}>Update</button>
                    </div>
                  </>
                }
              />
            </ListItem>
          ))}
      </List>
    </Box>
  );

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/sign-in");
  };
  const searchHandler = (e) => {
    const val = e.target.value.toLowerCase();
    const filteredData = userData?.filter((user) => {
      return user.name.toLowerCase().includes(val);
    });
    setFilteredData(filteredData);
  };

  const selectHandler = (e) => {
    const val = e.target.value.toLowerCase();
    const filteredData = userData?.filter((user) => {
      return user.name.toLowerCase().includes(val);
    });
    setFilteredData(filteredData);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            User List
          </Typography>
          {/* <Search onChange={(e) => searchHandler(e.target.value)}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange
            />
          </Search> */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button sx={{ color: "#fff" }} onClick={logoutHandler}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <Box component="main" sx={{ p: 5, marginTop: 5 }}>
          <Input placeholder="Search" onChange={searchHandler} />
          <select onChange={selectHandler}>
            <option value="">Select</option>
            {userData?.map((user) => (
              <option value={user.name} key={user.name}>
                {user.name}
              </option>
            ))}
          </select>
        </Box>
        {UserData}
      </Box>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component="form"
            noValidate
            onSubmit={updateHandler}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="userName"
                  required
                  fullWidth
                  id="userName"
                  label="userName"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  type="date"
                  name="dateOfBirth"
                  style={{ width: "100%", height: "40px" }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="number"
                  label="Mobile Number"
                  name="mobileNumber"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default DashBoard;
