import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopTenReviews } from "../../actions/reviewsActions";
import { formatDate } from "../../utils/formatDate";
import RatingIcons from "../RatingIcons/RatingIcons";
import { Link } from "react-router-dom";
import styles from "./styles";
import ResponsiveWrapper from "../Wrapper/ResponsiveWrapper";
import { useTheme } from "@mui/material/styles";

const Testimonials = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const reviewsState = useSelector((state) => state.reviews);
  const { topReviews } = reviewsState || {};

  useEffect(() => {
    dispatch(fetchTopTenReviews());
  }, [dispatch]);

  return (
    <ResponsiveWrapper>
      <Box sx={styles.wrapper(theme)}>
        <Box sx={styles.textWrapper(theme)}>
          <Typography variant="h3">Testimonials</Typography>
          <Typography>
            See what others have said about our products and services
          </Typography>
        </Box>
        <Box sx={styles.reviewsWrapper(theme)}>
          {topReviews?.map((review) => (
            <Box
              sx={styles.review(theme)}
              key={review._id}
              className="mb-6 md:mb-0"
            >
              <Box sx={styles.imageTitleWrapper(theme)}>
                {" "}
                <Link to={`/product/${review.productId}`}>
                  <Box
                    component="img"
                    sx={styles.image(theme)}
                    src={review.productInfo.images[0].url}
                  />
                </Link>
                <Link
                  to={`/product/${review.productId}`}
                  style={{ textDecoration: "none" }}
                >
                  {" "}
                  <Typography variant="body2">
                    {review.productInfo.name}
                  </Typography>
                </Link>
              </Box>

              <RatingIcons rating={review.rating} />
              <Typography variant="body1">{review.comment}</Typography>
              <Typography variant="body2" className="italic text-sm text-neutral-400">
                {review.username} said on {formatDate(review.date, "partDate")}
              </Typography>
            </Box>
          ))}

        </Box>
      </Box>
    </ResponsiveWrapper>
  );
};

export default Testimonials;
