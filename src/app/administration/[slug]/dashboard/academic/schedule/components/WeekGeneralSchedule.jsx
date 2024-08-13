"use client";

import {
  Inject,
  ScheduleComponent,
  Week,
} from "@syncfusion/ej2-react-schedule";
import { Internationalization } from "@syncfusion/ej2-base";
import { Typography } from "@mui/material";
import dayjs from "dayjs";

const WeekGeneralSchedule = ({ data }) => {
  const instance = new Internationalization();
  const getDateHeaderText = (props) => {
    return (
      <Typography
        className="text-center"
        variant="body2"
        fontWeight={600}
      >
        {formatDateHeaderToBahasa(
          instance.formatDate(props.date, { format: "EEEE" })
        )}
      </Typography>
    );
  };

  const handleClickDoNothing = (args) => {
    args.cancel = true;
  };

  return (
    <ScheduleComponent
      timeFormat="HH:mm"
      startHour="07:00"
      endHour="17:00"
      width="100%"
      height="100%"
      firstDayOfWeek={1}
      selectedDate={dayjs().toDate()}
      eventSettings={{ dataSource: data }}
      currentView="Week"
      showHeaderBar={false}
      showTimeIndicator={false}
      showQuickInfo={false}
      dateHeaderTemplate={getDateHeaderText}
      eventDoubleClick={handleClickDoNothing}
      cellDoubleClick={handleClickDoNothing}
    >
      <Inject services={[Week]} />
    </ScheduleComponent>
  );
};

export default WeekGeneralSchedule;

const dayMap = {
  Monday: "Senin",
  Tuesday: "Selasa",
  Wednesday: "Rabu",
  Thursday: "Kamis",
  Friday: "Jum'at",
  Saturday: "Sabtu",
  Sunday: "Minggu",
};

const formatDateHeaderToBahasa = (day) => {
  return dayMap[day] ?? day;
};
