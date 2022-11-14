import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useRouter } from 'next/router';

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

type Props = {
  handleSubmit: () => void
}

export default function ThankYouModal(props: Props) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter()
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    router.push('/dashboard')
};
  

  return (
    <div>
      <Button onClick={() => { handleOpen(); props.handleSubmit(); } } variant="contained" className="bg-[#1848C8]">
       Submit Feedback
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Thank you for your feedback. 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Have a great day!
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
