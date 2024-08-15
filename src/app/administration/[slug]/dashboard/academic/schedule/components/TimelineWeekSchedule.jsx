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
import dayjs from "dayjs";

const groupData = [
  { GroupText: "Kelas X", Id: 1, GroupColor: "#FFDBCB" },
  { GroupText: "Kelas XI", Id: 2, GroupColor: "#FFDBCB" },
  { GroupText: "Kelas XII", Id: 3, GroupColor: "#FFDBCB" },
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

const eventTemplate = (props) => {
  return (
    <div className="text-[#1D2939] w-full pt-[2px]">
      <h3 className="font-medium !text-xs line-clamp-1">{props.name}</h3>
      <p className="text-[10px]">{props?.teacher_name}</p>
    </div>
  );
};

function TimelineWeekSchedule({ data, classData, onEventClick }) {
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
      selectedDate={dayjs().toDate()}
      dateHeaderTemplate={getDateHeaderText}
      showHeaderBar={false}
      eventSettings={{
        dataSource: data,
        fields: {
          subject: { title: "Name", name: "name" },
          startTime: { title: "StartTime", name: "start_time" },
          endTime: { title: "EndTime", name: "end_time" },
          isBlock: { title: "Block", name: "is_block" },
        },
        template: eventTemplate,
      }}
      group={{ byGroupID: true, resources: ["Group", "StudentGroup"] }}
      cellClick={(args) => {
        args.cancel = true;
      }}
      cellDoubleClick={(args) => {
        args.cancel = true;
      }}
      eventClick={onEventClick}
    >
      <ViewsDirective>
        <ViewDirective option="TimelineWeek" />
      </ViewsDirective>
      <ResourcesDirective>
        <ResourceDirective
          field="sg_id"
          title="StudentGroup"
          name="StudentGroup"
          groupIDField="group_id"
          allowMultiple={false}
          dataSource={classData}
          textField="name"
          idField="id"
          colorField="group_color"
        />

        <ResourceDirective
          field="group_id"
          title="Group"
          name="Group"
          allowMultiple={false}
          dataSource={groupData}
          textField="GroupText"
          idField="Id"
          colorField="GroupColor"
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
