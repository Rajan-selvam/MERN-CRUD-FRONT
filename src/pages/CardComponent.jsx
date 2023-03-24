import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { commafy } from "../utils/helper";

const CardComponent = ({
  image,
  name,
  price,
  description,
  minQty,
  addCart,
}) => (
  <Card sx={{ width: 300, margin: 1 }}>
    <CardActionArea>
      <CardMedia component="img" height="250" image={image} alt={name} />
      <CardContent sx={{ minHeight: 180 }}>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          ₹ {commafy(price)}
        </Typography>
        {minQty && (
          <Typography gutterBottom variant="p" component="span">
            Min-qty: {minQty}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button size="small" color="primary" onClick={() => addCart()}>
        Add To Cart
      </Button>
    </CardActions>
  </Card>
);

export default CardComponent;
