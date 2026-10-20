import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  // If already installed and running as standalone app, hide button
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (!success) {
        setShowGuide(true);
      }
    } else {
      setShowGuide(true);
    }
  };

  return (
    <>
      <button
        onClick={handleInstallClick}
        type="button"
        title="Instalar aplicación en el teléfono (Android / iOS)"
        className="flex items-center gap-1.5 px-3 py-1 bg-[#16a34a] hover:bg-emerald-700 text-white rounded text-xs font-semibold shadow-xs transition-colors cursor-pointer"
      >
        {/* Single Phone Download / Install Icon */}
        <svg
          className="w-4 h-4 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        <span>Instalar en teléfono</span>
      </button>

      {/* Guide Modal for iOS or manual install */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded bg-white p-5 shadow-2xl border border-slate-300 text-slate-800 font-sans">
            <div className="flex justify-between items-center border-b pb-2 mb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Instalar en tu teléfono
              </h3>
              <button
                onClick={() => setShowGuide(false)}
                className="text-slate-500 hover:text-slate-800 font-bold px-1.5 py-0.5 text-base cursor-pointer"
              >
                ✕
              </button>
            </div>

            {isIOS ? (
              <div className="space-y-3 text-xs leading-relaxed text-slate-700">
                <p className="font-semibold text-slate-900">
                  Para instalar en iPhone o iPad (Safari):
                </p>
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#16a34a]">1.</span>
                    <span>Toca el botón <strong>Compartir</strong> (icono con flecha hacia arriba) en la barra inferior de Safari.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#16a34a]">2.</span>
                    <span>Baja un poco en el menú y selecciona <strong>"Agregar a pantalla de inicio"</strong>.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#16a34a]">3.</span>
                    <span>Toca <strong>Agregar</strong> arriba a la derecha.</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500">
                  La aplicación quedará instalada como app nativa en tu pantalla con su icono de Consultar Horario.
                </p>
              </div>
            ) : (
              <div className="space-y-3 text-xs leading-relaxed text-slate-700">
                <p className="font-semibold text-slate-900">
                  Para instalar en Android / Chrome:
                </p>
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#16a34a]">1.</span>
                    <span>Toca los <strong>tres puntos (⋮)</strong> del navegador en la esquina superior derecha.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#16a34a]">2.</span>
                    <span>Selecciona <strong>"Instalar aplicación"</strong> o <strong>"Agregar a la pantalla principal"</strong>.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#16a34a]">3.</span>
                    <span>Confirma tocando <strong>Instalar</strong>.</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500">
                  Se añadirá el acceso directo y podrás abrirla a pantalla completa sin barras de navegador.
                </p>
              </div>
            )}

            <button
              onClick={() => setShowGuide(false)}
              className="mt-4 w-full py-1.5 bg-[#205b9b] hover:bg-[#1b4e86] text-white text-xs font-semibold rounded cursor-pointer transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
};
