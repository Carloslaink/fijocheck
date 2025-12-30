"use client";

import React, { useState } from "react";
import { ShieldCheck, Truck, Search, ArrowRight } from "lucide-react";
import Form from "../components/Form";
const formatCLP = (value: string) => {
  const cleanValue = value.replace(/\D/g, "");
  return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export default function LandingPage() {
  // --- ESTADOS DE CONTROL ---
  const [paso, setPaso] = useState(1); // 1: Calculadora, 2: Formulario
  const [precio, setPrecio] = useState<number>(0);
  const [precioRaw, setPrecioRaw] = useState<string>("");
  const [distancia, setDistancia] = useState<number>(0);
  const [distanciaRaw, setDistanciaRaw] = useState<string>("");
  const [total, setTotal] = useState<number | null>(null);
  const [errores, setErrores] = useState<{
    precio?: string;
    distancia?: string;
  }>({});

  const calcular = () => {
    const nuevosErrores: { precio?: string; distancia?: string } = {};

    if (!precioRaw)
      nuevosErrores.precio = "Debes llenar el precio del producto";
    if (!distanciaRaw)
      nuevosErrores.distancia = "Debes llenar los kilómetros de ida";

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      setTotal(null);
      return;
    }

    setErrores({});
    const base = 9000;
    const kmExtra = 350;
    const comision = precio * 0.03;
    setTotal(Math.round(base + distancia * kmExtra + comision));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- NAVBAR --- */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b sticky top-0 z-50">
        <div
          className="flex items-center gap-2 font-black text-2xl tracking-tighter cursor-pointer"
          onClick={() => setPaso(1)}
        >
          <div className="bg-blue-600 text-white px-2 py-1 rounded-lg">F</div>
          <span>
            Fijo<span className="text-blue-600">Check</span>
          </span>
        </div>
        <button
          onClick={() => setPaso(1)}
          className="bg-blue-600 text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-blue-700 transition"
        >
          Iniciar Servicio
        </button>
      </nav>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <header className="px-6 py-16 text-center max-w-4xl mx-auto">
        {/* PASO 1: CALCULADORA */}
        {paso === 1 && (
          <div className="animate-in fade-in duration-500">
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              Compra en Marketplace <br />
              <span className="text-blue-600">sin miedo a estafas.</span>
            </h1>
            <p className="text-lg text-slate-600 mb-10">
              Validamos el estado técnico, pagamos por ti y te lo entregamos en
              casa.
            </p>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 text-left max-w-md mx-auto">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ShieldCheck className="text-blue-600" /> Cotiza tu seguridad
              </h3>

              <div className="space-y-4">
                {/* Input Precio */}
                <div>
                  <label className="block text-sm font-semibold mb-1 text-slate-500">
                    Precio del producto ($)
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: 150.000"
                    value={precioRaw}
                    className={`w-full p-3 bg-slate-100 rounded-xl outline-none transition ${
                      errores.precio
                        ? "ring-2 ring-red-500"
                        : "focus:ring-2 focus:ring-blue-500"
                    }`}
                    onChange={(e) => {
                      const valorFormateado = formatCLP(e.target.value);
                      setPrecioRaw(valorFormateado);
                      setPrecio(Number(valorFormateado.replace(/\./g, "")));
                      if (errores.precio)
                        setErrores({ ...errores, precio: undefined });
                    }}
                  />
                  {errores.precio && (
                    <p className="text-red-500 text-xs mt-1 font-medium">
                      {errores.precio}
                    </p>
                  )}
                </div>

                {/* Input Distancia */}
                <div>
                  <label className="block text-sm font-semibold mb-1 text-slate-500">
                    Distancia (Km ida)
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: 25"
                    value={distanciaRaw}
                    className={`w-full p-3 bg-slate-100 rounded-xl outline-none transition ${
                      errores.distancia
                        ? "ring-2 ring-red-500"
                        : "focus:ring-2 focus:ring-blue-500"
                    }`}
                    onChange={(e) => {
                      const valorFormateado = formatCLP(e.target.value);
                      setDistanciaRaw(valorFormateado);
                      setDistancia(
                        Number(valorFormateado.replace(/\./g, "")) * 2
                      );
                      if (errores.distancia)
                        setErrores({ ...errores, distancia: undefined });
                    }}
                  />
                  {errores.distancia && (
                    <p className="text-red-500 text-xs mt-1 font-medium">
                      {errores.distancia}
                    </p>
                  )}
                </div>

                <button
                  onClick={calcular}
                  className="w-full bg-slate-900 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition"
                >
                  Calcular Tarifa <ArrowRight size={18} />
                </button>

                {total && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-2xl animate-in zoom-in-95">
                    <p className="text-sm text-blue-700 font-medium text-center">
                      Costo del servicio:
                    </p>
                    <p className="text-4xl font-black text-blue-900 text-center">
                      ${total.toLocaleString("es-CL")}
                    </p>
                    <p className="text-xs text-blue-500 text-center mt-2">
                      Incluye revisión técnica y transporte seguro + Seguro de
                      Encomiendas.
                    </p>
                    <button
                      onClick={() => setPaso(2)}
                      className="mt-4 w-full bg-blue-600 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
                    >
                      Continuar al Formulario <ArrowRight size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PASO 2: FORMULARIO EXTERNO */}
        {paso === 2 && (
          <Form
            total={total!}
            precio={precioRaw}
            distancia={distanciaRaw}
            onBack={() => setPaso(1)}
          />
        )}
      </header>

      {/* --- SECCIÓN DE CARACTERÍSTICAS (Solo se muestra en el paso 1 para no distraer) --- */}
      {paso === 1 && (
        <section className="px-6 py-20 bg-white">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="bg-blue-100 w-12 h-12 rounded-2xl flex items-center justify-center text-blue-600 mx-auto md:mx-0">
                <Search />
              </div>
              <h4 className="text-xl font-bold">Validación Técnica</h4>
              <p className="text-slate-500 text-sm">
                Revisamos que el producto funcione y coincida con la descripción
                antes de que pagues.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-green-100 w-12 h-12 rounded-2xl flex items-center justify-center text-green-600 mx-auto md:mx-0">
                <ShieldCheck />
              </div>
              <h4 className="text-xl font-bold">Pago Protegido</h4>
              <p className="text-slate-500 text-sm">
                Retenemos el pago al vendedor hasta que el producto esté
                verificado y en tus manos.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-purple-100 w-12 h-12 rounded-2xl flex items-center justify-center text-purple-600 mx-auto md:mx-0">
                <Truck />
              </div>
              <h4 className="text-xl font-bold">Entrega a Domicilio</h4>
              <p className="text-slate-500 text-sm">
                Nos encargamos del transporte seguro desde cualquier punto de la
                Región Metropolitana.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* --- FOOTER --- */}
      <footer className="py-12 px-6 border-t text-center text-slate-400 text-sm">
        <p>© 2025 FijoCheck Chile - Desarrollado por Anthony Boscan</p>
      </footer>
    </div>
  );
}
