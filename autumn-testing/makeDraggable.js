// form.js
export function makeDraggable(element, header) {
    let offsetX = 0, offsetY = 0, startX = 0, startY = 0;

    const startDrag = (e) => {
        e.preventDefault();
        startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        startY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
        document.addEventListener(e.type.includes('mouse') ? 'mousemove' : 'touchmove', drag);
        document.addEventListener(e.type.includes('mouse') ? 'mouseup' : 'touchend', stopDrag);
    };

    const drag = (e) => {
        let clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        let clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;

        offsetX = clientX - startX;
        offsetY = clientY - startY;

        startX = clientX;
        startY = clientY;

        element.style.top = `${element.offsetTop + offsetY}px`;
        element.style.left = `${element.offsetLeft + offsetX}px`;
    };

    const stopDrag = (e) => {
        document.removeEventListener(e.type.includes('mouse') ? 'mousemove' : 'touchmove', drag);
        document.removeEventListener(e.type.includes('mouse') ? 'mouseup' : 'touchend', stopDrag);
    };

    header.addEventListener('mousedown', startDrag);
    header.addEventListener('touchstart', startDrag, { passive: false });
}
