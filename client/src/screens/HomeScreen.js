import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading/Loading";
import AlertMessage from "../components/AlertMessage/AlertMessage";
import Wrapper from "../components/Wrapper/Wrapper";
import Hero from "../components/Hero/Hero";
import { fetchTopTenReviews } from "../actions/reviewsActions";
import Testimonials from "../components/Testimonials/Testimonials";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const collectionsList = useSelector((state) => state.collections);
  const isLoading = collectionsList.loading || productList.loading;
  const error = collectionsList.error || productList.error;


  useEffect(() => {
    dispatch(fetchTopTenReviews());
  }, [dispatch]);

  return (
    <Wrapper
      gridContainer
      customStyles={{
        justifyContent: "space-around",
        alignItems: "stretch",
      }}
    >
      {isLoading && <Loading />}
      {error && <AlertMessage type="error">{error}</AlertMessage>}
      {!isLoading && !error && (
        <>
          <Hero />
          <Testimonials />
        </>
      )}

    </Wrapper>
  );
};

export default HomeScreen;