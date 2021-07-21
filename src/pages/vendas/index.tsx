import Head from "next/head";
import React from "react";

import { useState, FormEvent, useEffect, FunctionComponent } from "react";
import { Toaster } from "react-hot-toast";
import { SelectionMenu } from '../../components/Sales/SelectionMenu/selectionMenu'

import styles from "./styles.module.scss";

import { useSale } from "../../hooks/useSale";




export default function Vendas() {
    const { createSale } = useSale();

    async function handleCreateNewSale(event: FormEvent) {
        event.preventDefault();

        /* await createSale({
            colecao: selectedClothingCollection.id,
            roupa: selectedCloth.id
        }); */

    }

    return (
        <>
            <Head>
                <title>Vendas | Artha</title>
            </Head>
            <Toaster />

            <main>
                <SelectionMenu />

            </main>
        </>
    );
}