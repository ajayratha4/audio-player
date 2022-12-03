import { useEffect, useRef, useState } from "react";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import { IconButton, Box, Slider } from "@mui/material";
import { iconSize } from "./Controller";
type VolumePopoverProps = {
  handleVolume: (arg: number) => void;
  volume: number;
};
const VolumePopover = ({ handleVolume, volume }: VolumePopoverProps) => {
  const [volumeValue, setVolumeValue] = useState({ previos: 0, current: 0 });
  const [anchorEl, setAnchorEl] = useState(false);

  useEffect(() => {
    setVolumeValue((prev) => ({ ...prev, current: volume * 100 }));
  }, [volume]);

  const handleClick = () => {
    setVolumeValue((prev) => {
      const newVolume = prev.current ? 0 : prev.previos || 30;
      handleVolume(newVolume);
      return {
        previos: prev.current,
        current: newVolume,
      };
    });
  };

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setVolumeValue((prev) => ({ ...prev, current: newValue as number }));
    handleVolume(newValue as number);
  };

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", gap: [0, 1] }}
      onMouseEnter={() => setAnchorEl(true)}
      onMouseLeave={() => setAnchorEl(false)}
    >
      <IconButton
        sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={handleClick}
      >
        {volumeValue.current ? (
          <VolumeDownIcon sx={{ width: iconSize, height: iconSize }} />
        ) : (
          <VolumeOffIcon sx={{ width: iconSize, height: iconSize }} />
        )}
      </IconButton>

      {anchorEl && (
        <Slider
          value={volumeValue.current}
          onChange={handleChange}
          size={"small"}
          sx={{
            width: [30, 40, 70],
            "& .MuiSlider-thumb": {
              width: [10, 15],
              height: [10, 15],
              backgroundColor: "#fff",
              "&:before": {
                boxShadow: "none",
              },
              "&:hover, &.Mui-focusVisible, &.Mui-active": {
                boxShadow: "none",
              },
            },
          }}
          defaultValue={30}
        />
      )}
    </Box>
  );
};

export default VolumePopover;
