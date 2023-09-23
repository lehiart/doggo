import React from 'react'
import CopyToClipboardInput from '../opinions/copy-to-clipboard-input'

interface ClientsEmptyScreensProps {
  url: string
}

const COMPANY_BASE_URL = 'https://doghouse.mx/empresa/'

export default function ClientsEmptyScreens({ url }: ClientsEmptyScreensProps) {
  return (
    <section className="flex flex-col items-center justify-center w-full h-full mt-28">
      <h2 className="lg:text-4xl font-bold text-2xl mb-12 animate-slide-down text-center">
        Aún no tienes solicitudes de tus clientes
      </h2>

      <CopyToClipboardInput
        title="Comparte tu pagina para que puedas recibir mas
            solicitudes de tus servicios"
        url={`${COMPANY_BASE_URL}${url}`}
      />
    </section>
  )
}
