import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MultipleTextsInput } from '../../Input/MultipleTextsInput';

export const InviteEventDialog = ({
  setDefineAccess,
  defineAccess,
}: {
  setDefineAccess: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      access: 'public' | 'private';
      invited: string[];
    }>
  >;
  defineAccess: {
    open: boolean;
    access: 'public' | 'private';
    invited: string[];
  };
}) => {
  console.log(defineAccess);
  return (
    <Dialog
      open={defineAccess.open}
      onClose={() => {}}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Convidados ?'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Digite o e-mail dos convidados
        </DialogContentText>

        <MultipleTextsInput
          invited={defineAccess.invited}
          setDefineAccess={setDefineAccess}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() =>
            setDefineAccess({ open: false, access: 'public', invited: [] })
          }
        >
          Cancelar
        </Button>
        <Button
          onClick={() => setDefineAccess((old) => ({ ...old, open: false }))}
          autoFocus
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
