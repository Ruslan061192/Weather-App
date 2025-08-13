import { useEffect } from "react";

export  const useClickOutside = (ref: React.RefObject<HTMLElement>, cb: () => void) => {
     useEffect(() => {
            const handleClickOutside = (e: MouseEvent | TouchEvent) => {
                if (
                    ref.current &&
                    e.target instanceof Node &&
                    !ref.current.contains(e.target)
                ) {
                    cb();
                }
            };
    
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("touchstart", handleClickOutside);
    
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
                document.removeEventListener("touchstart", handleClickOutside);
            };
        },[ref, cb]);
}