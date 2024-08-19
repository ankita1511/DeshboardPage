// src/components/Widget.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeWidget } from '../features/widgets/widgetsSlice';
import { Paper, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Widget({ widget }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeWidget(widget.id));
  };

  return (
    <Paper style={{ padding: '20px', position: 'relative' }}>
      <Typography variant="h6">{widget.name}</Typography>
      <Typography>{widget.content}</Typography>
      <IconButton
        onClick={handleRemove}
        style={{ position: 'absolute', top: 0, right: 0 }}
      >
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
}

export default Widget;
