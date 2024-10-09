"use client";

import { Plus } from "@untitled-ui/icons-react";

import SisvaButton from "src/app/classroom/shared/presentation/Button/GlobalButton";

import EmptyState from "../../view/presentation/EmptyState/EmptyState";
import TeachingPlanTitle from "./view/presentation/TeachingPlanTitle";
import TeachingPlanListSkeleton from "./view/presentation/TeachingPlanListSkeleton";
import TeachingPlanList from "./view/presentation/TeachingPlanList";
import { useTeachingPlan } from "./usecase/use-teaching-plan";
import TeachingPlanContainer from "./view/container/TeachingPlanContainer";

const TeachingPlanPane = () => {

  return <TeachingPlanContainer />;
};

export default TeachingPlanPane;
