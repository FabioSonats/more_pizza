import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Cardapio from './Cardapio';
import Home from './Home';
import Footer from './Footer';
import Privacidade from './Privacidade';
import Checkout from './Checkout';
import Badge from '@mui/material/Badge';
import type { ItemCarrinho } from './Checkout';
import Loader from './Loader';
// Remover qualquer função Home duplicada

// Cores da bandeira da Itália
const theme = createTheme({
  palette: {
    primary: {
      main: '#008000', // Verde
      contrastText: '#fff',
    },
    secondary: {
      main: '#FF0000', // Vermelho
      contrastText: '#fff',
    },
    background: {
      default: '#fff', // Branco
    },
  },
});

function Sobre() {
  return <Typography variant="h4" sx={{ mt: 2 }}>Sobre a Pizzaria (em breve!)</Typography>;
}

const navLinks = [
  { label: 'HOME', to: '/', icon: <HomeIcon /> },
  { label: 'CARDÁPIO', to: '/cardapio', icon: <RestaurantMenuIcon /> },
  { label: 'SOBRE', to: '/sobre', icon: <AccountCircleIcon /> },
];

const App: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawer = (open: boolean) => () => setDrawerOpen(open);
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]); // Corrigido para ItemCarrinho[]
  const [loading, setLoading] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Loader open={loading} />
      <Router>
        <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {/* AppBar moderna com gradiente e logo */}
          <AppBar position="static" sx={{
            background: 'linear-gradient(90deg, #008000 0%, #f5e9da 100%)',
            boxShadow: 3,
            py: 0.5,
          }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {/* Logo estilizado */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocalPizzaIcon sx={{ color: '#fff', fontSize: 36, mr: 1, filter: 'drop-shadow(0 2px 4px #0002)' }} />
                <Typography variant="h5" sx={{ fontWeight: 900, color: '#fff', letterSpacing: 2, textShadow: '0 2px 8px #0002' }}>
                  Pizza Mais
                </Typography>
              </Box>
              {/* Navegação desktop */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
                {navLinks.map((nav) => (
                  <Button
                    key={nav.label}
                    color="inherit"
                    component={Link}
                    to={nav.to}
                    sx={{
                      fontWeight: 700,
                      fontSize: 16,
                      px: 2,
                      borderRadius: 2,
                      transition: 'background 0.2s, color 0.2s, transform 0.2s',
                      '&:hover': {
                        background: '#fff2',
                        color: 'secondary.main',
                        transform: 'scale(1.08)',
                      },
                    }}
                  >
                    {nav.label}
                  </Button>
                ))}
                <IconButton color="inherit" sx={{ ml: 1, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.15)' } }} component={Link} to="/checkout">
                  <Badge badgeContent={carrinho.length} color="error" overlap="circular" invisible={carrinho.length === 0}>
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <IconButton color="inherit" sx={{ ml: 1, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.15)' } }}>
                  <AccountCircleIcon />
                </IconButton>
              </Box>
              {/* Menu hambúrguer mobile */}
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton color="inherit" onClick={handleDrawer(true)}>
                  <MenuIcon fontSize="large" />
                </IconButton>
                <Drawer anchor="right" open={drawerOpen} onClose={handleDrawer(false)}>
                  <Box sx={{ width: 220 }} role="presentation" onClick={handleDrawer(false)}>
                    <List>
                      {navLinks.map((nav) => (
                        <ListItem key={nav.label} disablePadding>
                          <ListItemButton component={Link} to={nav.to}>
                            <ListItemIcon>{nav.icon}</ListItemIcon>
                            <ListItemText primary={nav.label} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                      <ListItem disablePadding>
                        <ListItemButton component={Link} to="/checkout">
                          <ListItemIcon>
                            <Badge badgeContent={carrinho.length} color="error" overlap="circular" invisible={carrinho.length === 0}>
                              <ShoppingCartIcon />
                            </Badge>
                          </ListItemIcon>
                          <ListItemText primary="Carrinho" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                          <ListItemText primary="Perfil" />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </Box>
                </Drawer>
              </Box>
            </Toolbar>
          </AppBar>
          {/* Conteúdo principal */}
          <Box sx={{ p: 2, flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cardapio" element={<Cardapio setCarrinho={setCarrinho} setLoading={setLoading} />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/privacidade" element={<Privacidade />} />
              <Route path="/checkout" element={<Checkout carrinho={carrinho} setCarrinho={setCarrinho} setLoading={setLoading} />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
