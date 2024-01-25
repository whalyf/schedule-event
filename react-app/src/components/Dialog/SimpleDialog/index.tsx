import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

export default function SimpleDialog(
  isOpen: boolean,
  handleSetIsOpen: () => void,
  handleConfirm: () => void,
  eventData: {
    description: string;
    startDate: Date;
  },
) {
  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleSetIsOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja excluir seu evento
            <b>{eventData.description}</b> no dia
            {new Date(eventData.startDate).toLocaleDateString('pt-BR')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSetIsOpen}>Cancelar</Button>
          <Button onClick={() => handleConfirm()} autoFocus>
            Remover
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
