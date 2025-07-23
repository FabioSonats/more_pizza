import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { pizzasSalgadas, pizzasDoces, bebidas } from './pizzasData';
import PizzasSalgadas from './PizzasSalgadas';
import PizzasDoces from './PizzasDoces';
import Bebidas from './Bebidas';
import MontarPizzaModal from './MontarPizzaModal';
import { useState } from 'react';
import Button from '@mui/material/Button';

const heroImg = process.env.PUBLIC_URL + '/img/pizza-banner.jpg';

interface CardapioProps {
    setCarrinho: React.Dispatch<React.SetStateAction<any[]>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cardapio: React.FC<CardapioProps> = ({ setCarrinho, setLoading }) => {
    const [openMontar, setOpenMontar] = useState(false);
    return (
        <Box>
            {/* Hero Banner do Cardápio */}
            <Box sx={{
                width: '100%',
                minHeight: { xs: 180, md: 300 },
                maxHeight: 380,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                mb: 6,
            }}>
                <img
                    src={heroImg}
                    alt="Pizza Cardápio"
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
                    <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: 1, textShadow: '0 4px 24px #000a', mb: 1, fontSize: { xs: 24, md: 38 } }}>
                        NOSSO CARDÁPIO
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 500, textShadow: '0 2px 8px #0008', mb: 2, fontSize: { xs: 14, md: 20 } }}>
                        Pizzas salgadas, doces e bebidas para todos os gostos. Escolha a sua favorita!
                    </Typography>
                </Box>
            </Box>

            <Typography variant="h4" sx={{ mt: 2, mb: 2, color: 'primary.main', textAlign: 'center' }}>Pizzas Salgadas Mais Populares</Typography>
            {/* Removido botão e modal de montar pizza */}
            <PizzasSalgadas pizzas={pizzasSalgadas} setCarrinho={setCarrinho} setLoading={setLoading} />
            <Divider sx={{ my: 4 }} />
            <Typography variant="h4" sx={{ mt: 2, mb: 2, color: 'secondary.main', textAlign: 'center' }}>Pizzas Doces Populares</Typography>
            <PizzasDoces pizzas={pizzasDoces} setCarrinho={setCarrinho} setLoading={setLoading} />
            <Divider sx={{ my: 4 }} />
            <Typography variant="h4" sx={{ mt: 2, mb: 2, color: 'primary.main', textAlign: 'center' }}>Bebidas</Typography>
            <Bebidas bebidas={bebidas} setCarrinho={setCarrinho} setLoading={setLoading} />
        </Box>
    );
};

export default Cardapio; 