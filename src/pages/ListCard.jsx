import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Modal } from "@mui/material";
import sampleData from "../utils/data.json";
import "../style.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addBilling,
  addCart,
  updateCart,
  removeCart,
} from "../store/cartSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "max-content",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ListCard = () => {
  const [productData, setProductData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { cart: cartData } = useSelector((state) => state.cart);

  useEffect(() => {
    setProductData(sampleData?.products);
  }, []);

  const addCartHandler = (e, item) => {
    e.preventDefault();
    dispatch(
      addCart({
        product: item,
      })
    );
    setOpenModal(true);
  };
  const removeCartHandler = (e, id) => {
    e.preventDefault();
    dispatch(
      removeCart({
        id,
      })
    );
  };
  const updateCartHandler = (e, item, key) => {
    e.preventDefault();
    if (document.getElementById(key).value) {
        dispatch(
        updateCart({
            product: item,
            quantity: parseInt(document.getElementById(key).value),
        })
        );
        document.getElementById(key).value = "";
    }
  };

  const BillingHandler = () => {
    dispatch(
        addBilling({
            product: cartData,
        })
    );
  }
  // console.log('cartData', cartData);
  const ProductData = (
    <Box sx={{ textAlign: "center", marginLeft: 5, width: "100%" }}>
      <Typography variant="h6" sx={{ marginTop: 1 }}>
        Products
      </Typography>
      <Divider />
      {productData.length > 0 &&
        productData.map((product, i) => (
          <div className="product-container" key={i}>
            <div>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Product Name : <span className="bold">{product.name}</span>
              </Typography>
            </div>
            <div>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Product price : <span className="bold">{product.price}</span>
              </Typography>
            </div>
            <div>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Product description :{" "}
                <span className="bold"> {product.description} </span>
              </Typography>
            </div>
            <div>
              <button
                onClick={(e) => addCartHandler(e, product)}
                className="button"
              >
                Add to Cart
              </button>
              <button
                onClick={(e) => removeCartHandler(e, product.id)}
                className="button"
              >
                Remove From Cart
              </button>
            </div>
          </div>
        ))}
    </Box>
  );
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
          >
            Product List
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="page-body">{ProductData}</div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h3>Cart</h3>
          </div>
          {!cartData && <div>No Product Found In Cart</div>}
          <div>
            {cartData?.map((cart, i) => (
              <div className="cart-container" key={i}>
                <div>
                  Name : <span className="cart-span">{cart?.name}</span>
                </div>
                <div>
                  Price : <span className="cart-span">{cart?.price}</span>
                </div>
                <div>
                  quantity : <span className="cart-span">{cart?.quantity}</span>
                </div>
                <div>
                  <a
                    onClick={(e) => removeCartHandler(e, cart?.id)}
                    className="remove"
                  >
                    Remove
                  </a>
                </div>
                <div>
                  <input type="number" id={`quantity${cart.id}`}/>
                </div>
                <div>
                  <button
                    className="button1"
                    onClick={(e) => updateCartHandler(e, cart, `quantity${cart.id}`)}
                  >
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div>
            <button className="button" onClick={BillingHandler}>Proceed to Pay</button>
          </div>
        </Box>
      </Modal>
    </Box>
  );
};

export default ListCard;
