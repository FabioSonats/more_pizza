import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const bannerImg = process.env.PUBLIC_URL + '/img/pizza-banner.jpg';

const Sobre: React.FC = () => (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 6, p: 0, bgcolor: 'background.default', borderRadius: 3, boxShadow: 4, textAlign: 'center' }}>
        {/* Banner visual */}
        <Box sx={{ width: '100%', height: { xs: 180, md: 280 }, position: 'relative', overflow: 'hidden', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
            <img src={bannerImg} alt="Equipe Pizza Mais" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }} />
            <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', bgcolor: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h3" sx={{ color: '#fff', fontWeight: 900, letterSpacing: 1, textShadow: '0 2px 8px #000a', fontSize: { xs: 28, md: 44 } }}>
                    Sobre Nós
                </Typography>
            </Box>
        </Box>
        <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#fff', borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
            <Typography variant="h5" sx={{ mb: 2, color: 'secondary.main', fontWeight: 700 }}>
                Tradição, Sabor e Paixão por Pizza
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, fontSize: 18, textAlign: 'center' }}>
                Fundada em 2002 no coração de Curitiba, a Pizza Mais nasceu do sonho de unir a tradição italiana com o sabor brasileiro. Nossa história começou em uma pequena cozinha de bairro, onde receitas de família e ingredientes frescos conquistaram os primeiros clientes. Com o tempo, crescemos, mas mantivemos o mesmo compromisso: entregar uma experiência única a cada fatia.
            </Typography>
            <Divider sx={{ my: 3 }} />
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, justifyContent: 'center', alignItems: 'flex-start', mb: 3 }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ mb: 1, color: 'primary.main', fontWeight: 700 }}>
                        Missão
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Proporcionar momentos de felicidade e união através de pizzas artesanais, feitas com ingredientes selecionados e muito carinho.
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 1, color: 'primary.main', fontWeight: 700 }}>
                        Nossos Valores
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Qualidade, respeito ao cliente, inovação, honestidade e paixão pela gastronomia.
                    </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ mb: 1, color: 'primary.main', fontWeight: 700 }}>
                        Ingredientes e Equipe
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Utilizamos apenas ingredientes frescos, massas de longa fermentação e molhos preparados diariamente. Nossa equipe é formada por pizzaiolos experientes e apaixonados pelo que fazem.
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 1, color: 'primary.main', fontWeight: 700 }}>
                        Nosso Diferencial
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Atendimento acolhedor, ambiente familiar e um cardápio que une clássicos italianos e sabores brasileiros. Aqui, cada cliente é parte da nossa história!
                    </Typography>
                </Box>
            </Box>
        </Box>
    </Box>
);

export default Sobre; 