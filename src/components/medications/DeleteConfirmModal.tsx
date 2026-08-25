import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Trash2, AlertTriangle } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  itemName?: string;
  onConfirm: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  itemName,
  onConfirm
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      subtitle="Esta acción no se puede deshacer"
      icon={<AlertTriangle className="w-8 h-8 text-rose-600" />}
      maxWidth="sm"
      footer={
        <>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="danger"
            size="xl"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            leftIcon={<Trash2 className="w-6 h-6" />}
          >
            Sí, Eliminar
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        {itemName && (
          <div className="bg-rose-50 border-2 border-rose-300 p-4 rounded-2xl">
            <span className="text-xs text-rose-700 font-bold uppercase tracking-wider block">
              Elemento a eliminar:
            </span>
            <span className="text-xl font-black text-rose-950">
              {itemName}
            </span>
          </div>
        )}
        <p className="text-base text-slate-700 font-medium leading-relaxed">
          {message}
        </p>
      </div>
    </Modal>
  );
};
