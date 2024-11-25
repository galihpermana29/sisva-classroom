import Image from 'next/image';

import SisvaButton from '@/app/classroom/shared/presentation/Button/GlobalButton';
import TrashIcon from '@/assets/icons/trash.png';

import CustomModal from './CustomModal';

const DeleteConfirmationModal = ({
  isModalVisible,
  handleDeleteTeachingPlan,
  handleCancel,
  isDeleting,
}) => {
  return (
    <CustomModal
      width={400}
      open={isModalVisible}
      onCancel={handleCancel}
      footer={[
        <div className="grid grid-cols-2 gap-2" key={1}>
          <SisvaButton onClick={handleCancel} btn_type="secondary">
            Batal
          </SisvaButton>
          <SisvaButton onClick={handleDeleteTeachingPlan} disabled={isDeleting}>
            Hapus
          </SisvaButton>
        </div>,
      ]}
    >
      <div className="text-center">
        <Image src={TrashIcon} alt="Trash" className="size-36" />

        <h3>Hapus Rencana Pembelajaran</h3>
        <p>Anda akan menghapus rencana pembelajaran. Apakah anda yakin?</p>
      </div>
    </CustomModal>
  );
};

export default DeleteConfirmationModal;
