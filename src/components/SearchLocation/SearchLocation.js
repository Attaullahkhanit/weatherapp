import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import {
  TextField,
  InputAdornment,
  IconButton,
  useTheme,
} from "@mui/material";
import { BsSearch } from "react-icons/bs";
import "./styles.scss";
import { BiLoaderCircle } from "react-icons/bi";

const SearchLocation = ({ onLocationSelect }) => {
  const theme = useTheme();
  const [address, setAddress] = useState("");
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    onLocationSelect({ address: value, latLng });
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <TextField
            {...getInputProps({
              placeholder: "Location",
              variant: "outlined",
              margin: "normal",
              fullWidth: true,
              style: {
                width: "100%",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              },
              InputProps: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit">
                      <BsSearch />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            })}
          />
          <li className="location-list">
            {loading && <div><BiLoaderCircle/></div>}
            
            {suggestions.map((suggestion) => (
              <ul
                {...getSuggestionItemProps(suggestion, {
                  style: {
                    backgroundColor: suggestion.active
                      ? theme.palette.mode === "dark"
                        ? "#000" // Black background for dark theme
                        : "#41b6e6" // Blue background for light theme
                      : "#fff",
                    color: suggestion.active
                      ? theme.palette.mode === "dark"
                        ? "#fff" // White text for dark theme
                        : "#000" // Black text for light theme
                      : "#000",
                  },
                })}
                key={suggestion.placeId}
              >
                {console.log('Suggestion:', suggestion)} {/* Log the suggestion */}
                {suggestion.description}
              </ul>
            ))}
          </li>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default SearchLocation;
