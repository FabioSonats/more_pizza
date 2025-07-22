import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';

interface Pizza {
    nome: string;
    descricao: string;
    preco: string;
    imagem: string;
}

interface Props {
    open: boolean;
    onClose: () => void;
    pizzas: Pizza[];
    setCarrinho: React.Dispatch<React.SetStateAction<any[]>>;
}

const MontarPizzaModal: React.FC<Props> = ({ open, onClose, pizzas, setCarrinho }) => {
    const [selecionados, setSelecionados] = useState<string[]>([]);
    const [snack, setSnack] = useState(false);

    const handleToggle = (nome: string) => {
        setSelecionados((prev) =>
            prev.includes(nome)
                ? prev.filter((n) => n !== nome)
                : prev.length < 3
                    ? [...prev, nome]
                    : prev
        );
    };

    const handleAdd = () => {
        // Busca os objetos das pizzas selecionadas
        const sabores = pizzas.filter((p) => selecionados.includes(p.nome));
        if (sabores.length < 2) return;
        // Preço: maior entre os selecionados
        const precoNum = Math.max(...sabores.map((p) => Number(p.preco.replace('R$', '').replace(',', '.').trim())));
        setCarrinho((prev) => [
            ...prev,
            {
                nome: `Pizza ${sabores.length} Sabores: ${sabores.map((s) => s.nome).join(' / ')}`,
                preco: precoNum,
                imagem: sabores[0].imagem, // Usa imagem do primeiro sabor
                tipo: 'personalizada',
                sabores: sabores.map((s) => s.nome),
            },
        ]);
        setSnack(true);
        setSelecionados([]);
        onClose();
    };

    const handleClose = () => {
        setSelecionados([]);
        onClose();
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
                <DialogTitle>Montar Pizza (2 ou 3 sabores)</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Selecione 2 ou 3 sabores para sua pizza personalizada:
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {pizzas.map((pizza) => (
                            <FormControlLabel
                                key={pizza.nome}
                                control={
                                    <Checkbox
                                        checked={selecionados.includes(pizza.nome)}
                                        onChange={() => handleToggle(pizza.nome)}
                                        disabled={
                                            selecionados.length >= 3 && !selecionados.includes(pizza.nome)
                                        }
                                    />
                                }
                                label={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <img src={pizza.imagem} alt={pizza.nome} style={{ width: 32, height: 32, borderRadius: 6, objectFit: 'cover' }} />
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{pizza.nome}</Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary', ml: 1 }}>{pizza.preco}</Typography>
                                    </Box>
                                }
                            />
                        ))}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit">Cancelar</Button>
                    <Button
                        onClick={handleAdd}
                        variant="contained"
                        color="primary"
                        disabled={selecionados.length < 2}
                    >
                        Adicionar ao Carrinho
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snack}
                autoHideDuration={1800}
                onClose={() => setSnack(false)}
                message={`Pizza personalizada adicionada ao carrinho!`}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </>
    );
};

export default MontarPizzaModal; 