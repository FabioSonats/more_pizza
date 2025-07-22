import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

interface Pizza {
    nome: string;
    descricao: string;
    preco: string;
    imagem: string;
}

interface Props {
    pizzas: Pizza[];
    setCarrinho: React.Dispatch<React.SetStateAction<any[]>>;
}

const PizzasSalgadas: React.FC<Props> = ({ pizzas, setCarrinho }) => {
    const [open, setOpen] = useState(false);
    const [lastSabor, setLastSabor] = useState('');

    const handleAdd = (pizza: Pizza) => {
        // Extrai o valor numérico do preço (ex: 'R$ 49,90' -> 49.90)
        const precoNum = Number(pizza.preco.replace('R$', '').replace(',', '.').trim());
        setCarrinho(prev => [...prev, {
            nome: pizza.nome,
            preco: precoNum,
            imagem: pizza.imagem,
            tipo: 'salgada',
        }]);
        setLastSabor(pizza.nome);
        setOpen(true);
    };

    return (
        <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                {pizzas.map((pizza) => (
                    <Box key={pizza.nome} sx={{ width: 300, mb: 2 }}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="160"
                                image={pizza.imagem}
                                alt={pizza.nome}
                            />
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" gutterBottom>{pizza.nome}</Typography>
                                <Typography variant="body2" color="text.secondary">{pizza.descricao}</Typography>
                                <Typography variant="subtitle1" sx={{ mt: 1, color: 'secondary.main' }}>{pizza.preco}</Typography>
                                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => handleAdd(pizza)}>
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
                message={`"${lastSabor}" adicionado ao carrinho!`}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </>
    );
};

export default React.memo(PizzasSalgadas); 