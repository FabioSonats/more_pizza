import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const Privacidade: React.FC = () => (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4, p: 2, bgcolor: '#fff', borderRadius: 2, boxShadow: 2, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 2, color: 'primary.main', fontWeight: 700, textAlign: 'center' }}>
            Política de Privacidade
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" sx={{ mb: 2, fontSize: 16, textAlign: 'center' }}>
            Sua privacidade é importante para nós. Esta política explica como coletamos, usamos e protegemos suas informações ao utilizar nosso site e serviços.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, mb: 1, color: 'secondary.main', textAlign: 'center' }}>Coleta de Informações</Typography>
        <Typography variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
            Coletamos informações fornecidas por você, como nome, telefone e e-mail, apenas para fins de contato e atendimento. Não compartilhamos seus dados com terceiros.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, mb: 1, color: 'secondary.main', textAlign: 'center' }}>Cookies</Typography>
        <Typography variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
            Utilizamos cookies para melhorar sua experiência de navegação. Você pode desativar os cookies nas configurações do seu navegador.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, mb: 1, color: 'secondary.main', textAlign: 'center' }}>Contato</Typography>
        <Typography variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
            Em caso de dúvidas sobre nossa política de privacidade, entre em contato pelo e-mail: contato@minhapizzaria.com
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
            Última atualização: {new Date().toLocaleDateString()}
        </Typography>
    </Box>
);

export default Privacidade; 