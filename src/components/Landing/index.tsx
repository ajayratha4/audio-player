import React from "react";
import { Box } from "@mui/material";

import AudioPlayer from "../AudioPlayer";

const Landing = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AudioPlayer />
    </Box>
  );
};

export default Landing;
