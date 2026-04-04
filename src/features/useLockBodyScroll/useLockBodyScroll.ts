
function useLockBodyScroll() {
    // useEffect(() => {
    //     if (isLocked) {
    //         // const originalOverflow = window.getComputedStyle(document.body).overflow;
    //         // document.body.style.overflow = 'hidden';
    //         const listener = (e: Event) => {
    //             console.log('Scrolling is locked');
    //             e.preventDefault();
    //         };
    //         document.body.addEventListener('scroll', listener);
    //         // return () => {
    //         //     // document.body.style.overflow = originalOverflow;
    //         //     document.body.removeEventListener("scroll", listener);
    //         // };
    //     }
    // }, [isLocked]);
}

export default useLockBodyScroll;
