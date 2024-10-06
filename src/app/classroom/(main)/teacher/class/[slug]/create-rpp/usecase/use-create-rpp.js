import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postCreateRpp } from "../repository/create-rpp-service";
import toast from "react-hot-toast";
import { useForm } from "antd/es/form/Form";
import { setMaterials } from "@/app/classroom/shared/redux/teachingMaterialSlice";
import { setTasks } from "@/app/classroom/shared/redux/taskSlice";
import { filterTableListById } from "../../edit-rpp/[id]/model/edit-rpp-data-mapper";
import { patchUpdateRpp } from "../../edit-rpp/[id]/repository/edit-rpp-service";

export const useCreateRpp = (initialData) => {
  const [form] = useForm();
  const materials = useSelector((state) => state.teachingMaterials.materials);
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const getParam = useParams();
  const { slug, id } = getParam;

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
    }
  }, []);

  const handleSubmitCreateRPPForm = async (value) => {
    const payload = {
      class_id: parseInt(slug),
      title: value.title,
      markdown: value.markdown,
      teaching_materials: materials.map((item) => ({
        id: item.id,
      })),
      tasks: tasks.map((item) => ({
        id: item.id,
      })),
      teaching_goal: value.teaching_goal,
      teaching_activity: value.teaching_activity,
      teaching_scoring: value.teaching_scoring,
    };

    setIsLoading(true);

    const response = isEditRpp
      ? await patchUpdateRpp(id, payload)
      : await postCreateRpp(payload);

    if (response.success) {
      router.push(`/classroom/teacher/class/${slug}`);
      toast.success(`Success ${isEditRpp ? "edit" : "create"} teaching plan`);
    } else {
      toast.error(`Error ${isEditRpp ? "edit" : "create"} teaching plan`);
    }
    setIsLoading(false);
  };

  return {
    handleSubmitCreateRPPForm,
    isLoading,
    form,
    isEditRpp,
  };
};
