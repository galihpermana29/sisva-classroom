"use client";

import {
  Inject,
  ScheduleComponent,
  Week,
} from "@syncfusion/ej2-react-schedule";
import { Internationalization } from "@syncfusion/ej2-base";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { font } from "@/app/layout";

const WeekGeneralSchedule = ({ data, cellTemplate }) => {
  const instance = new Internationalization();
  const dateHeaderTemplate = (props) => getDateHeaderText(props, instance);
  const selectedDate = dayjs().toDate();
  const startHour = getStartHour(data);
  const endHour = getEndHour(data);
  // disables highlighting in order to achieve a slightly darker colour for the cells
  // also automatically set the working hours to be the same as start and end hour
  const workHours = { highlight: false, start: startHour, end: endHour };
  const eventSettings = {
    dataSource: data,
    // these 3 options disables clicking action
    allowAdding: false,
    allowDeleting: false,
    allowEditing: false,
    spannedEventPlacement: "TimeSlot",
    // customizing .e-appointment (event card) inner element
    template: cellTemplate,
  };

  return (
    <ScheduleComponent
      // removing arrow indicator at the top
      className="[&_.e-indicator]:!hidden"
      // setting 24 hour format
      timeFormat="HH:mm"
      startHour={startHour}
      endHour={endHour}
      workHours={workHours}
      width="100%"
      height="100%"
      // setting first day of week to monday
      firstDayOfWeek={1}
      selectedDate={selectedDate}
      eventSettings={eventSettings}
      currentView="Week"
      // this disables the toolbar
      showHeaderBar={false}
      // enables the current time indicator
      showTimeIndicator={true}
      // disables ability to click on event
      showQuickInfo={false}
      // to customize date header showing day name
      dateHeaderTemplate={dateHeaderTemplate}
      // to customize the top left corner cell saying "day"
      renderCell={onRenderCell}
      // to customize .e-appointment (event card) styling
      eventRendered={onEventRendered}
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

const getDateHeaderText = (props, instance) => {
  return (
    <Typography
      className="text-center"
      variant="body2"
      fontWeight={600}
    >
      {/* this change the date header to only day, and then translates it to bahasa */}
      {formatDateHeaderToBahasa(
        instance.formatDate(props.date, { format: "EEEE" })
      )}
    </Typography>
  );
};

const onRenderCell = (args) => {
  if (
    args.element.classList.contains("e-header-cells") &&
    args.element.classList.contains("e-disable-dates")
  ) {
    let target = args.element;
    // setting jam column name on the top left
    target.innerHTML = `<div class="font-semibold text-sm text-center ${font.className}">Jam</div>`;
  }
};

const onEventRendered = (props) => {
  let target = props.element;
  // set background color according to type
  target.style.backgroundColor = props.data.Color;
  target.style.borderRadius = "0.5rem";
  target.style.padding = "8px";
  // set text to centered on non learning schedule
  target.style.placeContent = props.data.Type === "non-learning" && "center";
};

const getStartHour = (data) => {
  const defaultStartHour = dayjs("07:00", "HH:mm");
  const res = data
    .map((data) => dayjs(data.StartTime))
    // sort ascending
    .sort((a, b) => a.unix() - b.unix());

  const earliestSchedule = res.at(0); // earliest would be the first element
  const isEarlierThanDefault = earliestSchedule?.isBefore(
    defaultStartHour,
    "hour"
  ); // compare by hour
  const startHour = isEarlierThanDefault
    ? roundAndFormatHour(earliestSchedule, "start")
    : roundAndFormatHour(defaultStartHour, "start");
  return startHour;
};

const getEndHour = (data) => {
  const defaultEndHour = dayjs("17:00", "HH:mm");
  const res = data
    .map((data) => dayjs(data.EndTime))
    // sort descending
    .sort((a, b) => b.unix() - a.unix());

  const latestSchedule = res.at(0); // latest would be the last element
  const isLaterThanDefault = latestSchedule?.isAfter(defaultEndHour, "hour"); // compare by hour
  const endHour = isLaterThanDefault
    ? roundAndFormatHour(latestSchedule, "end")
    : roundAndFormatHour(defaultEndHour, "end");
  return endHour;
};

const roundAndFormatHour = (timestamp, type) => {
  if (!timestamp) return undefined;

  const minutes = timestamp.get("minute");
  // early return the timestamp in format "HH:mm" (24 hour)
  if (minutes === 0) return timestamp.format("HH:mm");

  const hour = timestamp.get("hour");
  // set the minute to 00
  let newTimestamp = timestamp.set("minute", 0);

  switch (type) {
    case "start":
      // round down to the nearest hour
      newTimestamp.set("hour", hour - 1);
      break;
    case "end":
      // round up to the nearest hour
      newTimestamp.set("hour", hour + 1);
      break;
    default:
      throw new Error("Unrecognized format type!");
  }

  // return the new formatted timestamp
  return newTimestamp.format("HH:mm");
};
