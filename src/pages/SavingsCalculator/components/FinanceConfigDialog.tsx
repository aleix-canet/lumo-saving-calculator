import CloseIcon from '@mui/icons-material/Close';
import { Dialog, IconButton } from '@mui/material';

interface FinanceConfigDialogProps {
  open: boolean;
  onClose: () => void;
}

const FinanceConfigDialog = ({ open, onClose }: FinanceConfigDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      slotProps={{
        paper: {
          className:
            'rounded-[24px] p-8 md:p-12 shadow-xl bg-white overflow-visible',
        },
      }}
    >
      <IconButton
        onClick={onClose}
        className="absolute top-4 right-4 bg-gray-500 text-white hover:bg-gray-600"
      >
        <CloseIcon />
      </IconButton>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <h2 className="text-xl font-medium">Financing your Lumo system</h2>
        </div>

        <div className="flex-1 space-y-6">
          <h2 className="text-xl font-medium">Monthly bill with Lumo</h2>
        </div>
      </div>
    </Dialog>
  );
};

export default FinanceConfigDialog;
