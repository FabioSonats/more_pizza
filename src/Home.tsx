import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import Fade from '@mui/material/Fade';

const heroImg = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80';

const depoimentos = [
    {
        nome: 'Carlos S.',
        texto: 'A melhor pizza de Curitiba! Ambiente acolhedor e atendimento impecável. Recomendo a todos!',
    },
    {
        nome: 'Juliana M.',
        texto: 'Sou fã da pizza de quatro queijos! Sempre peço para minha família. Parabéns pelo sabor e qualidade!',
    },
    {
        nome: 'Roberto F.',
        texto: 'A pizza doce de brigadeiro é sensacional! Lugar perfeito para comemorar com amigos.',
    },
];

const Home: React.FC = () => (
    <Box sx={{ width: '100%', bgcolor: 'background.default', pb: 8 }}>
        {/* Hero Banner */}
        <Box sx={{
            width: '100%',
            minHeight: { xs: 220, md: 340 },
            maxHeight: 420,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            mb: 6,
        }}>
            <img
                src={heroImg}
                alt="Pizza destaque"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.75)',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1,
                }}
            />
            <Box sx={{
                position: 'relative',
                zIndex: 2,
                textAlign: 'center',
                width: '100%',
                color: '#fff',
                px: 2,
            }}>
                <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: 1, textShadow: '0 4px 24px #000a', mb: 1, fontSize: { xs: 28, md: 44 } }}>
                    TRADIÇÃO E SABOR EM UMA EXPERIÊNCIA ÚNICA
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 500, textShadow: '0 2px 8px #0008', mb: 2, fontSize: { xs: 16, md: 22 } }}>
                    Ingredientes frescos e receitas que dão água na boca há mais de 20 anos.
                </Typography>
            </Box>
        </Box>

        {/* Hero Section (boas-vindas) */}
        <Fade in timeout={900}>
            <Box sx={{ maxWidth: 900, mx: 'auto', mt: 2, p: 4, bgcolor: '#fff', borderRadius: 3, boxShadow: 4, textAlign: 'center', mb: 8 }}>
                <Typography variant="h4" sx={{ mb: 2, color: 'primary.main', fontWeight: 800, letterSpacing: 2 }}>
                    Bem-vindo à Minha Pizzaria!
                </Typography>
                <Typography variant="h5" sx={{ mb: 3, color: 'secondary.main', fontWeight: 500 }}>
                    Tradição, sabor e alegria em Curitiba desde 2002 🍕
                </Typography>
                <Button variant="contained" color="secondary" size="large" component={RouterLink} to="/cardapio" sx={{ mt: 2, fontWeight: 700, px: 4, py: 1.5, fontSize: 20, borderRadius: 2, boxShadow: 2, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.07)' } }}>
                    Ver Cardápio
                </Button>
            </Box>
        </Fade>

        {/* História */}
        <Fade in timeout={1200}>
            <Box sx={{ maxWidth: 800, mx: 'auto', mb: 8, p: 3, bgcolor: '#fff', borderRadius: 2, boxShadow: 2, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ mb: 2, color: 'primary.main', fontWeight: 700 }}>
                    Nossa História
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, fontSize: 18 }}>
                    Fundada no coração de Curitiba, a <b>Minha Pizzaria</b> nasceu do sonho de uma família apaixonada por pizza e pela cultura italiana. Unimos ingredientes frescos, receitas autênticas e um ambiente acolhedor para criar momentos inesquecíveis.
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, fontSize: 18 }}>
                    Ao longo dos anos, nos tornamos referência na cidade por nossas pizzas artesanais, assadas em forno de pedra, e pelo atendimento caloroso. Nossa missão é proporcionar alegria a cada fatia!
                </Typography>
            </Box>
        </Fade>

        {/* Diferenciais */}
        <Fade in timeout={1500}>
            <Box sx={{ maxWidth: 900, mx: 'auto', mb: 8, p: 3, bgcolor: '#f8f8f8', borderRadius: 2, boxShadow: 1, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ mb: 3, color: 'secondary.main', fontWeight: 700 }}>
                    Por que escolher a Minha Pizzaria?
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4 }}>
                    <Box sx={{ minWidth: 220, maxWidth: 260, p: 2, bgcolor: '#fff', borderRadius: 2, boxShadow: 2, mb: 2, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}>
                        <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700 }}>🍕 Massa Artesanal</Typography>
                        <Typography variant="body2">Receita exclusiva, leve e crocante, feita todos os dias.</Typography>
                    </Box>
                    <Box sx={{ minWidth: 220, maxWidth: 260, p: 2, bgcolor: '#fff', borderRadius: 2, boxShadow: 2, mb: 2, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}>
                        <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700 }}>🧀 Queijos selecionados</Typography>
                        <Typography variant="body2">Só usamos ingredientes de alta qualidade e fornecedores locais.</Typography>
                    </Box>
                    <Box sx={{ minWidth: 220, maxWidth: 260, p: 2, bgcolor: '#fff', borderRadius: 2, boxShadow: 2, mb: 2, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}>
                        <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700 }}>🏆 Tradição e carinho</Typography>
                        <Typography variant="body2">Mais de 20 anos servindo famílias curitibanas com amor.</Typography>
                    </Box>
                </Box>
            </Box>
        </Fade>

        {/* Depoimentos */}
        <Fade in timeout={1800}>
            <Box sx={{ maxWidth: 900, mx: 'auto', mb: 8, p: 3, bgcolor: '#fff', borderRadius: 2, boxShadow: 2, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
                    O que dizem nossos clientes
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4 }}>
                    {depoimentos.map((dep, idx) => (
                        <Box key={idx} sx={{ minWidth: 250, maxWidth: 320, p: 2, bgcolor: '#f8f8f8', borderRadius: 2, boxShadow: 1, mb: 2, fontStyle: 'italic', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 4 } }}>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                “{dep.texto}”
                            </Typography>
                            <Typography variant="subtitle2" sx={{ color: 'secondary.main', fontWeight: 600 }}>
                                — {dep.nome}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Fade>

        {/* Chamada para ação final */}
        <Fade in timeout={2000}>
            <Box sx={{ maxWidth: 700, mx: 'auto', mb: 4, p: 4, bgcolor: '#fff', borderRadius: 3, boxShadow: 3, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ mb: 2, color: 'primary.main', fontWeight: 700 }}>
                    Pronto para saborear?
                </Typography>
                <Button variant="contained" color="secondary" size="large" component={RouterLink} to="/cardapio" sx={{ mt: 2, fontWeight: 700, px: 4, py: 1.5, fontSize: 20, borderRadius: 2, boxShadow: 2, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.07)' } }}>
                    Ver Cardápio Completo
                </Button>
            </Box>
        </Fade>
    </Box>
);

export default Home; 