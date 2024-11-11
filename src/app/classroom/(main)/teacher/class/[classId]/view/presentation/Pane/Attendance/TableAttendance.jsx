import SisvaButton from "@/app/classroom/shared/presentation/Button/GlobalButton";
import AvatarProfile from "@/app/classroom/shared/presentation/Profile/AvatarProfile";
import { default as placeholderImage } from "@/assets/placeholder.jpg";
import { Check } from "@untitled-ui/icons-react";
import { ConfigProvider, Divider, Modal, Table } from "antd";
import clsx from "clsx";
import { Kumbh_Sans } from "next/font/google";
import { useEffect, useMemo, useState } from "react";
import { formatDateDay } from "../../../../usecase/dateFormatter";
import {
  useAttendance,
  useUpdateAttendance,
} from "../../../../usecase/use-attendance";
import { useClass } from "../../../../usecase/use-class";
import BadgeAttendance from "../../../container/BadgeAttendance/BadgeAttendance";

import { useTokenColor } from "@/app/classroom/shared/usecase/use-token-color";

const kumbh = Kumbh_Sans({ subsets: ["latin"] });

const optionAttendance = [
  { key: "present", text: "Hadir" },
  { key: "sick", text: "Sakit" },
  { key: "leave", text: "Izin" },
  { key: "absent", text: "Alpha" },
];

export default function TableAttendances() {
  const [modalVisible, setModalVisible] = useState(false);
  const [nextPrevModalVisible, setNextPrevModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const { attendances, loading } = useAttendance();
  const { classData } = useClass();
  const [attendanceData, setAttendanceData] = useState([]);
  const { loading: loadingUpdate, updateAttendance } = useUpdateAttendance();
  const { tokenColor } = useTokenColor();

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

  const getCurrentDate = () => {
    const today = new Date();
    return (
      today.getFullYear() * 10000 +
      (today.getMonth() + 1) * 100 +
      today.getDate()
    );
  };

  const getCurrentDateAttendances = () => {
    const currentDate = getCurrentDate().toString();
    return attendanceData.filter(
      (attendance) => attendance.date === currentDate
    );
  };

  const showNextPrevModal = () => {
    const currentDateAttendances = getCurrentDateAttendances();
    if (currentDateAttendances.length > 0) {
      setCurrentStudentIndex(0);
      const firstStudent = currentDateAttendances[0];
      setSelectedRecord(firstStudent);
      setSelectedOption(firstStudent.status);
      setNextPrevModalVisible(true);
    } else {
      console.log("No attendance records for current date");
    }
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
            <div className="size-6">
              <AvatarProfile size={24} url={record.profile_image_uri} />
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

  const handleOptionSelect = async (status) => {
    try {
      await updateAttendance({
        student_id: selectedRecord.student_id,
        date_id: Number(selectedRecord.date),
        status,
      });
      setAttendanceData((prevAttendances) =>
        prevAttendances.map((attendance) =>
          attendance.student_id === selectedRecord.student_id &&
          attendance.date === selectedRecord.date
            ? { ...attendance, status }
            : attendance
        )
      );
    } catch (error) {
      console.error("Failed to update attendance:", error);
    }
  };

  const handleNextPrev = (direction) => {
    const currentDateAttendances = getCurrentDateAttendances();
    const newIndex = currentStudentIndex + direction;

    if (newIndex >= 0 && newIndex < currentDateAttendances.length) {
      setCurrentStudentIndex(newIndex);
      const nextStudent = currentDateAttendances[newIndex];
      setSelectedRecord(nextStudent);
      setSelectedOption(nextStudent.status);
    }
  };

  return (
    <div>
      <div className="inline-flex gap-4 items-center mb-5">
        <h1 className="text-base font-bold text-base90">List Kehadiran</h1>
        <SisvaButton btn_size="sm" onClick={showNextPrevModal}>
          Absensi
        </SisvaButton>
      </div>
      <ConfigProvider>
        <Table
          bordered
          dataSource={groupedData}
          columns={columns}
          rowClassName="editable-row"
          loading={loading}
          pagination={false}
          tableLayout="auto"
          scroll={{ x: "max-content" }}
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
                onClick={() => {
                  handleOptionSelect(selectedOption);
                  handleModalClose();
                }}
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
                <AvatarProfile
                  src={selectedRecord.profile_image_uri}
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
                          ? "text-white"
                          : "bg-white border-2 border-solid border-base60 text-base60"
                      )}
                      style={
                        selectedOption === opt.key
                          ? {
                              backgroundColor: tokenColor,
                              borderColor: tokenColor,
                            }
                          : {}
                      }
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

        {selectedRecord && (
          <Modal
            title={
              <div className="text-xl font-semibold text-base90">Absensi</div>
            }
            open={nextPrevModalVisible}
            className={`${kumbh.className} w-full max-w-xs`}
            onCancel={() => setNextPrevModalVisible(false)}
            footer={[
              <SisvaButton
                key="prev"
                onClick={() => handleNextPrev(-1)}
                btn_size="sm"
                btn_type="secondary"
                disabled={currentStudentIndex === 0}
              >
                Previous
              </SisvaButton>,
              <SisvaButton
                key="next"
                onClick={() => handleNextPrev(1)}
                btn_size="sm"
                disabled={
                  currentStudentIndex === getCurrentDateAttendances().length - 1
                }
              >
                Next
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
                <AvatarProfile
                  src={selectedRecord.profile_image_uri}
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
                          ? "text-white"
                          : "bg-white border-2 border-solid border-base60 text-base60"
                      )}
                      style={
                        selectedOption === opt.key
                          ? {
                              backgroundColor: tokenColor,
                              borderColor: tokenColor,
                            }
                          : {}
                      }
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
                      id={`nextprev-${opt.key}`}
                      name="nextprev-attendance"
                      className="hidden"
                      onChange={() => {
                        setSelectedOption(opt.key);
                        handleOptionSelect(opt.key);
                      }}
                    />
                  </div>
                ))}
              </div>
              <Divider />
            </div>
          </Modal>
        )}
      </ConfigProvider>
    </div>
  );
}
