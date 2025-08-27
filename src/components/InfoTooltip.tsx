import HelpOutline from '@mui/icons-material/HelpOutline';
import Tooltip from '@mui/material/Tooltip';

interface InfoTooltipProps {
  title: string;
}

const InfoTooltip = ({ title }: InfoTooltipProps) => (
  <Tooltip title={title} arrow>
    <HelpOutline
      fontSize="small"
      className="mx-2 text-zinc-400 cursor-pointer"
    />
  </Tooltip>
);

export default InfoTooltip;
