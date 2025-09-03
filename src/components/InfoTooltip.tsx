import HelpOutline from '@mui/icons-material/HelpOutline';
import {
  ClickAwayListener,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from 'react';

interface InfoTooltipProps {
  title: string;
}

const InfoTooltip = ({ title }: InfoTooltipProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => setOpen(false), 3500);
    return () => clearTimeout(id);
  }, [open]);

  if (!isMobile) {
    return (
      <Tooltip title={title} arrow placement="top">
        <HelpOutline
          fontSize="small"
          className="mx-2 text-zinc-400 cursor-pointer"
        />
      </Tooltip>
    );
  }

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <span>
        <Tooltip title={title} arrow placement="top" open={open}>
          <IconButton
            size="small"
            onClick={() => setOpen(o => !o)}
            sx={{ p: 0.5 }}
          >
            <HelpOutline fontSize="small" className="mx-2 text-zinc-400" />
          </IconButton>
        </Tooltip>
      </span>
    </ClickAwayListener>
  );
};

export default InfoTooltip;
