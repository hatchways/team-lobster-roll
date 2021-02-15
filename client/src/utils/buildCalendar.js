import { v4 as uuid } from "uuid";

export default function buildCalendar(value) {
  const startDay = value.clone().startOf("month").startOf("week");
  const endDay = value.clone().endOf("month").endOf("week");
  const day = startDay.clone().subtract(1, "day");
  const calendar = [];

  while (day.isBefore(endDay, "day")) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => {
          return {
            id: uuid(),
            day: day.add(1, "day").clone(),
          };
        })
    );
  }
  console.log(calendar);
  return calendar;
}
