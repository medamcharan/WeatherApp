import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Avatar } from '@mui/material';

export default function DenseAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
        <Toolbar variant="dense">
          <IconButton edge="start" color="secondary" aria-label="menu" sx={{ mr: 2 }}>
            <Avatar
              alt="Weather"
              src="/logo...jpg"
              sx={{
                '&:hover': {
                  transform: 'scale(1.1)',  // Slight zoom effect on hover
                  transition: 'transform 0.3s ease', // Smooth transition
                  boxShadow: '0 0 10px rgba(255, 255, 255, 0.7)', // Glowing effect
                },
              }}
            />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{
              position: 'relative', // Needed for the underline
              '&:hover': {
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '0%', // Initially, the underline has 0% width
                  height: '2px', // Thin underline
                  backgroundColor: 'white', // White color for the underline
                  animation: 'moveUnderline 0.5s forwards', // Animation for moving underline
                },
                // Glowing effect for the text
                textShadow: '0 0 8px rgba(255, 255, 255, 0.7), 0 0 16px rgba(255, 255, 255, 0.6)', // White glowing effect
              },
              '@keyframes moveUnderline': {
                '0%': {
                  width: '0%', // Start with no width
                },
                '100%': {
                  width: '100%', // Full width when animation is complete
                },
              },
            }}
          >
            M C - W E A T H E R
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
