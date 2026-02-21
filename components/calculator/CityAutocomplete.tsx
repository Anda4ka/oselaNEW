'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Fuse from 'fuse.js'

interface CityEntry {
    name: string
    nameAlt: string[]
    region: string
    is_large_city: boolean
}

interface CityAutocompleteProps {
    value: string
    onSelect: (city: { name: string; region: string; settlementType: 'major' | 'other' }) => void
    placeholder?: string
    inputClassName?: string
    label?: string
}

const REGION_LABELS: Record<string, string> = {
    Kyiv: 'м. Київ',
    Kharkiv: 'Харківська обл.',
    Odesa: 'Одеська обл.',
    Dnipropetrovsk: 'Дніпропетровська обл.',
    Donetsk: 'Донецька обл.',
    Zaporizhzhia: 'Запорізька обл.',
    Lviv: 'Львівська обл.',
    Mykolaiv: 'Миколаївська обл.',
    Luhansk: 'Луганська обл.',
    Vinnytsia: 'Вінницька обл.',
    Kherson: 'Херсонська обл.',
    Poltava: 'Полтавська обл.',
    Chernihiv: 'Чернігівська обл.',
    Cherkasy: 'Черкаська обл.',
    Sumy: 'Сумська обл.',
    Zhytomyr: 'Житомирська обл.',
    Khmelnytskyi: 'Хмельницька обл.',
    Rivne: 'Рівненська обл.',
    IvanoFrankivsk: 'Івано-Франківська обл.',
    Ternopil: 'Тернопільська обл.',
    Volyn: 'Волинська обл.',
    Zakarpattia: 'Закарпатська обл.',
    Kirovohrad: 'Кіровоградська обл.',
    KyivRegion: 'Київська обл.',
    Chernivtsi: 'Чернівецька обл.',
}

let cachedCities: CityEntry[] | null = null
let cachedFuse: Fuse<CityEntry> | null = null

async function loadCities(): Promise<{ cities: CityEntry[]; fuse: Fuse<CityEntry> }> {
    if (cachedCities && cachedFuse) return { cities: cachedCities, fuse: cachedFuse }
    const res = await fetch('/api/cities')
    const raw: CityEntry[] = await res.json()
    // Deduplicate by name
    const seen = new Set<string>()
    cachedCities = raw.filter(c => {
        if (seen.has(c.name)) return false
        seen.add(c.name)
        return true
    })
    cachedFuse = new Fuse(cachedCities, {
        keys: [
            { name: 'name', weight: 2 },
            { name: 'nameAlt', weight: 1 },
        ],
        threshold: 0.35,
        includeScore: true,
        minMatchCharLength: 1,
        useExtendedSearch: false,
    })
    return { cities: cachedCities, fuse: cachedFuse }
}

export default function CityAutocomplete({
    value,
    onSelect,
    placeholder = 'Введіть назву міста...',
    inputClassName = '',
    label,
}: CityAutocompleteProps) {
    const [inputValue, setInputValue] = useState(value || '')
    const [suggestions, setSuggestions] = useState<CityEntry[]>([])
    const [open, setOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(-1)
    const [fuse, setFuse] = useState<Fuse<CityEntry> | null>(null)
    const [ready, setReady] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const debounceRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        loadCities().then(({ fuse: f }) => {
            setFuse(f)
            setReady(true)
        })
    }, [])

    useEffect(() => {
        setInputValue(value || '')
    }, [value])

    const handleInput = useCallback((q: string) => {
        setInputValue(q)
        setActiveIndex(-1)
        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => {
            if (!fuse || !q.trim()) {
                setSuggestions([])
                setOpen(false)
                return
            }
            const results = fuse.search(q).slice(0, 8).map(r => r.item)
            setSuggestions(results)
            setOpen(results.length > 0)
        }, 120)
    }, [fuse])

    const handleSelect = useCallback((city: CityEntry) => {
        setInputValue(city.name)
        setSuggestions([])
        setOpen(false)
        onSelect({
            name: city.name,
            region: city.region,
            settlementType: city.is_large_city ? 'major' : 'other',
        })
    }, [onSelect])

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!open) return
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setActiveIndex(i => Math.min(i + 1, suggestions.length - 1))
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setActiveIndex(i => Math.max(i - 1, 0))
        } else if (e.key === 'Enter') {
            e.preventDefault()
            if (activeIndex >= 0 && suggestions[activeIndex]) {
                handleSelect(suggestions[activeIndex])
            }
        } else if (e.key === 'Escape') {
            setOpen(false)
        }
    }

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    return (
        <div ref={containerRef} className="relative">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            )}
            <div className="relative">
                <input
                    type="text"
                    value={inputValue}
                    onChange={e => handleInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => { if (suggestions.length > 0) setOpen(true) }}
                    placeholder={ready ? placeholder : 'Завантаження...'}
                    autoComplete="off"
                    className={`${inputClassName} pr-8`}
                    aria-autocomplete="list"
                    aria-expanded={open}
                />
                <svg
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                </svg>
            </div>

            {open && suggestions.length > 0 && (
                <ul
                    role="listbox"
                    className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden max-h-72 overflow-y-auto"
                >
                    {suggestions.map((city, i) => (
                        <li
                            key={`${city.name}-${city.region}`}
                            role="option"
                            aria-selected={i === activeIndex}
                            onMouseDown={e => { e.preventDefault(); handleSelect(city) }}
                            onMouseEnter={() => setActiveIndex(i)}
                            className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors text-sm ${i === activeIndex ? 'bg-primary-50 text-primary-800' : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <span className="font-medium">{city.name}</span>
                            <div className="flex items-center gap-1.5 ml-2 shrink-0">
                                <span className="text-xs text-gray-400">
                                    {REGION_LABELS[city.region] || city.region}
                                </span>
                                {city.is_large_city && (
                                    <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-semibold whitespace-nowrap">
                                        &gt;300 тис.
                                    </span>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
