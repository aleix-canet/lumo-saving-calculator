import { Add, Close, Remove } from '@mui/icons-material';
import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  InputBase,
} from '@mui/material';
import { useState } from 'react';

interface BedroomSelectorProps {
  numberOfBedrooms: number;
  setNumberOfBedrooms: (value: number) => void;
}

const BedroomSelector = ({
  numberOfBedrooms,
  setNumberOfBedrooms,
}: BedroomSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [tempValue, setTempValue] = useState(numberOfBedrooms);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleUpdate = () => {
    setNumberOfBedrooms(tempValue);
    handleClose();
  };

  const increment = () => {
    setTempValue(prev => Math.min(prev + 1, 7));
  };

  const decrement = () => {
    setTempValue(prev => Math.max(prev - 1, 1));
  };

  return (
    <>
      <span
        className="text-gray-500 underline cursor-pointer text-3xl font-light"
        onClick={handleOpen}
      >
        {numberOfBedrooms} bed
      </span>

      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            className:
              'w-[50%] p-8 rounded-[52px]! shadow-xl items-center relative',
          },
        }}
      >
        <IconButton
          className="absolute! top-4 right-4 text-gray-400! bg-gray-500! hover:text-gray-600! hover:bg-gray-700! rounded-full mr-4! mt-5! w-8 h-8"
          onClick={handleClose}
        >
          <Close className="text-white" />
        </IconButton>

        <DialogContent>
          <div className="text-center text-gray-700 text-lg font-normal my-6">
            Number of bedrooms in your home
          </div>

          <div className="flex items-center justify-center gap-4">
            <IconButton
              onClick={decrement}
              className="border! border-gray-500! border-3! text-gray-700! w-10! h-10!"
            >
              <Remove className="text-gray-500" strokeWidth={2} />
            </IconButton>

            <InputBase
              value={tempValue}
              onChange={e =>
                setTempValue(
                  Math.max(1, Math.min(7, parseInt(e.target.value) || 1)),
                )
              }
              inputProps={{
                className:
                  'w-16! h-10! text-center border! border-gray-300! border-2! rounded-lg! text-lg! text-gray-900! font-normal!',
              }}
            />

            <IconButton
              onClick={increment}
              className="border! border-gray-500! border-3! text-gray-700! w-10! h-10!"
            >
              <Add className="text-gray-500" strokeWidth={2} />
            </IconButton>
          </div>
        </DialogContent>

        <DialogActions className="justify-center mt-8">
          <button
            onClick={handleUpdate}
            className="px-8 py-5 bg-[#1FEA71]! rounded-[52px]"
          >
            <span className="text-zinc-900 text-lg font-normal">
              Update your estimate
            </span>
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BedroomSelector;
