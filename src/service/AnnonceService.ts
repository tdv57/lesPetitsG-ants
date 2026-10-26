import type { AnnonceSelect } from "../types/AnnonceType";

const D1_ANNONCE_URL = 'https://les-petits-geants-annonce-worker.ferdinand-axia.workers.dev';

export async function findAllAnnonce(): Promise<AnnonceSelect[]> {
    const headers = {
        'Content-Type': 'application/json'
    };
    const annonces = await fetch(`${D1_ANNONCE_URL}/annonces`, {
        headers,
        signal: AbortSignal.timeout(10_000),
    });
    if (!annonces.ok) {
        console.warn(`findAllAnnonce erreur avec le status ${annonces.status}`);
        return [];
    }
    return annonces.json();
}