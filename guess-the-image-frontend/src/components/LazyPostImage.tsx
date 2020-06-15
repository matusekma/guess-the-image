import React from "react";
import { CardMedia } from "@material-ui/core";

interface Props {
  image: string;
  className: string;
}

const LazyPostImage = ({ image, className }: Props) => {
  return <CardMedia className={className} image={image} title="Post" />;
};

export default LazyPostImage;
