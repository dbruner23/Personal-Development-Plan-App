import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Pathway2Popover() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" className="bg-[#4d8964]" onClick={handleClick}>
       Objective 2
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>Take up leadership responsibilities</Typography>
        <Typography sx={{ p: 2 }}>Lead two team meetings this quarter</Typography>
        <Typography sx={{ p: 2 }}>Plan and lead a team initiative to collectively learn a new tool or skill</Typography>
        <Typography sx={{ p: 2 }}>Plan the next team offsite or activity</Typography>
      </Popover>
    </div>
  );
}
