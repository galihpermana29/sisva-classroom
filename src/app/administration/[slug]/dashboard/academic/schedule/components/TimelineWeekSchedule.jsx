"use client";

import { Tooltip, Typography } from "@mui/material";
import { Internationalization } from "@syncfusion/ej2-base";
import {
  Inject,
  ResourceDirective,
  ResourcesDirective,
  ScheduleComponent,
  TimelineViews,
  ViewDirective,
  ViewsDirective,
} from "@syncfusion/ej2-react-schedule";
import dayjs from "dayjs";
import "./TimelineWeekSchedule.css";

const gradeDataSource = [
  { gradeText: "Kelas I", grade: "I" },
  { gradeText: "Kelas II", grade: "II" },
  { gradeText: "Kelas III", grade: "III" },
  { gradeText: "Kelas IV", grade: "IV" },
  { gradeText: "Kelas V", grade: "V" },
  { gradeText: "Kelas VI", grade: "VI" },
  { gradeText: "Kelas VII", grade: "VII" },
  { gradeText: "Kelas VIII", grade: "VIII" },
  { gradeText: "Kelas IX", grade: "IX" },
  { gradeText: "Kelas X", grade: "X" },
  { gradeText: "Kelas XI", grade: "XI" },
  { gradeText: "Kelas XII", grade: "XII" },
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

const onEventRendered = (props) => {
  const target = props.element;
  target.style.color = "#1D2939";
  target.style.paddingTop = "2px";
  target.style.backgroundColor =
    props.data.type === "learning" ? "#ACDEE7" : "#FFDBCB";
};

const eventTemplate = (props) => {
  function getTooltipText(name, teacher_name) {
    if (!teacher_name) return name;
    return `${name} - ${teacher_name}`;
  }
  return (
    <Tooltip title={getTooltipText(props.name, props?.teacher_name)}>
      <h3 className="font-medium !text-xs !line-clamp-1">{props.name}</h3>
      <p className="text-[10px]">{props?.teacher_name}</p>
    </Tooltip>
  );
};

function TimelineWeekSchedule({
  data,
  classData,
  onEventClick,
  workDays,
  startTime,
  endTime,
}) {
  return (
    <ScheduleComponent
      //force rerendering ScheduleComponent
      key={JSON.stringify(data)}
      timeFormat="HH:mm"
      showWeekend={false}
      width="100%"
      height="100%"
      timeScale={{ enable: true, interval: 60, slotCount: 5 }}
      rowAutoHeight={true}
      workDays={workDays}
      startHour={startTime}
      endHour={endTime}
      workHours={{ start: startTime, end: endTime, highlight: true }}
      selectedDate={dayjs().toDate()}
      dateHeaderTemplate={getDateHeaderText}
      showHeaderBar={false}
      eventSettings={{
        dataSource: data,
        fields: {
          subject: { title: "Name", name: "name" },
          startTime: { title: "StartTime", name: "start_time" },
          endTime: { title: "EndTime", name: "end_time" },
          isBlock: { title: "IsBlock", name: "is_block" },
        },
        template: eventTemplate,
      }}
      group={{ byGroupID: true, resources: ["Grade", "StudentGroup"] }}
      cellClick={(args) => {
        args.cancel = true;
      }}
      cellDoubleClick={(args) => {
        args.cancel = true;
      }}
      eventClick={onEventClick}
      eventRendered={onEventRendered}
    >
      <ViewsDirective>
        <ViewDirective option="TimelineWeek" />
      </ViewsDirective>
      <ResourcesDirective>
        <ResourceDirective
          field="sg_id"
          title="StudentGroup"
          name="StudentGroup"
          groupIDField="grade"
          dataSource={classData}
          textField="name"
          idField="id"
          colorField="group_color"
        />
        <ResourceDirective
          field="grade"
          title="Grade"
          name="Grade"
          dataSource={gradeDataSource}
          textField="gradeText"
          idField="grade"
        />
      </ResourcesDirective>
      <Inject services={[TimelineViews]} />
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
