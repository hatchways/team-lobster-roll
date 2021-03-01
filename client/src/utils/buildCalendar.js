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

/* {
	columnOrder: ["602fec02f179da1b7c23bea0", "602fec02f179da1b7c23bea1"],
	columns: {
			602fec02f179da1b7c23bea0: {
				id: "602fec02f179da1b7c23bea0",
				name: "In Progress",
				taskIds: [],
				__v: 2,
				_id: "602fec02f179da1b7c23bea0",
			},
			
			602fec02f179da1b7c23bea1: {
				cards: [
					{
						attachments: [],
						name: "test",
						tags: [],
						__v: 0,
						_id: "603ada31f7fcdb32502f622f",
					}
				],
				id: "602fec02f179da1b7c23bea1",
				name: "Completed",
				taskIds: ["603ada31f7fcdb32502f622f"],
				__v: 3,
				_id: "602fec02f179da1b7c23bea1",
			}
		}
	]
} */

export default function buildCalendar(value, cardsFromContext) {
  const startDay = value.clone().startOf("month").startOf("week");
  const endDay = value.clone().endOf("month").endOf("week");
  const day = startDay.clone().subtract(1, "day");
  const calendar = [];
	
	cardsFromContext[0].deadline = "2021-02-28";
	
  while (day.isBefore(endDay, "day")) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => {
          const dayClone = day.add(1, "day").clone();
          let cards = [];

          cardsFromContext.forEach((card) => {
            if (card.deadline && dayClone.isSame(card.deadline)) cards.push(card);
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
