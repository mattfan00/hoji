import dayjs from "dayjs"

export const dateFormat = (date) => {
  if (dayjs().isSame(date, "day")) {
    return dayjs(date).format("h:mm a") 
  } else {
    return dayjs(date).format("MMM D, YYYY")
  }
}
