import SignatureCanvas from 'react-signature-canvas';
import { Button, Box } from '@mui/material';
import { useRef } from 'react';

const SignaturePad = ({ onSave }) => {
  const sigPad = useRef();

  const clear = () => {
    sigPad.current.clear();
  };

  const save = () => {
    if (sigPad.current.isEmpty()) {
      alert('서명을 해주세요.');
      return;
    }
    const signatureData = sigPad.current.toDataURL();
    onSave(signatureData);
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box 
        sx={{ 
          border: '1px solid #ccc',
          backgroundColor: '#fff',
          mb: 2 
        }}
      >
        <SignatureCanvas
          ref={sigPad}
          canvasProps={{
            width: 500,
            height: 200,
            className: 'signature-canvas'
          }}
        />
      </Box>
      <Box sx={{ '& button': { mx: 1 } }}>
        <Button variant="outlined" onClick={clear}>
          지우기
        </Button>
        <Button variant="contained" onClick={save}>
          저장
        </Button>
      </Box>
    </Box>
  );
};

export default SignaturePad;