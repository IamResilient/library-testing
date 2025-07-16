import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function ZoomHandler() {
    const { camera, gl } = useThree();

    useEffect(() => {
        if (!(camera instanceof THREE.OrthographicCamera)) return;

        const canvas = gl.domElement;
        let isDragging = false;
        let lastX = 0;
        let lastY = 0;

        // ⬇️ Зум к курсору
        const onWheel = (e: WheelEvent) => {
            e.preventDefault();

            const scaleFactor = e.deltaY < 0 ? 1.1 : 0.9;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ndcX = (x / canvas.clientWidth) * 2 - 1;
            const ndcY = -(y / canvas.clientHeight) * 2 + 1;

            const mouse = new THREE.Vector3(ndcX, ndcY, 0);
            mouse.unproject(camera);

            const worldX = mouse.x;
            const worldY = mouse.y;

            // Масштабируем
            camera.zoom *= scaleFactor;
            camera.updateProjectionMatrix();

            // Сдвигаем камеру так, чтобы точка под курсором оставалась под курсором
            const newMouse = new THREE.Vector3(ndcX, ndcY, 0).unproject(camera);

            const dx = newMouse.x - worldX;
            const dy = newMouse.y - worldY;

            camera.position.x -= dx;
            camera.position.y -= dy;
        };

        // ⬇️ Панорамирование
        const onMouseDown = (e: MouseEvent) => {
            isDragging = true;
            lastX = e.clientX;
            lastY = e.clientY;
            canvas.style.cursor = 'grabbing';
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;
            lastX = e.clientX;
            lastY = e.clientY;

            const scale = 1 / camera.zoom;
            camera.position.x -= dx * scale;
            camera.position.y += dy * scale;
        };

        const onMouseUp = () => {
            isDragging = false;
            canvas.style.cursor = 'grab';
        };

        // Подписки
        canvas.addEventListener('wheel', onWheel, { passive: false });
        canvas.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        canvas.style.cursor = 'grab';

        return () => {
            canvas.removeEventListener('wheel', onWheel);
            canvas.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [camera, gl]);

    return null;
}
