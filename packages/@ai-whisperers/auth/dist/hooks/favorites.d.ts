import type { User } from "./types";
export declare function useAuthFavorites(): {
    favorites: string[];
    setFavorites: import("react").Dispatch<import("react").SetStateAction<string[]>>;
    initFavorites: (user: User | null) => void;
    toggleFavorite: (productName: string, user: User | null) => void;
    isFavorite: (productName: string) => boolean;
};
//# sourceMappingURL=favorites.d.ts.map