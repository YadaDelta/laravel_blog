import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

createInertiaApp({
    resolve: (name: string): any => {
        const pages: Record<string, any> = import.meta.glob(
            "./Pages/**/*.tsx",
            { eager: true }
        );
        return pages[`./Pages/${name}.tsx`];
    },
    setup({ el, App, props }: { el: HTMLElement; App: React.FC; props: any }) {
        createRoot(el).render(<App {...props} />);
    },
});
