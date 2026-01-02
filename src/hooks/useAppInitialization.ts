import { useState, useEffect } from 'react';
import { initDatabase } from '../db/client';

export const useAppInitalization = () => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const prepare = async () => {
            try {
                await initDatabase();
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn("Błąd inicjalizacji: ",e);
            } finally {
                setIsReady(true);
            }
        };

        prepare();
    }, []);

    return { isReady };
};