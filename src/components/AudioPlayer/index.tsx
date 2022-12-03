import { Paper } from "@mui/material";
import { useRef, useState } from "react";
import Controller from "./Controller";

import {
  getPercentageToValue,
  getTimeInDurationFormat,
  getValueToPercentage,
} from "../../utils/date";

const audioUrl =
  // "https://soundcloud.com/relaxing-music-365/30-minute-deep-sleep-music";
  // "https://content.blubrry.com/takeituneasy/lex_ai_balaji_srinivasan.mp3";
  "https://pwdown.info/113709/Kaala%20Jaadu%20-%20Arijit%20Singh.mp3";

const AudioPlayer = () => {
  const audioRef = useRef(new Audio());

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlaybackPercentage, setCurrentPlaybackPercentage] = useState({
    playbackPercentage: 0,
    bufferedPercentage: 0,
  });
  const [currentPlayback, setCurrentPlayback] = useState({
    currentTime: 0,
    duration: 0,
  });

  const onLoadedData = () => {
    setCurrentPlayback((previousValue) => ({
      ...previousValue,
      currentTime: audioRef?.current?.currentTime,
      duration: audioRef?.current?.duration,
    }));
  };

  const onDurationChange = () => {
    const duration = getTimeInDurationFormat(audioRef?.current?.duration);
    const currentTime = getTimeInDurationFormat(audioRef?.current?.currentTime);

    const buffered = audioRef?.current.buffered;
    const bufferedTime = getTimeInDurationFormat(
      buffered.end(buffered.length - 1)
    );

    const playbackPercentage = getValueToPercentage(currentTime, duration);
    const bufferedPercentage = getValueToPercentage(bufferedTime, duration);

    setCurrentPlaybackPercentage({ playbackPercentage, bufferedPercentage });
    setCurrentPlayback((previousValue) => ({
      ...previousValue,
      currentTime: audioRef?.current?.currentTime,
      duration: audioRef?.current?.duration,
    }));
  };

  const handlePlaybackPosition = (value: number) => {
    setCurrentPlaybackPercentage((prev) => ({
      ...prev,
      playbackPercentage: value,
    }));

    audioRef.current.currentTime = getPercentageToValue(
      value,
      audioRef?.current?.duration
    );
  };

  const handleSkip = (value: number, type: string) => {
    switch (type) {
      case "next":
        audioRef.current.currentTime = audioRef.current.currentTime + value;

        break;
      case "forward":
        audioRef.current.currentTime = audioRef.current.currentTime - value;
        break;

      default:
        break;
    }
  };

  const handleOnSongEnded = () => {
    resetAudioPlayer();
  };

  const handleVolume = (volume: number) => {
    audioRef.current.volume = volume / 100;
  };

  const handleOnPlayStartedOrPaused = () => {
    if (audioRef?.current?.duration) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleSpeedController = (speed: number) => {
    audioRef.current.playbackRate = speed;
  };

  const resetAudioPlayer = () => {
    setIsPlaying(false);
    setCurrentPlayback({ currentTime: 0, duration: 0 });
    setCurrentPlaybackPercentage({
      playbackPercentage: 0,
      bufferedPercentage: 0,
    });
  };

  return (
    <Paper
      elevation={2}
      sx={{ height: 100, maxWidth: 800, width: [1, 0.9, 0.8], minWidth: 330 }}
    >
      <Controller
        handleVolume={handleVolume}
        volume={audioRef.current?.volume}
        currentPlayback={currentPlayback}
        currentPlaybackPercentage={currentPlaybackPercentage}
        handlePlaybackPosition={handlePlaybackPosition}
        onPlay={handleOnPlayStartedOrPaused}
        isPlaying={isPlaying}
        handleSkip={handleSkip}
        handleSpeedController={handleSpeedController}
      />
      <div>
        <audio
          ref={audioRef}
          preload={"metadata"}
          onLoadedData={onLoadedData}
          src={audioUrl}
          onTimeUpdate={onDurationChange}
          onEnded={handleOnSongEnded}
        />
      </div>
    </Paper>
  );
};

export default AudioPlayer;
