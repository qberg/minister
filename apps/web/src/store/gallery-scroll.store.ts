import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import type { GalleryImageItem } from "@/types";

type GalleryScrollState = {
  // Continuous float, e.g. 2.73 means "73% between image 2 and image 3"
  virtualIndex: number;
  // Integer snap of virtualIndex
  activeIndex: number;
  // speed at which virtualIndex is changing each frame
  velocity: number;
  items: GalleryImageItem[];
  isMobile: boolean;
};

type GalleryScrollActions = {
  setVirtualIndex: (index: number) => void;
  setActiveIndex: (index: number) => void;
  setVelocity: (velocity: number) => void;
  setItems: (items: GalleryImageItem[]) => void;
  setIsMobile: (isMobile: boolean) => void;
};

type GalleryScrollStore = GalleryScrollState & GalleryScrollActions;

const INITIAL_STATE: GalleryScrollState = {
  virtualIndex: 0,
  activeIndex: 0,
  velocity: 0,
  items: [],
  isMobile: false,
};

export const useGalleryScrollStore = create<GalleryScrollStore>()(
  subscribeWithSelector((set) => ({
    ...INITIAL_STATE,

    setVirtualIndex: (index) => set({ virtualIndex: index }),
    setActiveIndex: (index) => set({ activeIndex: index }),
    setVelocity: (velocity) => set({ velocity }),
    setItems: (items) => set({ items }),
    setIsMobile: (isMobile) => set({ isMobile }),
  }))
);

export const selectVirtualIndex = (s: GalleryScrollStore) => s.virtualIndex;
export const selectActiveIndex = (s: GalleryScrollState) => s.activeIndex;
export const selectVelocity = (s: GalleryScrollState) => s.velocity;
export const selectItems = (s: GalleryScrollStore) => s.items;
export const selectIsMobile = (s: GalleryScrollStore) => s.isMobile;
