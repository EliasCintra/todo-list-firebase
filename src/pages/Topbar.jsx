import { useState } from 'react';
import { ImExit } from "react-icons/im";
import { useUser } from '../auth/UserContext';
import { useNavigate } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Avatar } from '@mui/material';

const Topbar = () => {
  const { user, setUser } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/login', { replace: true });
    handleMenuClose();
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ flex: 1 }}></div>
      <IconButton onClick={handleMenuOpen}>
        <Avatar src={user?.photoURL} alt="User" />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <MenuItem>
            <strong>Olá, {user?.displayName}! </strong> 
          </MenuItem>
          <MenuItem onClick={handleLogout}> 
            <ImExit />  Sair
          </MenuItem>
        </div>
      </Menu> 
    </div>
  );
};

export default Topbar;
