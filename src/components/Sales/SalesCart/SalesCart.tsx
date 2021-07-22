import { useEffect, useState } from "react";
import { useCart } from "../../../hooks/useCart";

export function SalesCart() {
    const { cart } = useCart();

    return (
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Tamanho</th>
                    <th>Coleção</th>
                    <th>Quantidade</th>
                </tr>
            </thead>
            <tbody>
                {cart.map(cloth => (
                    <tr key={cloth.id}>
                        <td>{cloth.nome}</td>
                        <td>{cloth.tamanho}</td>
                        <td>{cloth.colecao}</td>
                        <td>{cloth.quantidade}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}