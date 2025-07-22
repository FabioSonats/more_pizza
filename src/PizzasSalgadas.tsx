import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

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

const tamanhos = [
    { label: 'Broto', fator: 0.5 },
    { label: 'Pequena', fator: 0.7 },
    { label: 'Média', fator: 1 },
    { label: 'Grande', fator: 1.3 },
    { label: 'Big', fator: 1.6 },
];

const PizzasSalgadas: React.FC<Props> = ({ pizzas, setCarrinho }) => {
    const [open, setOpen] = useState(false);
    const [lastSabor, setLastSabor] = useState('');
    const [tamanhosSelecionados, setTamanhosSelecionados] = useState<{ [nome: string]: string }>({});

    const handleTamanho = (nome: string, tamanho: string) => {
        setTamanhosSelecionados(prev => ({ ...prev, [nome]: tamanho }));
    };

    const handleAdd = (pizza: Pizza) => {
        // Extrai o valor numérico do preço (ex: 'R$ 49,90' -> 49.90)
        const precoBase = Number(pizza.preco.replace('R$', '').replace(',', '.').trim());
        const tamanho = tamanhosSelecionados[pizza.nome] || 'Média';
        const fator = tamanhos.find(t => t.label === tamanho)?.fator || 1;
        const precoNum = Math.round(precoBase * fator * 100) / 100;
        setCarrinho(prev => [...prev, {
            nome: `Pizza ${tamanho} - ${pizza.nome}`,
            preco: precoNum,
            imagem: pizza.imagem,
            tipo: 'salgada',
            tamanho,
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
                                <FormControl component="fieldset" sx={{ mb: 1 }}>
                                    <FormLabel component="legend" sx={{ fontSize: 13, mb: 0.5 }}>Tamanho</FormLabel>
                                    <RadioGroup
                                        row
                                        value={tamanhosSelecionados[pizza.nome] || 'Média'}
                                        onChange={e => handleTamanho(pizza.nome, e.target.value)}
                                        sx={{ flexWrap: 'wrap', gap: 1 }}
                                    >
                                        {tamanhos.map((t) => (
                                            <FormControlLabel key={t.label} value={t.label} control={<Radio size="small" />} label={t.label} />
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                                <Typography variant="subtitle1" sx={{ mt: 1, color: 'secondary.main', fontWeight: 700 }}>
                                    R$ {(() => {
                                        const precoBase = Number(pizza.preco.replace('R$', '').replace(',', '.').trim());
                                        const tamanho = tamanhosSelecionados[pizza.nome] || 'Média';
                                        const fator = tamanhos.find(t => t.label === tamanho)?.fator || 1;
                                        return (Math.round(precoBase * fator * 100) / 100).toFixed(2);
                                    })()}
                                </Typography>
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