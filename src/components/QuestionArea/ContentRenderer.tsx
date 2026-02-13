

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github-dark.css';
import renderMathInElement from 'katex/dist/contrib/auto-render';

interface ContentRendererProps {
    content: string;
    compact?: boolean;
}

const ContentRenderer = React.memo(function ContentRenderer({ content, compact = false }: ContentRendererProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Resolve internal image paths for GitHub Pages subpath
    const resolvedContent = content.replace(/src="\/images\//g, `src="${import.meta.env.BASE_URL}images/`);

    useEffect(() => {
        if (containerRef.current) {
            // Render Math auto
            renderMathInElement(containerRef.current, {
                delimiters: [
                    { left: '$$', right: '$$', display: true },
                    { left: '$', right: '$', display: false },
                    { left: '\\(', right: '\\)', display: false },
                    { left: '\\[', right: '\\]', display: true },
                ],
                throwOnError: false,
            });
        }
    }, [resolvedContent]);

    return (
        <motion.div
            ref={containerRef}
            className={`space-y-4 prose prose-invert max-w-none ${compact ? 'prose-sm text-xl' : 'text-3xl'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div
                className="content-html"
                dangerouslySetInnerHTML={{ __html: resolvedContent }}
            />
        </motion.div>
    );
});

export default ContentRenderer;
