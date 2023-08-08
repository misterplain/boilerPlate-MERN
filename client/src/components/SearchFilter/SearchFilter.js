import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import { snackbarDispatch } from "../../utils/snackbarDispatch";
import { enqueueSnackbar } from "notistack";
import { fetchFilteredProducts } from "../../actions/shopActions";
import styles from "./styles";

function valuetext(value) {
  return `${value}°C`;
}

const SearchFilter = () => {
  const dispatch = useDispatch();
  const collectionsList = useSelector((state) => state.collections);
  const shopState = useSelector((state) => state.shop);
  const { products, error } = shopState;
  const { collections } = collectionsList;



  //filter
  const [sort, setSort] = React.useState("");
  const handleFilterChange = (event) => {
    setSort(event.target.value);
  };

  //search
  const [search, setSearch] = React.useState("");
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const initialCheckboxState = collections?.reduce((acc, collection) => {
    acc[collection._id] = false;
    return acc;
  }, {});

  const [collectionsSelected, setCollectionsSelected] =
    React.useState(initialCheckboxState);

  const handleCollectionChange = (event) => {
    setCollectionsSelected({
      ...collectionsSelected,
      [event.target.name]: event.target.checked,
    });
  };

  //price
  const [price, setPrice] = React.useState([0, 1000]);
  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };

  //stock
  const [stock, setStock] = React.useState(true);
  const handleStockChange = (event) => {
    setStock(event.target.checked);
  };

  //reviews
  const [reviews, setReviews] = React.useState(false);
  const handleReviewsChange = (event) => {
    setReviews(event.target.checked);
  };

  const handleSubmit = () => {
    const filterQuery = {
      sortBy: sort,
      searchQuery: search,
      collections: collectionsSelected,
      priceRange: price,
      inStock: stock,
      hasReviews: reviews,
    };
    console.log(filterQuery);
    dispatch(fetchFilteredProducts({ filterObject: filterQuery }));
  };

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.filterForm}>
        <Box sx={styles.formItem}>
          <FormControl size="small" fullWidth>
            <InputLabel id="sortBy">Sort By</InputLabel>
            <Select
              labelId="sortBy-label"
              id="sortBy-small"
              value={sort}
              label="Sort By"
              onChange={handleFilterChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"PriceHighLow"}>Price - High to Low</MenuItem>
              <MenuItem value={"PriceLowHigh"}>Price - Low to High</MenuItem>
              <MenuItem value={"MostReviewed"}>Most Reviewed</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={styles.formItem}>
          <TextField
            label="Search Products"
            id="outlined-size-small"
            // defaultValue="Small"
            size="small"
            value={search}
            onChange={handleSearchChange}
            fullWidth
          />
        </Box>
        <Box sx={styles.formItem}>
          {" "}
          <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend">Collection</FormLabel>
            <FormGroup>
              {collections?.map((collection) => (
                <FormControlLabel
                  key={collection._id}
                  control={
                    <Checkbox
                      checked={collectionsSelected[collection._id]}
                      onChange={handleCollectionChange}
                      name={collection._id}
                      value={collection._id}
                    />
                  }
                  label={collection.name}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Box>
        <Box sx={styles.formItem}>
          <FormLabel component="legend" sx={{ marginBottom: "5px" }}>
            Price Range
          </FormLabel>
          <Slider
            getAriaLabel={() => "Price range"}
            value={price}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={0} 
            max={600}  
          
          />
        </Box>
        <Box sx={styles.formItem}>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={stock} onChange={handleStockChange} />}
              label="In Stock"
            />
          </FormGroup>
        </Box>
        <Box sx={styles.formItem}>
          <FormGroup>
            <FormControlLabel
              control={<Switch  checked={reviews} onChange={handleReviewsChange} />}
              label="Has Reviews"
            />
          </FormGroup>
        </Box>
      </Box>
      <Button onClick={() => handleSubmit()}>Filter</Button>
    </Box>
  );
};

export default SearchFilter;