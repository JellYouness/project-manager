import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogProps,
  Button,
} from '@mui/material';

export interface ConfirmDialogProps extends Omit<DialogProps, 'title' | 'content'> {
  title: React.ReactNode;
  content?: React.ReactNode;
  action?: React.ReactNode;
  open: boolean;
  onClose: VoidFunction;
  cancellable?: boolean;
}

const ConfirmDialog = ({
  title,
  content,
  action,
  open,
  onClose,
  cancellable,
  ...other
}: ConfirmDialogProps) => {
  cancellable = cancellable ?? true;
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ pb: 1 }}>{title}</DialogTitle>

      {content && <DialogContent sx={{ typography: 'body2' }}> {content} </DialogContent>}

      {(cancellable || action) && (
        <DialogActions>
          {cancellable && (
            <Button color="inherit" onClick={onClose}>
              Annuler
            </Button>
          )}
          {action}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ConfirmDialog;
