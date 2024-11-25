import { useAdministrationSelector } from "@/app/administration/hooks";

import ProgressAlert from "../../../components/ProgressAlert";
import {
  selectIsOpenProgressAlert,
  selectProgress,
  selectProgressLog,
} from "../utils/studentAttendanceSlice";

export default function StudentAttendanceProgressAlert() {
  const progress = useAdministrationSelector(selectProgress);
  const progressLog = useAdministrationSelector(selectProgressLog);
  const isOpenProgressAlert = useAdministrationSelector(
    selectIsOpenProgressAlert
  );

  return (
    <ProgressAlert
      open={isOpenProgressAlert}
      title="Sedang Mengimport Data Kehadiran Siswa"
      report={[progress, progressLog]}
    />
  );
}
