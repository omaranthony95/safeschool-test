'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { head } from '../data/head'
import { body } from '../data/body'
import { ChevronDoubleDownIcon } from '@heroicons/react/24/outline'

export default function TermsOfUse() {
	const contentRef = useRef<HTMLDivElement>(null)
	const scrollInterval = useRef<NodeJS.Timeout | null>(null)
	const [scrolledToBottom, setScrolledToBottom] = useState(false)
	const [accepted, setAccepted] = useState(false)
	const router = useRouter()

	useEffect(() => {
		const contentElement = contentRef.current
		if (!contentElement) return
	
		const handleScroll = () => {
			const isAtBottom =
				contentElement.scrollHeight - contentElement.scrollTop <= contentElement.clientHeight + 5
			setScrolledToBottom(isAtBottom)
	
			if (isAtBottom && scrollInterval.current) {
				clearInterval(scrollInterval.current)
			}
		}
	
		contentElement.addEventListener('scroll', handleScroll)

		const isAlreadyScrolled =
			contentElement.scrollHeight <= contentElement.clientHeight + 5
	
		if (isAlreadyScrolled) setScrolledToBottom(true)
	
		return () => contentElement.removeEventListener('scroll', handleScroll)
	}, [])

	const startAutoScroll = () => {
		const contentElement = contentRef.current
		if (!contentElement || scrollInterval.current) return

		scrollInterval.current = setInterval(() => {
			contentElement.scrollBy({ top: 4 })
		}, 16)
	}

	const stopAutoScroll = () => {
		if (scrollInterval.current) {
			clearInterval(scrollInterval.current)
			scrollInterval.current = null
		}
	}

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
					ref={contentRef}
					className="max-h-[50vh] sm:max-h-[400px]
             overflow-hidden
             pb-32
             text-left text-xs leading-relaxed
             text-gray-700 space-y-4 px-1 pr-4 text-justify"
				>
					{body}
				</div>

				{!scrolledToBottom && (
					<div
						onMouseEnter={startAutoScroll}
						onMouseLeave={stopAutoScroll}
						className="absolute inset-x-0 bottom-0 h-24
                       bg-gradient-to-t from-white/70 to-transparent
                       flex flex-col items-center justify-end cursor-pointer"
					>
						<ChevronDoubleDownIcon className="w-6 h-6 mb-1 text-primary animate-bounce" />
						<span className="text-xs">Desliza hacia abajo para seguir leyendo</span>
					</div>
				)}

				{scrolledToBottom && (
					<div className="absolute inset-x-0 bottom-0 bg-white pt-4 pb-6 flex flex-col items-center gap-4">
						<label className="flex items-center gap-2 text-sm text-gray-700">
							<input
								type="checkbox"
								checked={accepted}
								onChange={e => setAccepted(e.target.checked)}
								className="checkbox checkbox-primary"
							/>
							Acepto el tratamiento de datos personales
						</label>

						<button
							onClick={() => router.push('/main')}
							disabled={!accepted}
							className={`btn w-48 rounded-full text-white transition-all ${accepted ? 'btn-primary' : 'bg-gray-300 cursor-not-allowed'
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
