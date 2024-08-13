"use client";

import { Typography } from "@mui/material";
import { Internationalization } from "@syncfusion/ej2-base";
import {
  Agenda,
  Inject,
  Month,
  ResourceDirective,
  ResourcesDirective,
  ScheduleComponent,
  TimelineMonth,
  TimelineViews,
  ViewDirective,
  ViewsDirective,
  Week,
} from "@syncfusion/ej2-react-schedule";

const kelasData = [
  { ClassText: "Kelas X", Id: 1, ClassColor: "#ffaa00" },
  { ClassText: "Kelas XI", Id: 2, ClassColor: "#f8a398" },
  { ClassText: "Kelas XII", Id: 3, ClassColor: "#7499e1" },
];

const instance = new Internationalization();
const getDateHeaderText = (props) => {
  return (
    <Typography className="text-center" variant="body2" fontWeight={600}>
      {formatDateHeaderToBahasa(
        instance.formatDate(props.date, { format: "EEEE" })
      )}
    </Typography>
  );
};

function TimelineWeekSchedule({ data, classData }) {
  console.log(classData);
  return (
    <ScheduleComponent
      timeFormat="HH:mm"
      showWeekend={false}
      width="100%"
      height="100%"
      workDays={[1, 2, 3, 4, 5]}
      workHours={{ highlight: true, start: "07:00", end: "16:00" }}
      startHour="07:00"
      endHour="17:00"
      selectedDate={new Date(2024, 7, 19)}
      dateHeaderTemplate={getDateHeaderText}
      showHeaderBar={false}
      eventSettings={{ dataSource: data }}
      group={{ byGroupID: true, resources: ["Kelas", "StudentGroup"] }}
      cellClick={(args) => {
        args.cancel = true;
      }}
      cellDoubleClick={(args) => {
        args.cancel = true;
      }}
    >
      <ViewsDirective>
        <ViewDirective option="TimelineWeek" />
      </ViewsDirective>
      <ResourcesDirective>
        <ResourceDirective
          field="student_group_id"
          title="StudentGroup"
          name="StudentGroup"
          groupIDField="group_id"
          allowMultiple={true}
          dataSource={classData}
          textField="name"
          idField="id"
        />

        <ResourceDirective
          field="KelasId"
          title="Kelas"
          name="Kelas"
          allowMultiple={false}
          dataSource={kelasData}
          textField="ClassText"
          idField="Id"
          colorField="ClassColor"
        />
      </ResourcesDirective>
      <Inject services={[Week, Month, TimelineViews, TimelineMonth, Agenda]} />
    </ScheduleComponent>
  );
}

export default TimelineWeekSchedule;

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
