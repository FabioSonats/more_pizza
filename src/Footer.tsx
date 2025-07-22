import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Footer: React.FC = () => (
    <Box component="footer" sx={{ bgcolor: 'primary.main', color: '#fff', py: 3, mt: 6, textAlign: 'center' }}>
        <Typography variant="body1" sx={{ mb: 1, textAlign: 'center' }}>
            Contato: (41) 99999-8888 &nbsp;|&nbsp;
            <Link href="https://wa.me/5541999998888" target="_blank" rel="noopener" color="inherit" underline="always">WhatsApp</Link>
            &nbsp;|&nbsp;
            <Link href="mailto:contato@minhapizzaria.com" color="inherit" underline="always">contato@minhapizzaria.com</Link>
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
            <Link href="/privacidade" color="inherit" underline="always">Política de Privacidade</Link> &copy; {new Date().getFullYear()} Minha Pizzaria - Curitiba/PR
        </Typography>
    </Box>
);

export default Footer; 