import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { api } from '../services/api';
import toast from "react-hot-toast";


type Cloth = {
    id: number;
    nome: string;
    colecao: number;
    quantidade: number;
    tamanho: number;
}

interface CartProviderProps {
    children: ReactNode;
}

interface UpdateProductAmount {
    clothId: number;
    amount: number;
}

interface CartContextData {
    cart: Cloth[];
    addCloth: (clothId: number) => Promise<void>;
    removeProduct: (clothId: number) => void;
    updateProductAmount: ({ clothId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
    const [cart, setCart] = useState<Cloth[]>([]);

    const addCloth = async (clothId: number) => {
        try {
            const updatedCart = [...cart];

            const clothExist = updatedCart.find(cloth => cloth.id === clothId);

            const stock = await api.get(`/stock/${clothId}`);
            const stockAmount = stock.data.quantidade;

            const currentAmountInCart = clothExist ? clothExist.quantidade : 0;
            const amount = currentAmountInCart + 1;

            if (stockAmount < amount) {
                toast.error('Quantidade solicitada fora de estoque');
                return;
            }
            if (clothExist) {
                clothExist.quantidade = amount;
            } else {
                const cloth = await api.get(`/roupas/${clothId}`);

                const newCloth = {
                    ...cloth.data,
                    quantidade: amount
                }

                updatedCart.push(newCloth);
            }

            setCart(updatedCart);

        } catch {
            toast.error('Erro na adição da roupa ao carrinho');
        }
    };

    const removeProduct = (productId: number) => {
        try {
            const updatedCart = [...cart];
            const productedIndex = updatedCart.findIndex(product => product.id === productId);

            if (productedIndex >= 0) {
                updatedCart.splice(productedIndex, 1);
                setCart(updatedCart);
            } else {
                throw Error();
            }
        } catch {
            toast.error('Erro na remoção do produto');
        }
    };

    const updateProductAmount = async ({
        clothId,
        amount,
    }: UpdateProductAmount) => {
        try {
            if (amount <= 0) {
                return;
            }

            const stock = await api.get(`/stock/${clothId}`);
            const stockAmount = stock.data.amount;

            if (stockAmount < amount) {
                toast.error('Quantidade solicitada fora de estoque');
                return;
            }

            const updatedCart = [...cart];
            const productExists = updatedCart.find(product => product.id === clothId);

            if (productExists) {
                productExists.quantidade = amount;
                setCart(updatedCart);

            } else {
                throw Error();
            }
        } catch {
            toast.error('Erro na alteração de quantidade do produto');
        }
    };

    return (
        <CartContext.Provider
            value={{ cart, addCloth, removeProduct, updateProductAmount }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart(): CartContextData {
    const context = useContext(CartContext);

    return context;
}
