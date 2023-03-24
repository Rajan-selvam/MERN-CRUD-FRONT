import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import sampleData from "../utils/data.json";
import CardComponent from "./CardComponent";
import { addCart } from "../store/cartSlice";
import "../style.css";

const ListCard = () => {
  const [productData, setProductData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setProductData(sampleData?.products);
  }, []);

  const addCartHandler = (item) => {
    dispatch(
      addCart({
        product: item,
      })
    );
    alert(`${item?.name} Added to Cart Successfully!`);
  };

  const ProductData = (
    <Box sx={{ textAlign: "center", width: "100%" }}>
      <Typography variant="h6" sx={{ marginTop: 1 }}>
        Mobile Products - {productData.length}
      </Typography>
      <Divider />
      <div className="product-container">
        {productData.length > 0 &&
          productData.map((product, i) => (
            <CardComponent
              key={i}
              name={product?.name}
              price={product?.price}
              description={product?.description}
              image={product?.image}
              addCart={() => addCartHandler(product)}
            />
          ))}
      </div>
    </Box>
  );
  return <div className="page-body">{ProductData}</div>;
};

export default ListCard;