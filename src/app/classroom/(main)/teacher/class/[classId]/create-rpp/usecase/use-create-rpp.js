import { setTasks } from "@/app/classroom/shared/redux/taskSlice";
import { setMaterials } from "@/app/classroom/shared/redux/teachingMaterialSlice";
import { useForm } from "antd/es/form/Form";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { filterTableListById } from "../../edit-rpp/[id]/model/edit-rpp-data-mapper";
import { patchUpdateRpp } from "../../edit-rpp/[id]/repository/edit-rpp-service";
import {
  postCreateRpp,
  postCreateTask,
  putUpdateTask,
} from "../repository/create-rpp-service";

export const useCreateRpp = (initialData) => {
  const [form] = useForm();
  const materials = useSelector((state) => state.teachingMaterials.materials);
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const getParam = useParams();
  const { classId, id } = getParam;

  const isEditRpp = initialData.initialFormData !== undefined;

  /**
   * Set initial data for edit form
   */
  useEffect(() => {
    if (isEditRpp) {
      form.setFieldsValue(initialData.initialFormData);

      const filteredMaterials = filterTableListById(
        initialData.teachingMaterialList,
        initialData.initialFormData.teaching_materials
      );
      const filteredTasks = filterTableListById(
        initialData.taskList,
        initialData.initialFormData.tasks
      );

      dispatch(setMaterials(filteredMaterials));
      dispatch(setTasks(filteredTasks));
    } else {
      dispatch(setMaterials([]));
      dispatch(setTasks([]));
    }
  }, []);

  const handleSubmitCreateRPPForm = async (value) => {
    setIsLoading(true);
    try {
      const taskIds = [];

      for (const task of tasks) {
        let response;

        if (task.isTemporaryTaskState) {
          const payload = {
            class_id: task.class_id,
            name: task.name,
            description: task.description,
            deadline: task.deadline,
            allow_submission: task.allow_submission,
            allow_overdue_submission: task.allow_overdue_submission,
            attachment_file_uri: task.attachment_file_uri,
          };
          response = await postCreateTask(payload);

          if (!response.success) {
            toast.error(`${response.message}: ${task.name}`);
            setIsLoading(false);
            return;
          }
          taskIds.push(response.data);
        } else if (task.isTemporaryEditTaskState) {
          const payload = {
            class_id: task.class_id,
            name: task.name,
            description: task.description,
            deadline: task.deadline,
            allow_submission: task.allow_submission,
            allow_overdue_submission: task.allow_overdue_submission,
            attachment_file_uri: task.attachment_file_uri,
          };
          response = await putUpdateTask(task.id, payload);

          if (!response.success) {
            toast.error(`${response.message}: ${task.name}`);
            setIsLoading(false);
            return;
          }
          taskIds.push(response.data);
        } else {
          taskIds.push(task.id);
        }
      }

      const payload = {
        class_id: parseInt(classId),
        title: value.title,
        markdown: value.markdown,
        teaching_materials: materials.map((item) => ({
          id: item.id,
        })),
        tasks: taskIds.map((id) => ({
          id: id,
        })),
        teaching_goal: value.teaching_goal,
        teaching_activity: value.teaching_activity,
        teaching_scoring: value.teaching_scoring,
      };

      const response = isEditRpp
        ? await patchUpdateRpp(id, payload)
        : await postCreateRpp(payload);

      if (response.success) {
        toast.success(`Success ${isEditRpp ? "edit" : "create"} teaching plan`);
        window.location.href = `/classroom/teacher/class/${classId}`;
      } else {
        toast.error(
          `Error ${isEditRpp ? "edit" : "create"} teaching plan, ${
            response.message
          }`
        );
      }
    } catch (error) {
      toast.error(`Error processing create rpp: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSubmitCreateRPPForm,
    isLoading,
    form,
    isEditRpp,
  };
};
