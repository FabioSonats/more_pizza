import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

interface Bebida {
    nome: string;
    preco: number;
    imagem: string;
}

interface Props {
    bebidas: Bebida[];
    setCarrinho: React.Dispatch<React.SetStateAction<any[]>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Bebidas: React.FC<Props> = ({ bebidas, setCarrinho, setLoading }) => {
    const [open, setOpen] = useState(false);
    const [lastBebida, setLastBebida] = useState('');

    const handleAdd = (bebida: Bebida) => {
        setLoading(true);
        setCarrinho(prev => [...prev, { ...bebida, tipo: 'bebida' }]);
        setLastBebida(bebida.nome);
        setOpen(true);
        setTimeout(() => setLoading(false), 1000);
    };

    return (
        <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
                {bebidas.map((bebida) => (
                    <Box key={bebida.nome} sx={{ width: 240, mb: 2 }}>
                        <Card sx={{ boxShadow: 4, borderRadius: 3, p: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: '#fff', minHeight: 370 }}>
                            <CardMedia
                                component="img"
                                height="160"
                                image={bebida.imagem}
                                alt={bebida.nome}
                                sx={{ objectFit: 'cover', borderRadius: 2, mb: 1, width: '100%', minHeight: 160, background: '#eee' }}
                            />
                            <CardContent sx={{ textAlign: 'center', p: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{bebida.nome}</Typography>
                                <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 700, mb: 1 }}>
                                    R$ {bebida.preco.toFixed(2)}
                                </Typography>
                                <Button variant="contained" color="primary" sx={{ mt: 1, fontWeight: 600 }} onClick={() => handleAdd(bebida)}>
                                    Adicionar ao Carrinho
                                </Button>
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Box>
            <Snackbar
                open={open}
                autoHideDuration={1800}
                onClose={() => setOpen(false)}
                message={`"${lastBebida}" adicionada ao carrinho!`}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </>
    );
};

export default React.memo(Bebidas); 