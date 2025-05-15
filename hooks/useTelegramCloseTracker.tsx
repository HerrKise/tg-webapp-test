import { useEffect } from "react";

export function useTelegramCloseTracker() {
    useEffect(() => {
        const tg = window.Telegram?.WebApp;
        if (!tg) return;

        const sendClosed = () => {
            tg.sendData("closed");
        };

        tg.onEvent("deactivated", sendClosed);

        const handleViewport = () => {
            if ((tg.viewportHeight ?? 1000) < 100) {
                sendClosed();
            }
        };
        tg.onEvent("viewportChanged", handleViewport);

        return () => {
            tg.offEvent("deactivated", sendClosed);
            tg.offEvent("viewportChanged", handleViewport);
        };
    }, []);
}
