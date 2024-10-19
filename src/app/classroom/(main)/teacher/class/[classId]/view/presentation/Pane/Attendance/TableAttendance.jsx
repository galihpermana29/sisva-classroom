import { useState, useEffect, useMemo } from "react";
import { Avatar, Table, Modal, Divider } from "antd";
import { ConfigProvider } from "antd";
import { Kumbh_Sans } from "next/font/google";
import placeholderImage from "@/assets/placeholder.jpg";
import {
  useAttendance,
  useUpdateAttendance,
} from "../../../../usecase/use-attendance";
import { Check, Edit01 } from "@untitled-ui/icons-react";
import SisvaButton from "@/app/classroom/shared/presentation/Button/GlobalButton";
import clsx from "clsx";
import BadgeAttendance from "../../../container/BadgeAttendance/BadgeAttendance";
import { useClass } from "../../../../usecase/use-class";
import AvatarProfile from "@/app/classroom/shared/presentation/Profile/AvatarProfile";
import { formatDateDay } from "../../../../usecase/dateFormatter";

const kumbh = Kumbh_Sans({ subsets: ["latin"] });

const optionAttendance = [
  { key: "present", text: "Hadir" },
  { key: "sick", text: "Sakit" },
  { key: "leave", text: "Izin" },
  { key: "absent", text: "Alpha" },
];

export default function TableAttendances() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const { attendances, loading } = useAttendance();
  const { classData } = useClass();
  const [attendanceData, setAttendanceData] = useState([]);
  const { loading: loadingUpdate, updateAttendance } = useUpdateAttendance();

  useEffect(() => {
    if (attendances.length > 0) {
      setAttendanceData(attendances);
    }
  }, [attendances]);

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedRecord(null);
    setSelectedOption("");
  };

  const showModal = (record) => {
    setSelectedRecord(record);
    setModalVisible(true);
    setSelectedOption(record.status);
  };

  const groupedData = useMemo(() => {
    const grouped = {};
    attendanceData.forEach((attendance) => {
      if (!grouped[attendance.student_id]) {
        grouped[attendance.student_id] = {
          student_id: attendance.student_id,
          student_name: attendance.student_name,
          profile_image_uri:
            attendance.student_profile_uri || placeholderImage.src,
          attendance: {},
        };
      }
      grouped[attendance.student_id].attendance[attendance.date] =
        attendance.status;
    });
    return Object.values(grouped);
  }, [attendanceData]);

  const uniqueDates = useMemo(() => {
    const dates = [...new Set(attendanceData.map((a) => a.date))];
    return dates.sort();
  }, [attendanceData]);

  const columns = useMemo(() => {
    const baseColumns = [
      {
        title: "Siswa",
        dataIndex: "student_name",
        key: "student_name",
        align: "center",
        fixed: "left",
        width: 170,
        render: (text, record) => (
          <div className="inline-flex items-center">
            <div>
              <AvatarProfile
                size={24}
                url={record.profile_image_uri || placeholderImage.src}
              />
            </div>
            <span className="text-sm font-normal text-[#333333]">
              {record.student_name}
            </span>
          </div>
        ),
      },
    ];

    const dateColumns = uniqueDates.map((date) => ({
      title: (
        <div className="w-fit mx-auto">
          <div className="flex flex-col items-start justify-center">
            <span>{formatDateDay(date).day}</span>
            <span className="text-xs text-base50 font-normal">
              {formatDateDay(date).fullDate}
            </span>
          </div>
        </div>
      ),
      dataIndex: ["attendance", date],
      key: date,
      align: "center",
      render: (status, record) => (
        <div
          className="w-fit mx-auto cursor-pointer"
          onClick={() => showModal({ ...record, date, status })}
        >
          <BadgeAttendance status={status} />
        </div>
      ),
    }));

    return [...baseColumns, ...dateColumns];
  }, [uniqueDates]);

  const handleSave = async () => {
    try {
      const res = await updateAttendance({
        student_id: selectedRecord.student_id,
        date_id: Number(selectedRecord.date),
        status: selectedOption,
      });
      if (res) {
        setAttendanceData((prevAttendances) =>
          prevAttendances.map((attendance) =>
            attendance.student_id === selectedRecord.student_id &&
            attendance.date === selectedRecord.date
              ? { ...attendance, status: selectedOption }
              : attendance
          )
        );
        handleModalClose();
      }
    } catch (error) {
      console.error("Failed to update attendance:", error);
    }
  };

  return (
    <ConfigProvider>
      <Table
        bordered
        dataSource={groupedData}
        columns={columns}
        rowClassName="editable-row"
        loading={loading}
        pagination={false}
        tableLayout="auto"
        scroll={{
          x: "max-content",
        }}
      />

      {selectedRecord && (
        <Modal
          title={
            <div className="text-xl font-semibold text-base90">Absensi</div>
          }
          open={modalVisible}
          className={`${kumbh.className} w-full max-w-xs`}
          onCancel={handleModalClose}
          footer={[
            <SisvaButton
              key="cancel"
              onClick={handleModalClose}
              btn_size="sm"
              btn_type="secondary"
              className="px-6 w-full"
            >
              Batal
            </SisvaButton>,
            <SisvaButton
              key="save"
              onClick={handleSave}
              btn_size="sm"
              className="px-6 w-full"
              loading={loadingUpdate}
            >
              Simpan
            </SisvaButton>,
          ]}
        >
          <div>
            <div className="mt-1.5">
              <span className="text-xs text-base60 font-bold">
                {formatDateDay(selectedRecord.date).day}
              </span>
              <span className="text-xs text-base60">
                , {formatDateDay(selectedRecord.date).fullDate}
              </span>
            </div>
            <Divider />
            <div className="flex items-center justify-center mt-4">
              <Avatar
                src={selectedRecord.profile_image_uri || placeholderImage.src}
                size={50}
              />
              <div className="ml-4 flex flex-col">
                <span className="text-sm font-medium text-[#444444]">
                  {selectedRecord.student_name}
                </span>
                <span className="text-xs text-[#969696] ">
                  {classData.class_name}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center items-center mt-5">
              {optionAttendance.map((opt) => (
                <div key={opt.key}>
                  <label
                    htmlFor={opt.key}
                    className={clsx(
                      "w-[110px] h-[70px] inline-flex justify-center gap-2 items-center p-4 rounded-3xl",
                      selectedOption === opt.key
                        ? "bg-secondary50 border-secondary50 text-white"
                        : "bg-white border-2 border-solid border-base60 text-base60"
                    )}
                  >
                    {selectedOption === opt.key && (
                      <div className="inline-flex items-center justify-center size-6 rounded-full bg-white">
                        <Check className="size-4 text-secondary50" />
                      </div>
                    )}
                    <span
                      className={clsx("font-semibold", {
                        "text-white": selectedOption === opt.key,
                        "text-base60": selectedOption !== opt.key,
                      })}
                    >
                      {opt.text}
                    </span>
                  </label>
                  <input
                    type="radio"
                    id={opt.key}
                    name="attendance"
                    className="hidden"
                    onChange={() => setSelectedOption(opt.key)}
                  />
                </div>
              ))}
            </div>
            <Divider />
          </div>
        </Modal>
      )}
    </ConfigProvider>
  );
}
