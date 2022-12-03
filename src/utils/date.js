import moment from "moment";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import momentDurationFormatSetup from "moment-duration-format";

export const getTimeInDurationFormat = (duration, format = "mm.ss") => {
  return moment.duration(duration, "seconds").format(format, { trim: false });
};

export const getValueToPercentage = (curentTime, duration) => {
  return (parseFloat(curentTime) / parseFloat(duration)) * 100;
};

export const getPercentageToValue = (percentage, total) => {
  return (percentage * total) / 100;
};

export const getMinFormat = (duration) => {
  const a = moment
    .duration(duration, "seconds")
    .format("hh:mm.ss", { trim: false });
  return a;
};

export const durationFormatter = (arg) => {
  const { duration, currentTime } = arg;

  if (Number(duration) >= 60) {
    const totalduration = getMinFormat(Number(duration), "hh.mm.ss");
    const currentDuration = getMinFormat(currentTime, "hh.mm.ss");
    return { duration: totalduration, currentTime: currentDuration };
  } else {
    return { duration, currentTime };
  }
};
