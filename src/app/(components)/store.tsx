import { create } from "zustand";

interface State {
    text: string
    setText: (newText: string) => void;
}

const useStore = create<State>((set) => ({
    text: "",
    setText: (newText: string) => set({ text: newText }),
}));

export default useStore;