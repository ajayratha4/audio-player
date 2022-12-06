import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Slider from "@mui/material/Slider";
import Replay10Icon from "@mui/icons-material/Replay10";
import Forward30Icon from "@mui/icons-material/Forward30";
import VolumePopover from "./VolumePopover";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { durationFormatter } from "../../utils/date";
import ProgressBar from "./ProgressBar";
type ControllerProps = {
  onPlay: () => void;
  isPlaying: boolean;
  currentPlaybackPercentage: {
    playbackPercentage: number;
    bufferedPercentage: number;
  };
  handlePlaybackPosition: (arg: number) => void;
  currentPlayback: { currentTime: number; duration: number };
  handleVolume: (arg: number) => void;
  handleSkip: (arg: number, type: string) => void;
  volume: number;
  handleSpeedController: (arg: number) => void;
};

export const iconSize = [10, 15, 20, 26];

const Controller = ({
  currentPlayback,
  handlePlaybackPosition,
  currentPlaybackPercentage,
  onPlay,
  isPlaying,
  handleVolume,
  handleSkip,
  volume,
  handleSpeedController,
}: ControllerProps) => {
  const matches = useMediaQuery((theme: any) => theme.breakpoints.up("md"));

  const [speed, setSpeed] = useState(1);
  const handlePositionChange = (newValue: number) => {
    handlePlaybackPosition(newValue);
  };

  const handleRemoveSpeed = (name: string) => {
    setSpeed((previousValue) => {
      const newValue =
        name === "minus" ? previousValue - 0.5 : previousValue + 0.5;
      if (newValue && newValue < 15) {
        handleSpeedController(newValue);
        return newValue;
      } else {
        return previousValue;
      }
    });
  };
  console.log(currentPlaybackPercentage);

  const { currentTime, duration } = durationFormatter(currentPlayback);
  return (
    <Box sx={{ height: 1, width: 1, display: "flex" }}>
      <Box
        sx={{
          height: 1,
          width: 0.2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 0.8,
            height: 0.8,
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <IconButton onClick={onPlay} sx={{ padding: 0.2 }}>
            {isPlaying ? (
              <PauseRounded
                sx={{ height: [50, 70, 100], width: [50, 70, 100] }}
              />
            ) : (
              <PlayCircleIcon
                sx={{ height: [50, 70, 100], width: [50, 70, 100] }}
              />
            )}
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{ width: 1, height: 1, display: " flex", justifyContent: "center" }}
      >
        <Box
          sx={{
            width: 0.9,
            height: 1,
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
            gap: 0.5,
          }}
        >
          <Box>
            <ProgressBar
              onChange={handlePositionChange}
              progressBarPosition={currentPlaybackPercentage.playbackPercentage}
              bufferBarPosition={currentPlaybackPercentage.bufferedPercentage}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  sx={{ width: [10, 15, 20, 35], fontSize: [8, 10, 15] }}
                >
                  {speed}x
                </Typography>
                <Box>
                  <IconButton onClick={() => handleRemoveSpeed("minus")}>
                    <RemoveIcon sx={{ width: iconSize, height: iconSize }} />
                  </IconButton>
                  <IconButton onClick={() => handleRemoveSpeed("add")}>
                    <AddIcon sx={{ width: iconSize, height: iconSize }} />
                  </IconButton>
                </Box>
              </Box>

              <Box>
                <IconButton onClick={() => handleSkip(10, "forward")}>
                  <Replay10Icon sx={{ width: iconSize, height: iconSize }} />
                </IconButton>
                <IconButton onClick={() => handleSkip(30, "next")}>
                  <Forward30Icon sx={{ width: iconSize, height: iconSize }} />
                </IconButton>
              </Box>
              <Box>
                <VolumePopover volume={volume} handleVolume={handleVolume} />
              </Box>
            </Box>
            <Box display="flex" gap={1} alignItems="center">
              <Typography sx={{ fontSize: [8, 10, 15] }}>
                {currentTime}
              </Typography>
              <Typography sx={{ fontSize: [8, 10, 15] }}>/</Typography>
              <Typography sx={{ fontSize: [8, 10, 15] }}>{duration}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Controller;
