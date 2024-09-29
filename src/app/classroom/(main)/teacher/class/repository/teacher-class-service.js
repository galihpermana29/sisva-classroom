"use server";

import { AppFetchApi } from "@/app/classroom/shared/usecase/global-fetch-api";
import {
  generateErrorMessageFromServerError,
  generateSuccessResponseFromServer,
  serverResponseHandler,
} from "@/app/classroom/shared/usecase/server-response-handler";
import { getServerSession } from "@/app/classroom/shared/usecase/session/get-server-session";
import {
  getClassByTeacherId,
  getClassWithTaskList,
} from "../usecase/data-mapper-service";

export async function getTeacherClassList() {
  const res = await AppFetchApi("/academic/v1/classes", {
    method: "GET",
    headers: {
      "X-Sisva-Source": "academic.curriculum.test",
    },
  });

  const structuredResponse = await serverResponseHandler(
    res,
    "Error fetch class list",
    "Success fetch class list"
  );

  if (structuredResponse.success) {
    const session = getServerSession();
    const teacherId = session?.id;

    // Filter classes by teacher id
    const destructListByTeacherId = getClassByTeacherId(
      structuredResponse,
      teacherId
    );

    // fetch all task list
    const getTaskList = await getAllTaskList();

    if (getTaskList.success) {
      // combine class with task list
      const classWithTask = getClassWithTaskList(
        getTaskList.data,
        destructListByTeacherId
      );

      return generateSuccessResponseFromServer(
        "Success fetch class list",
        classWithTask
      );
    } else {
      return generateErrorMessageFromServerError(
        getTaskList.code,
        "Error fetch task list",
        null
      );
    }
  } else {
    return generateErrorMessageFromServerError(
      structuredResponse.code,
      "Error fetch class list",
      null
    );
  }
}

export async function getAllTaskList() {
  const res = await AppFetchApi("/classroom/v1/tasks", {
    method: "GET",
    headers: {
      "X-Sisva-Source": "tenant.user.test",
    },
  });

  return serverResponseHandler(
    res,
    "Error fetch task list",
    "Success fetch task list"
  );
}

export async function getPeriodDropdown() {
  const res = await AppFetchApi("/academic/v1/periods", {
    method: "GET",
    headers: {
      "X-Sisva-Source": "academic.curriculum.test",
    },
  });

  return serverResponseHandler(
    res,
    "Error fetch period dropdown",
    "Success fetch period dropdown"
  );
}

export async function getGradeDropdownById(id) {
  const res = await AppFetchApi(`/academic/v1/study-programs/${id}`, {
    method: "GET",
    headers: {
      "X-Sisva-Source": "academic.curriculum.test",
    },
  });

  return serverResponseHandler(
    res,
    "Error fetch grade dropdown",
    "Success fetch grade dropdown"
  );
}

export async function getStudentGroupList(period_id, grade, study_program_id) {
  const res = await AppFetchApi(
    `/academic/v1/student-groups?period_id=${period_id}&grade=${grade}&study_program_id=${study_program_id}`,
    {
      method: "GET",
      headers: {
        "X-Sisva-Source": "academic.curriculum.test",
      },
    }
  );

  return serverResponseHandler(
    res,
    "Error fetch student group list",
    "Success fetch student group list"
  );
}
