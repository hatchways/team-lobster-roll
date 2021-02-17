// data from db that was fetched from global state
const cardsFromDb = [
  { id: "card-1", title: "Math Exam", status: "red", deadline: "2021-02-19" },
  {
    id: "card-2",
    title: "Comp Sci Project",
    status: "red",
    deadline: "2021-02-19",
  },
  {
    id: "card-3",
    title: "Biology Exam",
    status: "red",
    deadline: "2021-02-19",
  },
  {
    id: "card-4",
    title: "Chemisty Exam",
    status: "red",
    deadline: "2021-02-28",
  },
];

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
          const dayClone = day.add(1, "day").clone();
          let cards = [];

          cardsFromDb.forEach((card) => {
            if (dayClone.isSame(card.deadline)) cards.push(card);
          });

          return {
            id: dayClone.format("YYYY-MM-DD"),
            number: dayClone.format("D"),
            cards,
          };
        })
    );
  }
  return calendar;
}
