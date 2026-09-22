import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";
import { X } from "lucide-react";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  icon: ReactNode;
  confirmLabel: string;
  cancelLabel: string;
  closeLabel?: string;
  closeOnBackdrop?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmDialog({
  open,
  title,
  children,
  icon,
  confirmLabel,
  cancelLabel,
  closeLabel = "Close dialog",
  closeOnBackdrop = false,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="confirm-dialog"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={onCancel}
      onClick={(event) => {
        if (closeOnBackdrop && event.target === event.currentTarget) onCancel();
      }}
    >
      <div className="dialog-top">
        {icon}
        <button
          className="icon-button"
          aria-label={closeLabel}
          onClick={onCancel}
        >
          <X />
        </button>
      </div>
      <h2 id={titleId}>{title}</h2>
      <p id={descriptionId}>{children}</p>
      <div className="button-row">
        <button className="button button-outline" onClick={onCancel}>
          {cancelLabel}
        </button>
        <button className="button button-light" onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </dialog>
  );
}
