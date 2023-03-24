import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Modal,
  Box,
  Paper,
  Container,
  CardMedia,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  addBilling,
  updateCart,
  removeCart,
  cleartCart,
} from "../store/cartSlice";
import { commafy } from "../utils/helper";
import "../style.css";

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
const Cart = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const { cart: cartData } = useSelector((state) => state.cart);

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
    if (parseInt(document.getElementById(key).value) > 0) {
      dispatch(
        updateCart({
          product: item,
          quantity: parseInt(document.getElementById(key).value),
        })
      );
      document.getElementById(key).value = 1;
    } else {
       alert('Enter Numberic Value');
       document.getElementById(key).value = 1;
    }
  };

  const BillingHandler = () => {
    dispatch(
      addBilling({
        product: cartData,
      })
    );
    dispatch(cleartCart());
    setOpenModal(true);
  };
  console.log("cartData", cartData);
  return (
    <Container sx={{ marginTop: 15 }}>
      <div>
        <h3>Cart Items - {cartData?.product?.length ?? 0}</h3>
      </div>
      {!cartData?.product && <div>No Product Found In Cart</div>}
      <div>
        {cartData?.product?.map((cart, i) => (
          <Paper elevation={3} sx={{ minHeight: 100, marginTop: 2 }} key={i}>
            <div className="cart-container">
              <div className="img">
                <CardMedia
                  component="img"
                  height="100"
                  image={cart?.image}
                  alt={cart?.name}
                />
              </div>
              <div className="cart-details">
                <p>
                  Name : <span className="cart-span">{cart?.name}</span>
                </p>
                <p>
                  Price : <span className="cart-span">{commafy(cart?.price)}</span>
                </p>
                <p>
                  quantity : <span className="cart-span">{cart?.quantity}</span>
                </p>
                <p>
                  Net Amount : <span className="cart-span">{commafy(cart?.netAmount)}</span>
                </p>
              </div>
              <div className="mt-45 cart-actions">
                <span>
                  <Button
                    startIcon={<DeleteForeverIcon />}
                    onClick={(e) => removeCartHandler(e, cart?.id)}
                    sx={{ color: "red" }}
                  >
                    Remove
                  </Button>
                </span>
                <span>
                  {/* <input type="number" id={`quantity${cart.id}`} /> */}
                  <TextField
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    size="small"
                    id={`quantity${cart.id}`}
                    defaultValue={1}
                  />
                </span>
                <span>
                  <Button
                    onClick={(e) =>
                      updateCartHandler(e, cart, `quantity${cart.id}`)
                    }
                    variant="outlined"
                    size="small"
                  >
                    Update
                  </Button>
                </span>
              </div>
            </div>
          </Paper>
        ))}
      </div>
      <div className="cart-footer">
        <Typography>Total : {commafy(cartData?.total)}</Typography>
        {cartData?.product?.length > 0 && (
          <button className="button billing" onClick={BillingHandler}>
            Proceed to Pay
          </button>
        )}
      </div>
      {/* <Modal
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
                <input type="number" id={`quantity${cart.id}`} />
              </div>
              <div>
                <button
                  className="button1"
                  onClick={(e) =>
                    updateCartHandler(e, cart, `quantity${cart.id}`)
                  }
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
        <div>
          <button className="button" onClick={BillingHandler}>
            Proceed to Pay
          </button>
        </div>
      </Box>
    </Modal> */}
    </Container>
  );
};

export default Cart;
