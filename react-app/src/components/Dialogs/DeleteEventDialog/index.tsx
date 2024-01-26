import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export type TDeleteEventModal = {
  deleteEventModal: {
    open: boolean;
    eventId: string;
    startDate: Date;
    description: string;
  };
  setDeleteEventModal: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      eventId: string;
      startDate: Date;
      description: string;
    }>
  >;
  handleDeleteEvent: (eventId: string) => Promise<string | number | void>;
};

export const DeleteEventDialog = ({
  deleteEventModal,
  setDeleteEventModal,
  handleDeleteEvent,
}: TDeleteEventModal) => (
  <Dialog
    open={deleteEventModal.open}
    onClose={() =>
      setDeleteEventModal({
        open: false,
        eventId: '',
        startDate: new Date(),
        description: '',
      })
    }
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{'Excluir ?'}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Tem certeza que deseja excluir seu evento{' '}
        <b>{deleteEventModal.description}</b> no dia{' '}
        {new Date(deleteEventModal.startDate).toLocaleDateString('pt-BR')}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={() =>
          setDeleteEventModal({
            open: false,
            eventId: '',
            startDate: new Date(),
            description: '',
          })
        }
      >
        Cancelar
      </Button>
      <Button
        onClick={async () => {
          await handleDeleteEvent(deleteEventModal.eventId);
          setDeleteEventModal({
            open: false,
            eventId: '',
            startDate: new Date(),
            description: '',
          });
        }}
        autoFocus
      >
        Excluir
      </Button>
    </DialogActions>
  </Dialog>
);
