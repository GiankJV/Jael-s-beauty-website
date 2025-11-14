'use client';

import Image from 'next/image';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useLang } from '@/context/LanguageContext';

export interface PhotoDropzoneProps {
  files: File[];
  setFiles: (files: File[]) => void;
}

export default function PhotoDropzone({ files, setFiles }: PhotoDropzoneProps) {
  const { lang } = useLang();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const limited = [...files, ...acceptedFiles].slice(0, 3);
      setFiles(limited);
    },
    [files, setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 3,
    maxSize: 10 * 1024 * 1024,
  });

  return (
    <div className="space-y-3">
      <div className="bg-pink/20 border border-pink/40 rounded-xl px-4 py-3 text-xs md:text-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="font-semibold">
          {lang === 'en' ? 'Photo guidelines' : 'Indicaciones para las fotos'}
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm md:text-base">
          <span className="font-medium">
            {lang === 'en' ? 'Natural daylight' : 'Luz natural'}
          </span>
          <span className="font-medium">
            {lang === 'en' ? 'Hair down, from behind' : 'Cabello suelto, desde atrás'}
          </span>
          <span className="font-medium">
            {lang === 'en'
              ? '1–3 photos • max 10MB each'
              : '1–3 fotos • máx. 10MB cada una'}
          </span>
        </div>
      </div>

      <div
        {...getRootProps()}
        className={`rounded-2xl border-2 border-dashed px-4 py-8 text-center cursor-pointer transition bg-beige/60 ${
          isDragActive ? 'border-rose bg-pink/20' : 'border-rose/40 hover:border-rose'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-pink flex items-center justify-center shadow-sm">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 rounded-md bg-white/80" />
              <div className="absolute bottom-2 left-1 right-1 h-3 bg-rose/30 rounded-sm" />
              <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-rose/60" />
              <div className="absolute bottom-2 left-3 right-3 h-3 border border-rose/60 rounded-sm" />
            </div>
          </div>

          <div className="text-sm font-medium">
            {lang === 'en' ? 'Upload your photos' : 'Sube tus fotos'}
          </div>
          <p className="text-xs opacity-70">
            {lang === 'en'
              ? 'Drag and drop, or click to browse up to 3 photos.'
              : 'Arrastra y suelta, o haz clic para elegir hasta 3 fotos.'}
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="flex gap-3 mt-2">
          {files.map((file, idx) => (
            <div
              key={`${file.name}-${idx}`}
              className="relative w-20 h-20 rounded-xl overflow-hidden bg-beige border border-rose/30"
            >
              <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
