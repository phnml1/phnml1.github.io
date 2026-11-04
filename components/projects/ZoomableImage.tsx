'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type ZoomableImageProps = {
  src: string | Blob;
  alt: string;
  className?: string;
};

export default function ZoomableImage({ src, alt, className = '' }: ZoomableImageProps) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || !open) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [mounted, open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={`${alt || '이미지'} 크게 보기`}
        onClick={() => setOpen(true)}
        className="block w-full cursor-zoom-in rounded-lg text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        {/* Preserve each screenshot or GIF's original aspect ratio. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" className={className} />
      </button>
      {mounted && createPortal(
        <dialog
          ref={dialogRef}
          aria-label={alt || '확대 이미지'}
          onClose={() => {
            setOpen(false);
            triggerRef.current?.focus();
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) event.currentTarget.close();
          }}
          className="fixed inset-0 m-auto max-h-[95dvh] max-w-[95vw] overflow-auto rounded-xl border border-outline bg-surface-container p-3 text-white shadow-2xl backdrop:bg-black/85 sm:p-5"
        >
          <div className="mb-3 flex items-center justify-end">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="rounded-md border border-outline px-3 py-1.5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              닫기 <span aria-hidden="true">×</span>
            </button>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="mx-auto block max-h-[80dvh] max-w-full object-contain" />
        </dialog>,
        document.body,
      )}
    </>
  );
}
