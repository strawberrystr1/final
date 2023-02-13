import { useState } from 'react';
import { Box, Button, Dialog } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

export const CreateCollectionPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => setIsOpen(prev => !prev);

  const handleDialogClose = () => setIsOpen(false);

  return (
    <Box>
      <Button onClick={handleButtonClick} variant="contained">
        <Typography sx={{ textTransform: 'none' }}>Create collection</Typography>
      </Button>
      <Dialog onClose={handleDialogClose} open={isOpen} maxWidth="lg">
        <DialogTitle>
          <Typography fontSize={24}>Create collection</Typography>
        </DialogTitle>
      </Dialog>
    </Box>
  );
};
