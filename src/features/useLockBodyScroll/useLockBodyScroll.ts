import { useEffect } from 'react';

function useLockBodyScroll(isLocked: boolean) {
    useEffect(() => {
        if (isLocked) {
            const originalOverflow = window.getComputedStyle(document.body).overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [isLocked]);
}

export default useLockBodyScroll;
