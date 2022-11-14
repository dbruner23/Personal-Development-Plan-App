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

export default function SoftwareDeveloperModal2() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button  onClick={handleOpen}>More info about this pathway</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Software Development Major
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          3 years - Full time Study at AUT - Bachelor of Computer and Information Sciences
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          1 year - Full time Postgraduate study at the University of Waikato -  Master of Software Engineering
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          In the Software Development major in the Bachelor of Computer and Information Sciences you develop the skills to design and develop new and existing software solutions using common development tools.
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Master degree - This research-focused degree is designed for graduates who wish to do further research and develop an innovative solution to an engineering question. Excellence in advanced engineering design, research and development skills are core features of the degree.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}