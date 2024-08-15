import WeekGeneralSchedule from "./WeekGeneralSchedule";

export const JadwalGuruSchedule = () => {
  return <WeekGeneralSchedule data={data} />;
};

const data = [
  {
    Id: 1,
    Subject: "Upacara",
    StartTime: "2021-02-14T23:00:00.000Z",
    EndTime: "2021-02-14T23:30:00.000Z",
  },
  {
    Id: 2,
    Subject: "Matematika",
    StartTime: "2021-02-15T00:00:00.000Z",
    EndTime: "2021-02-15T01:30:00.000Z",
  },
  {
    Id: 3,
    Subject: "Bahasa Indonesia",
    StartTime: "2021-02-15T02:00:00.000Z",
    EndTime: "2021-02-15T03:00:00.000Z",
  },
  {
    Id: 4,
    Subject: "Parrot Talk",
    StartTime: "2021-02-17T02:00:00.000Z",
    EndTime: "2021-02-17T03:00:00.000Z",
  },
  {
    Id: 5,
    Subject: "Birds of Prey",
    StartTime: "2021-02-17T23:00:00.000Z",
    EndTime: "2021-02-18T00:30:00.000Z",
  },
  {
    Id: 6,
    Subject: "Istirahat",
    StartTime: "2021-02-15T01:30:00.000Z",
    EndTime: "2021-02-15T02:00:00.000Z",
  },
  {
    Id: 7,
    Subject: "Istirahat",
    StartTime: "2021-02-16T01:30:00.000Z",
    EndTime: "2021-02-16T02:00:00.000Z",
  },
  {
    Id: 8,
    Subject: "Istirahat",
    StartTime: "2021-02-17T01:30:00.000Z",
    EndTime: "2021-02-17T02:00:00.000Z",
  },
  {
    Id: 9,
    Subject: "Istirahat",
    StartTime: "2021-02-18T01:30:00.000Z",
    EndTime: "2021-02-18T02:00:00.000Z",
  },
  {
    Id: 10,
    Subject: "Istirahat",
    StartTime: "2021-02-19T01:30:00.000Z",
    EndTime: "2021-02-19T02:00:00.000Z",
  },
];
