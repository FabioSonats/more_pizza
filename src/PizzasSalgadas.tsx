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
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Checkbox from '@mui/material/Checkbox';

interface Pizza {
    nome: string;
    descricao: string;
    preco: string;
    imagem: string;
}

interface Props {
    pizzas: Pizza[];
    setCarrinho: React.Dispatch<React.SetStateAction<any[]>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const tamanhos = [
    { label: 'Broto', fator: 0.5 },
    { label: 'Pequena', fator: 0.7 },
    { label: 'Média', fator: 1 },
    { label: 'Grande', fator: 1.3 },
    { label: 'Big', fator: 1.6 },
];

const PizzasSalgadas: React.FC<Props> = ({ pizzas, setCarrinho, setLoading }) => {
    const [open, setOpen] = useState(false);
    const [lastSabor, setLastSabor] = useState('');
    const [tamanhosSelecionados, setTamanhosSelecionados] = useState<{ [nome: string]: string }>({});
    const [modalSabores, setModalSabores] = useState<{ open: boolean; pizza: Pizza | null }>({ open: false, pizza: null });
    const [saboresSelecionados, setSaboresSelecionados] = useState<string[]>([]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Define limites de sabores por tamanho
    const getLimiteSabores = (tamanho: string) => {
        if (tamanho === 'Grande' || tamanho === 'Big') return 4;
        if (tamanho === 'Média' || tamanho === 'Pequena') return 2;
        return 1;
    };

    const handleTamanho = (nome: string, tamanho: string) => {
        setTamanhosSelecionados(prev => ({ ...prev, [nome]: tamanho }));
    };

    const handleOpenSabores = (pizza: Pizza) => {
        setSaboresSelecionados([pizza.nome]); // Por padrão, seleciona o sabor do card
        setModalSabores({ open: true, pizza });
    };

    const handleToggleSabor = (nome: string, limite: number) => {
        setSaboresSelecionados(prev =>
            prev.includes(nome)
                ? prev.filter(n => n !== nome)
                : prev.length < limite
                    ? [...prev, nome]
                    : prev
        );
    };

    const handleAddMulti = () => {
        if (!modalSabores.pizza) return;
        setLoading(true);
        const tamanho = tamanhosSelecionados[modalSabores.pizza.nome] || 'Média';
        const limite = getLimiteSabores(tamanho);
        const sabores = pizzas.filter(p => saboresSelecionados.includes(p.nome));
        const precoBase = Math.max(...sabores.map(p => Number(p.preco.replace('R$', '').replace(',', '.').trim())));
        const fator = tamanhos.find(t => t.label === tamanho)?.fator || 1;
        const precoNum = Math.round(precoBase * fator * 100) / 100;
        setCarrinho(prev => [...prev, {
            nome: `Pizza ${tamanho} - ${sabores.length} Sabores: ${sabores.map(s => s.nome).join(' / ')}`,
            preco: precoNum,
            imagem: sabores[0].imagem,
            tipo: 'personalizada',
            sabores: sabores.map(s => s.nome),
            tamanho,
        }]);
        setLastSabor(sabores.map(s => s.nome).join(' / '));
        setOpen(true);
        setModalSabores({ open: false, pizza: null });
        setTimeout(() => setLoading(false), 1000);
    };

    return (
        <>
            {isMobile ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {pizzas.map((pizza) => {
                        const tamanho = tamanhosSelecionados[pizza.nome] || 'Média';
                        const limite = getLimiteSabores(tamanho);
                        return (
                            <Card key={pizza.nome} sx={{ display: 'flex', alignItems: 'center', p: 1, minHeight: 110, boxShadow: 2, borderRadius: 3 }}>
                                <CardMedia
                                    component="img"
                                    image={pizza.imagem}
                                    alt={pizza.nome}
                                    sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 2, mr: 2, bgcolor: '#eee' }}
                                />
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{pizza.nome}</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontSize: 13, whiteSpace: 'normal' }}>{pizza.descricao}</Typography>
                                    <FormControl component="fieldset" sx={{ mb: 0.5 }}>
                                        <FormLabel component="legend" sx={{ fontSize: 12, mb: 0.2 }}>Tamanho</FormLabel>
                                        <RadioGroup
                                            row
                                            value={tamanho}
                                            onChange={e => handleTamanho(pizza.nome, e.target.value)}
                                            sx={{ flexWrap: 'wrap', gap: 0.5 }}
                                        >
                                            {tamanhos.map((t) => (
                                                <FormControlLabel key={t.label} value={t.label} control={<Radio size="small" />} label={<span style={{ fontSize: 12 }}>{t.label}</span>} />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <Button variant="outlined" color="secondary" size="small" sx={{ mt: 1, fontWeight: 700 }} onClick={() => handleOpenSabores(pizza)}>
                                        Escolher {limite > 1 ? `${limite} Sabores` : 'Sabor'}
                                    </Button>
                                    <Typography variant="subtitle2" sx={{ color: 'secondary.main', fontWeight: 700, fontSize: 15, mt: 1 }}>
                                        R$ {(() => {
                                            const precoBase = Number(pizza.preco.replace('R$', '').replace(',', '.').trim());
                                            const fator = tamanhos.find(t => t.label === tamanho)?.fator || 1;
                                            return (Math.round(precoBase * fator * 100) / 100).toFixed(2);
                                        })()}
                                    </Typography>
                                </Box>
                            </Card>
                        );
                    })}
                </Box>
            ) : (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                    {pizzas.map((pizza) => {
                        const tamanho = tamanhosSelecionados[pizza.nome] || 'Média';
                        const limite = getLimiteSabores(tamanho);
                        return (
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
                                                value={tamanho}
                                                onChange={e => handleTamanho(pizza.nome, e.target.value)}
                                                sx={{ flexWrap: 'wrap', gap: 1 }}
                                            >
                                                {tamanhos.map((t) => (
                                                    <FormControlLabel key={t.label} value={t.label} control={<Radio size="small" />} label={t.label} />
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                        <Button variant="outlined" color="secondary" size="small" sx={{ mt: 1, fontWeight: 700 }} onClick={() => handleOpenSabores(pizza)}>
                                            Escolher {limite > 1 ? `${limite} Sabores` : 'Sabor'}
                                        </Button>
                                        <Typography variant="subtitle1" sx={{ mt: 1, color: 'secondary.main', fontWeight: 700 }}>
                                            R$ {(() => {
                                                const precoBase = Number(pizza.preco.replace('R$', '').replace(',', '.').trim());
                                                const fator = tamanhos.find(t => t.label === tamanho)?.fator || 1;
                                                return (Math.round(precoBase * fator * 100) / 100).toFixed(2);
                                            })()}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        );
                    })}
                </Box>
            )}
            {/* Modal de escolha de sabores */}
            <Dialog open={modalSabores.open} onClose={() => setModalSabores({ open: false, pizza: null })} maxWidth="xs" fullWidth>
                <DialogTitle>Escolher Sabores</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        Selecione até {modalSabores.pizza ? getLimiteSabores(tamanhosSelecionados[modalSabores.pizza.nome] || 'Média') : 2} sabores:
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                        {pizzas.map((p) => (
                            <FormControlLabel
                                key={p.nome}
                                control={
                                    <Checkbox
                                        checked={saboresSelecionados.includes(p.nome)}
                                        onChange={() => handleToggleSabor(p.nome, modalSabores.pizza ? getLimiteSabores(tamanhosSelecionados[modalSabores.pizza.nome] || 'Média') : 2)}
                                        disabled={saboresSelecionados.length >= (modalSabores.pizza ? getLimiteSabores(tamanhosSelecionados[modalSabores.pizza.nome] || 'Média') : 2) && !saboresSelecionados.includes(p.nome)}
                                    />
                                }
                                label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <img src={p.imagem} alt={p.nome} style={{ width: 32, height: 32, borderRadius: 6, objectFit: 'cover' }} />
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{p.nome}</Typography>
                                </Box>}
                            />
                        ))}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setModalSabores({ open: false, pizza: null })} color="inherit">Cancelar</Button>
                    <Button
                        onClick={handleAddMulti}
                        variant="contained"
                        color="primary"
                        disabled={saboresSelecionados.length < 1}
                    >
                        Adicionar ao Carrinho
                    </Button>
                </DialogActions>
            </Dialog>
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