import { useAdministrationSelector } from "@/app/administration/hooks";
import ProgressAlert from "../../../components/ProgressAlert";
import {
  selectIsOpenProgressAlert,
  selectProgress,
  selectProgressLog,
} from "../utils/staffAttendanceSlice";

export default function StaffAttendanceProgressAlert() {
  const progress = useAdministrationSelector(selectProgress);
  const progressLog = useAdministrationSelector(selectProgressLog);
  const isOpenProgressAlert = useAdministrationSelector(
    selectIsOpenProgressAlert
  );

  return (
    <ProgressAlert
      open={isOpenProgressAlert}
      title="Sedang Mengimport Data Kehadiran Karyawan"
      report={[progress, progressLog]}
    />
  );
}
