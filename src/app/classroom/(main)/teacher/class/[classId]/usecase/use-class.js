import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getAllClasses } from "../repository/teacher-score-service";

export function useClass() {
  const [loading, setLoading] = useState(true);
  const [classData, setClassData] = useState({});
  const params = useParams();
  const { classId } = params;

  useEffect(() => {
    const fetchData = async () => {
      const { data: classes, success: successClasses } = await getAllClasses();
      if (!successClasses || !Array.isArray(classes)) {
        setLoading(false);
        return;
      }

      const classDetail = classes.find((cls) => cls.id == classId);
      if (!classDetail) {
        setLoading(false);
      }

      setClassData({
        class_name: classDetail.student_group_name,
      });
    };
    fetchData();
  }, []);

  return {
    loading,
    classData,
  };
}
