export {};

declare global {
    interface TelegramWebApp {
        initData: string;
        initDataUnsafe: unknown;
        sendData: (data: string) => void;
        close: () => void;
        ready: () => void;
        expand: () => void;
        onEvent: (event: string, fn: () => void) => void;
        offEvent: (event: string, fn: () => void) => void;
        viewportHeight?: number;
        colorScheme?: "light" | "dark";
    }

    interface Window {
        Telegram?: {
            WebApp: TelegramWebApp;
        };
    }
}
