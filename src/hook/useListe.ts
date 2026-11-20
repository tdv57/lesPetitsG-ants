import { useState } from "react";
import { ListeClient, listeClientInstance } from "../client/ListeClient";
import { login, logout } from "../service/ListeService";

export function useListe() {
    const [client, setClient] = useState<ListeClient | null>(listeClientInstance);
    
    async function handleLogin(loginData : {phone: string}) {
        await login(loginData.phone);
        setClient(listeClientInstance);
    }

    async function handleLogout() {
        await logout();
        setClient(listeClientInstance);
    }

    return { client, handleLogout, handleLogin };
}