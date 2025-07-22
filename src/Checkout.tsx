import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Divider } from '@mui/material';

export interface ItemCarrinho {
    nome: string;
    preco: number;
    imagem?: string;
    tipo?: string;
}

interface CheckoutProps {
    carrinho: ItemCarrinho[];
    setCarrinho: React.Dispatch<React.SetStateAction<ItemCarrinho[]>>;
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

const whatsappNumber = '5542991643802';

function agruparItens(itens: ItemCarrinho[]) {
    const map = new Map<string, { item: ItemCarrinho; quantidade: number }>();
    for (const item of itens) {
        if (map.has(item.nome)) {
            map.get(item.nome)!.quantidade++;
        } else {
            map.set(item.nome, { item, quantidade: 1 });
        }
    }
    return Array.from(map.values());
}

const Checkout: React.FC<CheckoutProps> = ({ carrinho, setCarrinho, setLoading }) => {
    const [nome, setNome] = useState('');
    const agrupados = agruparItens(carrinho);
    const total = agrupados.reduce((acc, { item, quantidade }) => acc + (item.preco * quantidade), 0);
    const textoPedido = `Olá! Meu nome é ${nome}. Gostaria de pedir:\n${agrupados.map(({ item, quantidade }) => `🍕 ${item.nome} x${quantidade}`).join('\n')}\nTotal: R$ ${total.toFixed(2)}`;
    const linkWhats = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(textoPedido)}`;

    const removerItem = (nome: string) => {
        // Remove apenas uma ocorrência do item
        const idx = carrinho.findIndex(i => i.nome === nome);
        if (idx !== -1) {
            setCarrinho(prev => prev.filter((_, i) => i !== idx));
        }
    };

    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 6, p: 3, bgcolor: '#fff', borderRadius: 3, boxShadow: 4, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ mb: 2, color: 'primary.main', fontWeight: 800 }}>
                Finalizar Pedido
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                Confira os itens escolhidos e preencha seu nome para enviar o pedido pelo WhatsApp:
            </Typography>
            <Box sx={{ mb: 2 }}>
                {agrupados.length === 0 ? (
                    <Typography variant="subtitle1" color="text.secondary">Seu carrinho está vazio.</Typography>
                ) : (
                    <Box sx={{ bgcolor: '#f8f8f8', borderRadius: 2, p: 2, mb: 2 }}>
                        {agrupados.map(({ item, quantidade }, idx) => (
                            <Box key={item.nome} sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                                {item.imagem && (
                                    <img src={item.imagem} alt={item.nome} style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover', marginRight: 8 }} />
                                )}
                                <Box sx={{ flex: 1, textAlign: 'left' }}>
                                    <Typography variant="body1" sx={{ fontWeight: 700 }}>{item.nome}</Typography>
                                    <Typography variant="body2" color="text.secondary">R$ {item.preco.toFixed(2)} x {quantidade}</Typography>
                                </Box>
                                <Typography variant="body1" sx={{ fontWeight: 700, minWidth: 60, textAlign: 'right' }}>
                                    R$ {(item.preco * quantidade).toFixed(2)}
                                </Typography>
                                <IconButton color="error" onClick={() => removerItem(item.nome)} size="small">
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        ))}
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main' }}>Subtotal:</Typography>
                            <Typography variant="h5" sx={{ fontWeight: 900, color: 'secondary.main' }}>R$ {total.toFixed(2)}</Typography>
                        </Box>
                    </Box>
                )}
            </Box>
            <TextField
                label="Seu nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
            />
            <Button
                variant="contained"
                color="success"
                size="large"
                href={linkWhats}
                target="_blank"
                disabled={agrupados.length === 0 || !nome}
                sx={{ fontWeight: 700, fontSize: 18, px: 4, py: 1.5, borderRadius: 2, boxShadow: 2, mb: 2 }}
            >
                Enviar Pedido pelo WhatsApp
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                onClick={() => setCarrinho([])}
                sx={{ ml: 2, fontWeight: 500 }}
                disabled={agrupados.length === 0}
            >
                Limpar Carrinho
            </Button>
        </Box>
    );
};

export default Checkout; 