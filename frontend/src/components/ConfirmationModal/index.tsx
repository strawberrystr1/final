import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

interface IProps {
  isOpen: boolean;
  title: string;
  cancelHandler: () => void;
  confirmHandler: () => void;
}

export const ConfirmationModal: FC<IProps> = ({ isOpen, title, cancelHandler, confirmHandler }) => {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onClose={cancelHandler}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button onClick={cancelHandler} variant="contained" color="error">
          {t('cancel')}
        </Button>
        <Button onClick={confirmHandler} variant="contained" color="success">
          {t('confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
