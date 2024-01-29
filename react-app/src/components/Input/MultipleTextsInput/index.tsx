import { Chip, FormControl, Input } from '@mui/material';
import { useState } from 'react';

export const MultipleTextsInput = ({
  invited,
  setDefineAccess,
}: {
  invited: string[];
  setDefineAccess: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      access: 'public' | 'private';
      invited: string[];
    }>
  >;
}) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const [currValue, setCurrValue] = useState('');

  const handleKeyUp = (e: any) => {
    if (currValue.match(emailRegex) && (e.keyCode === 32 || e.keyCode === 13)) {
      setDefineAccess((oldState) => ({
        ...oldState,
        invited: [...oldState.invited, e.target.value],
      }));
      setCurrValue('');
    }
  };

  const handleChange = (e: any) => {
    setCurrValue(e.target.value);
  };

  const handleDelete = (item: any, index: any) => {
    const arr = [...invited];
    arr.splice(index, 1);
    setDefineAccess((oldValues) => ({ ...oldValues, invited: arr }));
  };

  return (
    <FormControl>
      <div className={'container'}>
        {invited.map((item, index) => (
          <Chip
            key={index}
            size="small"
            onDelete={() => handleDelete(item, index)}
            label={item}
          />
        ))}
      </div>
      <Input
        value={currValue}
        onChange={handleChange}
        onKeyDown={handleKeyUp}
        type="email"
      />
    </FormControl>
  );
};
