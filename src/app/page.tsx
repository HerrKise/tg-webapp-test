"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { useTelegramCloseTracker } from "../../hooks/useTelegramCloseTracker";

export default function Home() {
    const [tg, setTg] = useState<TelegramWebApp | null>();
    const [name, setName] = useState("Deploy now");
    useEffect(() => {
        if (window == undefined) return;
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-web-app.js";
        script.async = true;
        script.onload = () => {
            //@ts-expect-error tg err
            const tg = window.Telegram.WebApp;
            tg.ready();
            tg.expand();
            setTg(tg);
            //@ts-expect-error user err
            setName(tg.initDataUnsafe?.user?.first_name);
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
        };
        document.body.appendChild(script);

        return () => {
            if (tg) {
                tg.offEvent("deactivated", tg.sendData("closed"));
                tg.offEvent("viewportChanged", tg.sendData("closed"));
            }
        };
    }, []);

    useTelegramCloseTracker();
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <Image
                    className={styles.logo}
                    src="/next.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                />
                <ol>
                    <li>
                        Get started by editing <code>src/app/page.tsx</code>.
                    </li>
                    <li>Save and see your changes instantly.</li>
                </ol>

                <div className={styles.ctas}>
                    <button className={styles.primary}>
                        <Image
                            className={styles.logo}
                            src="/vercel.svg"
                            alt="Vercel logomark"
                            width={20}
                            height={20}
                        />
                        {name}
                    </button>
                    <a
                        href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.secondary}
                    >
                        Read our docs
                    </a>
                </div>
            </main>
            <footer className={styles.footer}>
                <a
                    href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/file.svg"
                        alt="File icon"
                        width={16}
                        height={16}
                    />
                    Learn
                </a>
                <a
                    href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/window.svg"
                        alt="Window icon"
                        width={16}
                        height={16}
                    />
                    Examples
                </a>
                <a
                    href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/globe.svg"
                        alt="Globe icon"
                        width={16}
                        height={16}
                    />
                    Go to nextjs.org →
                </a>
            </footer>
        </div>
    );
}
