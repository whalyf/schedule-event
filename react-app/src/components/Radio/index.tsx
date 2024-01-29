import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

export const RadioGp = ({
  $row = true,
  $default,
  handleSetAccess,
}: {
  $row?: boolean;
  $default: 'public' | 'private';
  handleSetAccess: () => void;
}) => (
  <RadioGroup
    row={$row}
    aria-labelledby="demo-row-radio-buttons-group-label"
    name="row-radio-buttons-group"
    value={$default}
    sx={{ justifyContent: 'center' }}
  >
    <FormControlLabel value="public" control={<Radio />} label="Público" />
    <FormControlLabel
      value="private"
      control={<Radio />}
      label="Privado"
      onClick={handleSetAccess}
    />
  </RadioGroup>
);
