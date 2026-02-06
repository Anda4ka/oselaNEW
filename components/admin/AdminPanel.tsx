'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

interface SettingsData {
  regionalPrices: Array<{
    id: number
    region: string
    regionUk: string
    pricePerSqM: number
  }>
  loanSettings: {
    id: number
    ratePeriod1: number
    ratePeriod2: number
    minLoanAmount: number
    maxLoanAmount: number
    downPaymentPercent: number
    maxAreaExcessPercent: number
    maxPriceExcessPercent: number
  }
}

export default function AdminPanel() {
  const t = useTranslations('admin')
  const tCommon = useTranslations('common')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState<SettingsData | null>(null)

  useEffect(() => {
    checkLogin()
  }, [])

  const checkLogin = async () => {
    try {
      const response = await fetch('/api/admin/settings')
      setIsLoggedIn(response.ok)
      if (response.ok) {
        const data = await response.json()
        setSettings(data.data)
      }
    } catch (error) {
      console.error('Check login error:', error)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setIsLoggedIn(true)
        await checkLogin()
      } else {
        setError('Invalid credentials')
      }
    } catch (error) {
      setError('Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      setIsLoggedIn(false)
      setSettings(null)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleSave = async () => {
    if (!settings) return
    
    setError('')
    setSuccess('')
    setLoading(true)
    
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })
      
      const data = await response.json()
      
      if (data.success) {
        setSuccess(t('saveSuccess'))
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError('Save failed')
      }
    } catch (error) {
      setError('Save failed')
    } finally {
      setLoading(false)
    }
  }

  const updateRegionalPrice = (id: number, pricePerSqM: number) => {
    if (!settings) return
    setSettings({
      ...settings,
      regionalPrices: settings.regionalPrices.map(p =>
        p.id === id ? { ...p, pricePerSqM } : p
      )
    })
  }

  const updateLoanSetting = (key: string, value: number) => {
    if (!settings) return
    setSettings({
      ...settings,
      loanSettings: {
        ...settings.loanSettings,
        [key]: value
      }
    })
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-primary-800 mb-6">{t('login')}</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('username')}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                autoComplete="username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('password')}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                autoComplete="current-password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? tCommon('loading') : t('loginButton')}
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (!settings) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex items-center justify-center">
        <div className="text-xl text-gray-600">{tCommon('loading')}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary-800">{t('title')}</h1>
           <button
            onClick={handleLogout}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700"
          >
            {t('logout')}
          </button>
        </div>

        {success && (
          <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded text-green-700">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-primary-800 mb-4">{t('loanSettings')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('ratePeriod1')} (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={(settings.loanSettings.ratePeriod1 * 100).toFixed(2)}
                  onChange={(e) => updateLoanSetting('ratePeriod1', parseFloat(e.target.value) / 100)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('ratePeriod2')} (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={(settings.loanSettings.ratePeriod2 * 100).toFixed(2)}
                  onChange={(e) => updateLoanSetting('ratePeriod2', parseFloat(e.target.value) / 100)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('minLoanAmount')}
                </label>
                <input
                  type="number"
                  value={settings.loanSettings.minLoanAmount}
                  onChange={(e) => updateLoanSetting('minLoanAmount', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('maxLoanAmount')}
                </label>
                <input
                  type="number"
                  value={settings.loanSettings.maxLoanAmount}
                  onChange={(e) => updateLoanSetting('maxLoanAmount', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('downPaymentPercent')} (%)
                </label>
                <input
                  type="number"
                  value={settings.loanSettings.downPaymentPercent.toFixed(1)}
                  onChange={(e) => updateLoanSetting('downPaymentPercent', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-primary-800 mb-4">{t('regionalPrices')}</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4 text-gray-700">{t('region')}</th>
                    <th className="text-left py-2 px-4 text-gray-700">{t('pricePerSqm')}</th>
                  </tr>
                </thead>
                <tbody>
                  {settings.regionalPrices.map((price) => (
                    <tr key={price.id} className="border-b">
                      <td className="py-2 px-4 text-gray-800">{price.regionUk}</td>
                      <td className="py-2 px-4">
                        <input
                          type="number"
                          value={price.pricePerSqM}
                          onChange={(e) => updateRegionalPrice(price.id, parseInt(e.target.value))}
                          className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
            >
              {loading ? tCommon('loading') : tCommon('save')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
