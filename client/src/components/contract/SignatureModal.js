import { Modal, Box } from '@mui/material';
import SignaturePad from './SignaturePad';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const SignatureModal = ({ open, onClose, onSave }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <SignaturePad onSave={(data) => {
          onSave(data);
          onClose();
        }} />
      </Box>
    </Modal>
  );
};

export default SignatureModal;