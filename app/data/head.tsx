import type { ReactElement } from 'react'

export const head: ReactElement = (
  <>
    Revisa cuidadosamente la información, al seleccionar aceptar confirmo que revisé y acepto los{' '}
    <span className="text-blue-600 font-semibold underline cursor-pointer">
      Términos de Uso y Consentimiento para Publicidad
    </span>,
    en caso de no aceptar, no podrá hacer uso de la plataforma.
  </>
)