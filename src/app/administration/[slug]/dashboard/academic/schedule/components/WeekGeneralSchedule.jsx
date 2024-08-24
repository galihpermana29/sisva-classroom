"use client";

import {
  Inject,
  ScheduleComponent,
  WorkWeek,
} from "@syncfusion/ej2-react-schedule";
import { Internationalization } from "@syncfusion/ej2-base";
import { Typography } from "@mui/material";

const WeekGeneralSchedule = ({ data }) => {
  const instance = new Internationalization();
  const getDateHeaderText = (props) => {
    return (
      <Typography className="text-center" variant="body2" fontWeight={600}>
        {formatDateHeaderToBahasa(
          instance.formatDate(props.date, { format: "EEEE" }),
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
      height="490px"
      selectedDate={new Date(2021, 1, 15)}
      eventSettings={{ dataSource: data }}
      currentView="WorkWeek"
      showHeaderBar={false}
      showTimeIndicator={false}
      showQuickInfo={false}
      dateHeaderTemplate={getDateHeaderText}
      eventDoubleClick={handleClickDoNothing}
      cellDoubleClick={handleClickDoNothing}
    >
      <Inject services={[WorkWeek]} />
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
};

const formatDateHeaderToBahasa = (day) => {
  return dayMap[day] ?? day;
};
