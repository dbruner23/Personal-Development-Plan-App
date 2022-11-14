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

export default function SoftwareDeveloperModal1() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>More info about this pathway</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Study Software Development with Mission Ready
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          6 - 8 months.
          NZQA-Approved Level 4, 5 & 6.
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Are you interested in solving real world business and community problems with the power of mobile and web? You will learn how to create responsive mobile-first web applications and be confident problem solver using code. If you are a hands-on creator and enjoy making, testing and seeing your creations come to life, then a career in full-stack and software development is for you.
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           In our 10-week industry experience, you will gain real work experience and learn on the job what it takes to become a professional with work experience, relevant skills, industry network, employer reference and a job interview.
          </Typography>
          
        </Box>
      </Modal>
    </div>
  );
}