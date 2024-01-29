import { Theme, makeStyles } from '@mui/material';

export const useStyles = makeStyles((theme: Theme) => ({
  formControlRoot: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '300px',
    flexWrap: 'wrap',
    flexDirection: 'row',
    border: '2px solid lightgray',
    padding: 4,
    borderRadius: '4px',
    '&> div.container': {
      gap: '6px',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    '& > div.container > span': {
      backgroundColor: 'gray',
      padding: '1px 3px',
      borderRadius: '4px',
    },
  },
}));
