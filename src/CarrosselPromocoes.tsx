import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

const promocoes = [
    {
        titulo: 'Combo Família',
        descricao: '2 pizzas grandes + 1 refrigerante 2L por R$ 99,90',
        destaque: 'Perfeito para compartilhar!',
        imagem: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    },
    {
        titulo: 'Noite do Casal',
        descricao: '1 pizza média + 2 taças de vinho por R$ 69,90',
        destaque: 'Uma noite especial a dois.',
        imagem: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    },
    {
        titulo: 'Promoção Brigadeiro',
        descricao: 'Na compra de qualquer pizza grande, pizza doce de brigadeiro por R$ 19,90',
        destaque: 'Promoção imperdível!',
        imagem: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80',
    },
    {
        titulo: 'Pizza + Sobremesa',
        descricao: 'Pizza grande + sobremesa do dia por R$ 79,90',
        destaque: 'Para adoçar sua noite!',
        imagem: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80',
    },
    {
        titulo: 'Rodízio de Pizzas',
        descricao: 'Rodízio à vontade por R$ 49,90 por pessoa',
        destaque: 'Venha com a galera!',
        imagem: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=600&q=80',
    },
    {
        titulo: 'Almoço Executivo',
        descricao: 'Pizza individual + bebida por R$ 29,90',
        destaque: 'De segunda a sexta, das 11h às 15h',
        imagem: 'https://images.unsplash.com/photo-1548365328-8b849e6c7b77?auto=format&fit=crop&w=600&q=80',
    },
];

const CarrosselPromocoes: React.FC = () => {
    return (
        <Box sx={{ maxWidth: 1400, mx: 'auto', mt: 7, mb: 6, px: 2, position: 'relative' }}>
            <Swiper
                modules={[Navigation, EffectCoverflow, Autoplay]}
                navigation
                effect="coverflow"
                coverflowEffect={{ rotate: 0, stretch: 60, depth: 120, modifier: 2, slideShadows: false }}
                slidesPerView={1}
                breakpoints={{
                    600: { slidesPerView: 2, spaceBetween: 24 },
                    900: { slidesPerView: 3, spaceBetween: 32 },
                    1200: { slidesPerView: 4, spaceBetween: 40 },
                }}
                centeredSlides
                loop
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                style={{ paddingBottom: 40, overflow: 'visible' }}
                className="carrossel-promocoes-swiper"
            >
                {promocoes.map((promo) => (
                    <SwiperSlide key={promo.titulo} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Card sx={{
                            width: { xs: 240, sm: 280, md: 320 },
                            minHeight: 180,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            boxShadow: 4,
                            borderRadius: 3,
                            background: '#fff',
                            overflow: 'hidden',
                            mx: 'auto',
                            position: 'relative',
                        }}>
                            <Box sx={{ position: 'relative', width: 120, height: 180, flexShrink: 0 }}>
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={promo.imagem}
                                    alt={promo.titulo}
                                    sx={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                />
                                {/* Overlay gradiente para contraste */}
                                <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(90deg,rgba(0,0,0,0.18) 0%,rgba(0,0,0,0.04) 100%)', pointerEvents: 'none' }} />
                            </Box>
                            <CardContent sx={{ textAlign: 'left', flex: 1, p: 2 }}>
                                <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 800, mb: 1, fontSize: { xs: 18, md: 20 } }}>{promo.titulo}</Typography>
                                <Typography variant="body2" sx={{ mb: 1, color: '#333', fontWeight: 500 }}>{promo.descricao}</Typography>
                                <Typography variant="subtitle2" sx={{ color: 'secondary.main', fontWeight: 700, fontSize: 15 }}>{promo.destaque}</Typography>
                            </CardContent>
                        </Card>
                    </SwiperSlide>
                ))}
                {/* Custom Swiper navigation buttons */}
                <Box className="swiper-button-prev" sx={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    zIndex: 10,
                    width: 44,
                    height: 44,
                    bgcolor: 'primary.main',
                    color: '#fff',
                    borderRadius: '50%',
                    boxShadow: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transform: 'translateY(-50%)',
                    transition: 'background 0.2s, box-shadow 0.2s',
                    '&:hover': { bgcolor: 'secondary.main', boxShadow: 6 },
                }}>
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                </Box>
                <Box className="swiper-button-next" sx={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    zIndex: 10,
                    width: 44,
                    height: 44,
                    bgcolor: 'primary.main',
                    color: '#fff',
                    borderRadius: '50%',
                    boxShadow: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transform: 'translateY(-50%)',
                    transition: 'background 0.2s, box-shadow 0.2s',
                    '&:hover': { bgcolor: 'secondary.main', boxShadow: 6 },
                }}>
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </Box>
            </Swiper>
        </Box>
    );
};

export default CarrosselPromocoes; 