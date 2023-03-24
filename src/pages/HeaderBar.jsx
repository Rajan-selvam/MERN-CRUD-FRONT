import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const HeaderBar = () => {
  const navigate = useNavigate();
  return (
    <Box>
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
            onClick={() => navigate("/")}
          >
            Product List
          </Typography>
          <IconButton
            sx={{ color: "white" }}
            aria-label="add to shopping cart"
            onClick={() => navigate("cart")}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
};

export default HeaderBar;
