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

const prodiData = [
  { ProdiText: "IPA 1", Id: 1, GroupId: 1, ProdiColor: "#ffaa00" },
  { ProdiText: "IPA 2", Id: 2, GroupId: 1, ProdiColor: "#f8a398" },
  { ProdiText: "IPS 1", Id: 3, GroupId: 2, ProdiColor: "#f92a89" },
  { ProdiText: "IPS 2", Id: 4, GroupId: 2, ProdiColor: "#a3f312" },
  { ProdiText: "IPS 3", Id: 5, GroupId: 3, ProdiColor: "#ffffff" },
];
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

function TimelineWeekSchedule({ data }) {
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
      group={{ byGroupID: false, resources: ["Kelas", "ProgramStudi"] }}
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
          field="ProdiId"
          title="Program Studi"
          name="ProgramStudi"
          groupIDField="GroupId"
          allowMultiple={true}
          dataSource={prodiData}
          textField="ProdiText"
          idField="Id"
          colorField="ProdiColor"
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
