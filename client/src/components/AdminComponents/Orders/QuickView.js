import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AlertMessage from "../../AlertMessage/AlertMessage";
import { useSelector, useDispatch } from "react-redux";
import { filterPeriod } from "../../../actions/orderHistoryActions";
import OrderSnapshot from "../../OrderSnapshot/OrderSnapshot";
import Wrapper from "../../Wrapper/Wrapper";

const QuickView = () => {
  const dispatch = useDispatch();
  const orderHistoryState = useSelector((state) => state.orderHistory);
  const { orders, error, quickView } = orderHistoryState;
  const userAuthState = useSelector((state) => state.userAuth);
  const token = userAuthState?.accessToken;

  const [time, setTime] = useState(quickView ? quickView : 7);

  const handleChange = (event) => {
    setTime(event.target.value);
  };

  useEffect(() => {
    if (!quickView) {
      dispatch(filterPeriod(7, token));
    }
  }, [dispatch, quickView, token]);

  return (
    <Wrapper id="pageWrapper" flexDirection="column">
      {" "}
      {error && <AlertMessage type="error">{error}</AlertMessage>}
      <Wrapper
        id="timeSelect"
        justifyContent="center"
        customStyles={{
          margin: "20px 0px 20px 0px",
        }}
      >
        {" "}
        <FormControl>
          <InputLabel id="timePeriod">Period</InputLabel>
          <Select
            labelId="timePeriod"
            id="timePeriod"
            value={time}
            label="Time Period"
            onChange={handleChange}
          >
            <MenuItem value={1}>{"<"} 24 hours</MenuItem>
            <MenuItem value={7}>Last 7 days</MenuItem>
            <MenuItem value={10}>Last 10 days</MenuItem>
            <MenuItem value={30}>Last 30 days</MenuItem>
            <MenuItem value={180}>Last 180 days</MenuItem>
            <MenuItem value={365}>Last Year</MenuItem>
            <MenuItem value={730}>Last 2 years</MenuItem>
            <MenuItem value={731}>Archive (+2 years)</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => dispatch(filterPeriod(time, token))}
        >
          Search
        </Button>
      </Wrapper>
      <Wrapper id="ordersWrapper" flexDirection="column">
        {" "}
        {orders
          ?.sort((a, b) => new Date(b.datePlaced) - new Date(a.datePlaced))
          .map((order) => (
            <OrderSnapshot order={order} isAdmin={true} key={order._id} />
          ))}
      </Wrapper>
    </Wrapper>
  );
};

export default QuickView;
