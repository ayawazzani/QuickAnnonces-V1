import { useEffect, useMemo, useRef } from "react";
import "./CursorTrail.css";

export default function CursorTrail({
    count = 20,
    size = 26,
    color = "#ffffff",
    lerp = 0.3, // same as your JS
}) {
    const coords = useRef({ x: 0, y: 0 });
    const rafId = useRef(null);

    // Store circle DOM nodes + their last x/y like your original code
    const circles = useRef([]);

    // For rendering correct number of circles
    const items = useMemo(() => Array.from({ length: count }), [count]);

    useEffect(() => {
        // init positions + color
        circles.current.forEach((el) => {
            if (!el) return;
            el._x = 0;
            el._y = 0;
            el.style.backgroundColor = color;
        });

        const onMove = (e) => {
            coords.current.x = e.clientX;
            coords.current.y = e.clientY;
        };

        window.addEventListener("mousemove", onMove, { passive: true });

        const animate = () => {
            let x = coords.current.x;
            let y = coords.current.y;

            const els = circles.current;

            for (let i = 0; i < els.length; i++) {
                const circle = els[i];
                if (!circle) continue;

                circle.style.left = x - (size / 2 - 1) + "px";
                circle.style.top = y - (size / 2 - 1) + "px";

                circle.style.scale = String((els.length - i) / els.length);

                circle._x = x;
                circle._y = y;

                const next = els[i + 1] || els[0];
                const nx = next?._x ?? 0;
                const ny = next?._y ?? 0;

                x += (nx - x) * lerp;
                y += (ny - y) * lerp;
            }

            rafId.current = requestAnimationFrame(animate);
        };

        rafId.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", onMove);
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, [count, size, color, lerp]);

    return (
        <div className="cursor" aria-hidden="true">
            {items.map((_, i) => (
                <div
                    key={i}
                    className="circle"
                    ref={(el) => {
                        circles.current[i] = el;
                    }}
                    style={{ width: size, height: size }}
                />
            ))}
        </div>
    );
}
