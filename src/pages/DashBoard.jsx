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

const DashBoard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
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
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token]);

  const UserData = (
    <Box sx={{ textAlign: "center", marginLeft: 5 }}>
      <Typography variant="h6" sx={{ my: 2, marginTop: 7 }}>
        Users
      </Typography>
      <Divider />
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {userData.length > 0 &&
          userData.map((user,i) => (
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
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button sx={{ color: "#fff" }} onClick={logoutHandler}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        {UserData}
      </Box>
    </Box>
  );
};

export default DashBoard;
