import { Add, Close, Remove } from '@mui/icons-material';
import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  InputBase,
} from '@mui/material';
import { useState } from 'react';
import { useSystemConfig } from '../../../contexts/CalculatorConfigContext';

const MIN_BEDROOMS = 2;
const MAX_BEDROOMS = 4;

const BedroomSelector = () => {
  const [open, setOpen] = useState(false);
  const { config, updateConfig } = useSystemConfig();

  const { numberOfBedrooms } = config;

  const [tempValue, setTempValue] = useState(numberOfBedrooms);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleUpdate = () => {
    updateConfig('numberOfBedrooms', tempValue);
    handleClose();
  };

  const increment = () => {
    setTempValue(prev => Math.min(prev + 1, MAX_BEDROOMS));
  };

  const decrement = () => {
    setTempValue(prev => Math.max(prev - 1, MIN_BEDROOMS));
  };

  return (
    <>
      <span
        className="text-gray-500 underline cursor-pointer text-xl md:text-3xl font-light whitespace-nowrap"
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
              'w-[90%] md:w-[540px] px-6 py-8 rounded-[32px]! md:rounded-[52px]! shadow-xl flex items-center flex-col relative',
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
          <div
            className="text-center text-gray-700 text-lg! md:text-lg
 font-normal my-6"
          >
            Number of bedrooms in your home
          </div>

          <div className="flex items-center justify-center gap-4">
            <IconButton
              onClick={decrement}
              className="border! border-gray-500! hover:border-gray-900! border-3! text-gray-700! w-9 h-9 md:w-10 md:h-10"
            >
              <Remove
                className="text-gray-500 hover:text-gray-900"
                strokeWidth={2}
              />
            </IconButton>

            <InputBase
              value={tempValue}
              onChange={e =>
                setTempValue(
                  Math.max(
                    MIN_BEDROOMS,
                    Math.min(MAX_BEDROOMS, parseInt(e.target.value) || 1),
                  ),
                )
              }
              inputProps={{
                className:
                  'w-16! h-10! text-center border! border-gray-300! border-2! rounded-lg! text-base! md:text-lg! text-gray-900! font-normal!',
              }}
            />

            <IconButton
              onClick={increment}
              className="border! border-gray-500! hover:border-gray-900! border-3! text-gray-700! w-9 h-9 md:w-10 md:h-10"
            >
              <Add
                className="text-gray-500 hover:text-gray-900"
                strokeWidth={2}
              />
            </IconButton>
          </div>
        </DialogContent>

        <DialogActions className="justify-center">
          <button
            onClick={handleUpdate}
            className="w-auto px-8 py-4 md:py-5 bg-[#1FEA71]! rounded-[52px]"
          >
            <span className="text-zinc-900 text-lg! font-normal">
              Update your estimate
            </span>
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BedroomSelector;
