import React, { useRef, useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';

export default function MediaUpload({
  label = 'Upload image',
  accept = 'image/*,video/*',
  currentUrl,
  onUpload,
  onClear,
  hint,
}) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await onUpload(file);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  const isVideo = currentUrl && /\.(mp4|webm|mov)(\?|$)/i.test(currentUrl);

  return (
    <div className="media-upload">
      <span className="label">{label}</span>
      {hint && <p className="media-upload__hint">{hint}</p>}

      {currentUrl ? (
        <div className="media-upload__preview">
          {isVideo ? (
            <video src={currentUrl} controls muted playsInline className="media-upload__media" />
          ) : (
            <img src={currentUrl} alt="" className="media-upload__media" />
          )}
          <button type="button" className="media-upload__clear" onClick={onClear} aria-label="Remove">
            <X size={16} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="media-upload__dropzone"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? <Loader2 size={24} className="spin" /> : <Upload size={24} />}
          <span>{uploading ? 'Uploading…' : 'Choose file'}</span>
        </button>
      )}

      <input ref={inputRef} type="file" accept={accept} className="sr-only" onChange={handleFile} />
    </div>
  );
}
