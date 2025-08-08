"use client";

import Link from "next/link";
import { FaKey, FaFileContract } from "react-icons/fa";

export default function MainPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="flex gap-6 flex-wrap justify-center">
        <Link
          href="/password-change"
          className="w-52 rounded-lg shadow-md hover:shadow-xl transition duration-300 cursor-pointer p-6 flex flex-col items-center text-center bg-base-100"
        >
          <FaKey className="text-4xl text-primary" />
          <h2 className="mt-2 font-medium text-primary">Cambio de Contraseña</h2>
        </Link>

        <Link
          href="/terms"
          className="w-52 rounded-lg shadow-md hover:shadow-xl transition duration-300 cursor-pointer p-6 flex flex-col items-center text-center bg-base-100"
        >
          <FaFileContract className="text-4xl text-primary" />
          <h2 className="mt-2 font-medium text-primary">Términos y Condiciones</h2>
        </Link>
      </div>
    </main>
  );
}
