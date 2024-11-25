import { useParams, useRouter } from 'next/navigation';
import React from 'react';

import SisvaButton from '@/app/classroom/shared/presentation/Button/GlobalButton';
import { generalDateFormatter } from '@/app/classroom/shared/usecase/helper';

const AssignmentCard = ({ assignment, assignmentName, desc, deadline }) => {
  const router = useRouter();
  const { id } = useParams();
  const isSubmitted = assignment.submission?.attachment_file_uri ? true : false;

  return (
    <div className="p-4 rounded-md shadow-card">
      <h3 className="text-xl">{assignmentName}</h3>

      <div className="pl-4">
        <CardSection title="Deadline">
          <p>{generalDateFormatter(deadline)}</p>
        </CardSection>

        <CardSection title="Deskripsi">
          <div
            className="h-10 border line-clamp-2"
            dangerouslySetInnerHTML={{ __html: desc }}
          ></div>
        </CardSection>

        <CardSection title="Status Pengumpulan">
          <p
            className={`font-bold ${
              isSubmitted ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {isSubmitted ? 'Sudah Dikumpulkan' : 'Belum Mengumpulkan'}
          </p>
        </CardSection>
      </div>

      <div className="grid mt-6">
        <SisvaButton
          onClick={() =>
            router.push(`/classroom/student/class/${id}/task/${assignment.id}`)
          }
        >
          Detail
        </SisvaButton>
      </div>
    </div>
  );
};

export default AssignmentCard;

const CardSection = ({ title, children }) => {
  return (
    <div className="mt-4">
      <h3 className="text-xs font-semibold">{title}</h3>
      <div className="grid gap-4 text-sm">{children}</div>
    </div>
  );
};
