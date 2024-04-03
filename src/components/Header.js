import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Help', 'Other'].map((text) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} style={{ marginRight: 'auto' }}>
        <MenuIcon fontSize="large"/>
      </IconButton>
      {/* Spacer to balance the layout */}
      <div style={{ flexGrow: 1 }}></div> 
      <Typography variant="h4" style={{ textAlign: 'center', flexGrow: 2, marginTop: '10px' }}>
        Emotion Recognition
      </Typography>
      {/* Spacer to balance the layout */}
      <div style={{ flexGrow: 1 }}></div>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{ 
          style: { width: '15%' } // Increase the drawer width
        }}
      >
        {list()}
      </Drawer>
    </header>
  );
};

export default Header;
