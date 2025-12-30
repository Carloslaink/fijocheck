"use client";

import React, { useState } from "react";
import {
  User,
  MapPin,
  Link as LinkIcon,
  Phone,
  ArrowRight,
  ArrowLeft,
  Truck,
} from "lucide-react";

interface FormProps {
  total: number;
  precio: string;
  distancia: string;
  onBack: () => void;
}

export default function Form({ total, precio, distancia, onBack }: FormProps) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [enlace, setEnlace] = useState("");
  const [direccion, setDireccion] = useState("");

  const [erroresForm, setErroresForm] = useState<
    Partial<Record<string, string>>
  >({});

  const limpiarError = (campo: string) => {
    setErroresForm((prev) => {
      const nuevos = { ...prev };
      delete nuevos[campo];
      return nuevos;
    });
  };

  const enviarWhatsApp = () => {
    const nuevosErrores: Record<string, string> = {};
    if (!nombre) nuevosErrores.nombre = "Nombre requerido";
    if (!telefono) nuevosErrores.telefono = "WhatsApp requerido";
    if (!enlace) nuevosErrores.enlace = "Link requerido";
    if (!direccion) nuevosErrores.direccion = "Dirección requerida";

    if (Object.keys(nuevosErrores).length > 0) {
      setErroresForm(nuevosErrores);
      return;
    }

    // Cálculos
    const precioProductoNum = Number(precio.replace(/\./g, "")) || 0;
    const costoServicio = total;
    const granTotal = precioProductoNum + costoServicio;
    const distanciaNum = Number(distancia) || 0;

    const miNumero = "+56952550356";

    // MENSAJE CON EMOJIS UNIVERSALES (Android/iOS/PC)
    // He quitado los diamantes y usado el asterisco (*) para negritas de WhatsApp
    const mensajeTexto =
      `*NUEVA ORDEN - FIJOCHECK*\n\n` +
      `*DATOS DEL CLIENTE*\n` +
      `---------------------------------------\n` +
      `*Nombre:* ${nombre}\n` +
      `*WhatsApp:* ${telefono}\n` +
      `*Producto:* ${enlace}\n` +
      `*Entrega:* ${direccion}\n\n` +
      `*DESGLOSE DE PAGOS*\n` +
      `---------------------------------------\n` +
      `- *Valor Producto:* $${precio}\n` +
      `- *Servicio FijoCheck:* $${costoServicio.toLocaleString("es-CL")}\n` +
      `- *Distancia Total:* ${distanciaNum * 2} Km\n\n` +
      `*TOTAL A TRANSFERIR: $${granTotal.toLocaleString("es-CL")}*\n\n` +
      `_Por favor, confirme los datos para proceder._`;

    // La clave es el encodeURIComponent para que Android no rompa el texto
    const url = `https://wa.me/${miNumero}?text=${encodeURIComponent(
      mensajeTexto
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-200 text-left max-w-md mx-auto">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-slate-400 hover:text-blue-600 text-sm font-bold transition"
      >
        <ArrowLeft size={16} /> Volver a la calculadora
      </button>

      <h3 className="text-2xl font-black mb-6 text-slate-800">
        Datos de Entrega
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1 ml-1">
            Tu Nombre
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 text-slate-400" size={18} />
            <input
              type="text"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
                limpiarError("nombre");
              }}
              className={`w-full p-3 pl-10 bg-slate-50 rounded-xl outline-none border-2 transition ${
                erroresForm.nombre
                  ? "border-red-500"
                  : "border-transparent focus:border-blue-500"
              }`}
              placeholder="Nombre y Apellido"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1 ml-1">
            WhatsApp
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-green-500" size={18} />
            <input
              type="text"
              value={telefono}
              onChange={(e) => {
                setTelefono(e.target.value);
                limpiarError("telefono");
              }}
              className={`w-full p-3 pl-10 bg-slate-50 rounded-xl outline-none border-2 transition ${
                erroresForm.telefono
                  ? "border-red-500"
                  : "border-transparent focus:border-blue-500"
              }`}
              placeholder="+569..."
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1 ml-1">
            Link del Producto
          </label>
          <div className="relative">
            <LinkIcon
              className="absolute left-3 top-3 text-blue-500"
              size={18}
            />
            <input
              type="text"
              value={enlace}
              onChange={(e) => {
                setEnlace(e.target.value);
                limpiarError("enlace");
              }}
              className={`w-full p-3 pl-10 bg-slate-50 rounded-xl outline-none border-2 transition ${
                erroresForm.enlace
                  ? "border-red-500"
                  : "border-transparent focus:border-blue-500"
              }`}
              placeholder="Link de Marketplace"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1 ml-1">
            Dirección de Entrega
          </label>
          <div className="relative">
            <MapPin
              className="absolute left-3 top-3 text-purple-500"
              size={18}
            />
            <input
              type="text"
              value={direccion}
              onChange={(e) => {
                setDireccion(e.target.value);
                limpiarError("direccion");
              }}
              className={`w-full p-3 pl-10 bg-slate-50 rounded-xl outline-none border-2 transition ${
                erroresForm.direccion
                  ? "border-red-500"
                  : "border-transparent focus:border-blue-500"
              }`}
              placeholder="Calle, Número, Comuna"
            />
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg mt-6">
          <div className="flex justify-between items-center text-white">
            <div className="flex flex-col">
              <span className="text-xs opacity-80 font-bold uppercase tracking-wider">
                Costo del servicio
              </span>
              <span className="text-2xl font-black">
                ${total.toLocaleString("es-CL")}
              </span>
            </div>
            <div className="bg-white/20 p-2 rounded-lg">
              <Truck size={24} />
            </div>
          </div>
        </div>

        <button
          onClick={enviarWhatsApp}
          className="w-full bg-green-600 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition shadow-xl"
        >
          Agendar por WhatsApp <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
