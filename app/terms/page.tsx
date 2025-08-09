'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { head } from '../data/head'
import { body } from '../data/body'
import { ChevronDoubleDownIcon, ChevronDoubleUpIcon } from '@heroicons/react/24/outline'

export default function TermsOfUse() {
	const termsContentRef = useRef<HTMLDivElement>(null)
	const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null)
	const autoScrollDirectionRef = useRef<'up' | 'down' | null>(null)

	const [isAtBottom, setIsAtBottom] = useState(false)
	const [isAtTop, setIsAtTop] = useState(true)
	const [hasAcceptedConsent, setHasAcceptedConsent] = useState(false)

	const router = useRouter()

	useEffect(() => {
		const container = termsContentRef.current
		if (!container) return

		const handleContainerScroll = () => {
			const reachedBottom =
				container.scrollHeight - container.scrollTop <= container.clientHeight + 5
			const reachedTop = container.scrollTop <= 5

			setIsAtBottom(reachedBottom)
			setIsAtTop(reachedTop)

			// Si llegamos al extremo en la dirección del autoscroll, deténlo
			if (
				(reachedBottom && autoScrollDirectionRef.current === 'down') ||
				(reachedTop && autoScrollDirectionRef.current === 'up')
			) {
				stopAutoScroll()
			}
		}

		container.addEventListener('scroll', handleContainerScroll)

		const contentDoesNotOverflow = container.scrollHeight <= container.clientHeight + 5
		setIsAtBottom(contentDoesNotOverflow)
		setIsAtTop(true)

		return () => {
			container.removeEventListener('scroll', handleContainerScroll)
			stopAutoScroll()
		}
	}, [])

	const startAutoScroll = (direction: 'up' | 'down') => {
		const container = termsContentRef.current
		if (!container || autoScrollTimerRef.current) return

		autoScrollDirectionRef.current = direction
		autoScrollTimerRef.current = setInterval(() => {
			container.scrollBy({ top: direction === 'down' ? 4 : -4 })
		}, 16)
	}

	const stopAutoScroll = () => {
		if (autoScrollTimerRef.current) {
			clearInterval(autoScrollTimerRef.current)
			autoScrollTimerRef.current = null
		}
		autoScrollDirectionRef.current = null
	}

	const buildHoverOrPressHandlers = (direction: 'up' | 'down') => ({
		onPointerEnter: (e: React.PointerEvent) => {
			if (e.pointerType === 'mouse') startAutoScroll(direction)
		},
		onPointerLeave: () => stopAutoScroll(),
		onPointerDown: (e: React.PointerEvent) => {
			if (e.pointerType !== 'mouse') startAutoScroll(direction)
		},
		onPointerUp: () => stopAutoScroll(),
		onPointerCancel: () => stopAutoScroll(),
	})

	return (
		<main className="min-h-screen bg-white px-4 pt-6 pb-12 text-center relative">
			<button
				type="button"
				onClick={() => router.push('/main')}
				className="btn btn-outline btn-primary absolute top-6 left-6"
			>
				Menú
			</button>

			<div className="flex justify-center mb-4">
				<Image
					src="/logo-safe-school.svg"
					alt="Safe School"
					width={220}
					height={120}
					priority
					className="w-[220px] h-[120px]"
				/>
			</div>

			<h1 className="text-3xl font-bold mb-4">
				Términos de Uso y Consentimiento para Publicidad
			</h1>

			<div className="bg-gray-100 text-sm text-gray-800 font-semibold px-6 py-4 rounded-md max-w-2xl mx-auto mb-6">
				{head}
			</div>

			<div className="relative max-w-2xl mx-auto">
				<div
					ref={termsContentRef}
					className="max-h-[50vh] sm:max-h-[400px]
                     overflow-hidden
                     pb-32
                     text-left text-xs leading-relaxed
                     text-gray-700 space-y-4 px-1 pr-4 text-justify"
				>
					{body}
				</div>

				{!isAtTop && (
					<div
						{...buildHoverOrPressHandlers('up')}
						className="absolute inset-x-0 top-0 h-16
                       bg-gradient-to-b from-white/70 to-transparent
                       flex flex-col items-center justify-start cursor-pointer select-none"
					>
						<ChevronDoubleUpIcon className="w-6 h-6 mt-1 text-primary animate-bounce" />
						<span className="text-[10px]">Pasa el puntero para subir</span>
					</div>
				)}

				{!isAtBottom && (
					<div
						{...buildHoverOrPressHandlers('down')}
						className="absolute inset-x-0 bottom-0 h-24
                       bg-gradient-to-t from-white/70 to-transparent
                       flex flex-col items-center justify-end cursor-pointer select-none"
					>
						<ChevronDoubleDownIcon className="w-6 h-6 mb-1 text-primary animate-bounce" />
						<span className="text-[10px]">Pasa el puntero para bajar</span>
					</div>
				)}

				{isAtBottom && (
					<div className="absolute inset-x-0 bottom-0 bg-white pt-4 pb-6 flex flex-col items-center gap-4">
						<label className="flex items-center gap-2 text-sm text-gray-700">
							<input
								type="checkbox"
								checked={hasAcceptedConsent}
								onChange={(e) => setHasAcceptedConsent(e.target.checked)}
								className="checkbox checkbox-primary"
							/>
							Acepto el tratamiento de datos personales
						</label>

						<button
							onClick={() => router.push('/main')}
							disabled={!hasAcceptedConsent}
							className={`btn w-80 rounded-full text-white transition-all ${hasAcceptedConsent ? 'btn-primary' : 'bg-gray-300 cursor-not-allowed'
								}`}
						>
							Continuar
						</button>
					</div>
				)}
			</div>
		</main>
	)
}
