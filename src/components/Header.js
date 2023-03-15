import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Header = ({ handleToggleDarkMode }) => {
  const [changeText, setChangeText] = useState(false);
  console.log(changeText);
  return (
    <div className="header">
      <h1>Notes</h1>
      <Stack spacing={2} direction="row">
        <Button
          onClick={() => {
            handleToggleDarkMode((previousDarkMode) => {
              setChangeText(!previousDarkMode);
              return !previousDarkMode;
            });
          }}
          className="save"
        >
          Dark Mode : {changeText ? "on" : "off"}
        </Button>
        <Button variant="contained">Log in</Button>
        <Button variant="outlined">Sign Up</Button>
      </Stack>
    </div>
  );
};

export default Header;
