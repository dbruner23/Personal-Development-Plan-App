import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function CubesModal3() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button className='text-white'  onClick={handleOpen}>UX Designer</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Become an agile User Experince (UX) Designer with Mission Ready
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          19 WEEKS.
          NZQA-Approved Certificate in Digital Technology Product Solutions (Level 5) and Applied Digital Technology Product Solutions (Level 6). Are you interested in designing meaningful & relevant experiences to create a technology solution that is loved by humans? You’ll learn how to combine technology, design, market research, psychology & business; and be confident at designing tech products & solutions; and meet inspiring industry mentors and speakers. If you enjoy understanding what makes humans tick and have a high level of empathy for people and their technology journey, then a career in UX design is for you.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
