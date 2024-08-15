import WeekGeneralSchedule from "./WeekGeneralSchedule";

export const JadwalKelasSchedule = () => {
  return <WeekGeneralSchedule data={data} />;
};

const data = [
  {
    Id: 1,
    Subject: "Story Time for Kids",
    StartTime: "2021-02-14T04:30:00.000Z",
    EndTime: "2021-02-14T06:00:00.000Z",
  },
  {
    Id: 2,
    Subject: "Camping with Turtles",
    StartTime: "2021-02-15T06:30:00.000Z",
    EndTime: "2021-02-15T08:30:00.000Z",
  },
];
