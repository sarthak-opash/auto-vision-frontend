import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { estimateCost, getVehicleCatalog, predictDamage, predictSeverity, uploadFile } from '../api/detection'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { useDetectionStore } from '../store/detection-store'

export function UploadPage() {
  const [make, setMake] = useState('')
  const [vehicleModel, setVehicleModel] = useState('')
  const [year, setYear] = useState<number | undefined>(undefined)
  const [requestError, setRequestError] = useState<string | null>(null)
  const navigate = useNavigate()
  const setFile = useDetectionStore((state) => state.setFile)
  const setResults = useDetectionStore((state) => state.setResults)
  const file = useDetectionStore((state) => state.file)
  const previewUrl = useDetectionStore((state) => state.previewUrl)

  const uploadMutation = useMutation({ mutationFn: uploadFile })
  const predictMutation = useMutation({ mutationFn: predictDamage })
  const severityMutation = useMutation({ mutationFn: predictSeverity })
  const costMutation = useMutation({
    mutationFn: (payload: { file: File; vehicle?: { make?: string; model?: string; year?: number } }) =>
      estimateCost(payload.file, payload.vehicle),
  })
  const vehicleCatalogQuery = useQuery({
    queryKey: ['vehicle-catalog'],
    queryFn: getVehicleCatalog,
  })

  const makeOptions = vehicleCatalogQuery.data?.catalog ?? []
  const selectedMake = makeOptions.find((option) => option.name === make)
  const modelOptions = selectedMake?.models ?? []
  const selectedModel = modelOptions.find((option) => option.name === vehicleModel)
  const yearOptions =
    selectedModel && selectedModel.year_start <= selectedModel.year_end
      ? Array.from(
          { length: selectedModel.year_end - selectedModel.year_start + 1 },
          (_, index) => selectedModel.year_start + index,
        ).reverse()
      : []

  const loading =
    uploadMutation.isPending ||
    predictMutation.isPending ||
    severityMutation.isPending ||
    costMutation.isPending

  const onSelectFile = (selected?: File) => {
    if (!selected) return
    setFile(selected, URL.createObjectURL(selected))
  }

  const onChangeMake = (value: string) => {
    setMake(value)
    setVehicleModel('')
    setYear(undefined)
  }

  const onChangeModel = (value: string) => {
    setVehicleModel(value)
    setYear(undefined)
  }

  const runDetection = async () => {
    if (!file) return
    setRequestError(null)
    try {
      const upload = await uploadMutation.mutateAsync(file)
      const predict = await predictMutation.mutateAsync(file)
      const severity = await severityMutation.mutateAsync(file)
      const cost = await costMutation.mutateAsync({
        file,
        vehicle: { make, model: vehicleModel, year },
      })
      setResults({ upload, predict, severity, cost })
      navigate('/result')
    } catch (error) {
      if (error instanceof AxiosError && !error.response) {
        setRequestError(
          'Unable to reach API. Ensure backend is running and CORS/proxy is configured.',
        )
        return
      }
      setRequestError('Analysis failed. Please verify API availability and try again.')
    }
  }

  return (
    <Card className="mx-auto max-w-4xl space-y-8 sm:space-y-10" spacing="roomy">
      <div className="space-y-3 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-[#111111] sm:text-5xl">Analyze Vehicle</h1>
        <p className="text-base text-[#4B4B4B] sm:text-lg">
          Upload imagery for real-time damage and cost estimation
        </p>
      </div>

      <label className="group relative flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#60176F]/15 bg-white/55 p-10 text-center transition-all hover:border-[#60176F]/35 hover:bg-[#60176F]/6">
        <input
          className="hidden"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={(event) => onSelectFile(event.target.files?.[0])}
        />
        <div className="mb-5 rounded-3xl bg-white p-5 shadow-[0_12px_26px_rgba(96,23,111,0.14)] transition-transform group-hover:scale-105">
          <svg className="h-10 w-10 text-[#60176F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <p className="text-xl font-semibold text-[#111111]">Select high-resolution image</p>
        <p className="mt-2 text-base text-[#4B4B4B]">Drag and drop or browse files</p>
      </label>

      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#4B4B4B]/75">
          Vehicle Metadata (Optional)
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <select
            value={make}
            onChange={(e) => onChangeMake(e.target.value)}
            className="h-12 w-full rounded-2xl border border-[#111111]/8 bg-white/75 px-4 text-sm font-medium text-[#111111] outline-none backdrop-blur-xl transition-all focus:border-[#60176F]/35 focus:bg-white focus:shadow-[0_0_0_4px_rgba(96,23,111,0.10)]"
            disabled={vehicleCatalogQuery.isLoading}
          >
            <option value="">
              {vehicleCatalogQuery.isLoading ? 'Loading makes...' : 'Select manufacturer'}
            </option>
            {makeOptions.map((option) => (
              <option key={option.name} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
          <select
            value={vehicleModel}
            onChange={(e) => onChangeModel(e.target.value)}
            className="h-12 w-full rounded-2xl border border-[#111111]/8 bg-white/75 px-4 text-sm font-medium text-[#111111] outline-none backdrop-blur-xl transition-all focus:border-[#60176F]/35 focus:bg-white focus:shadow-[0_0_0_4px_rgba(96,23,111,0.10)] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!make || !modelOptions.length}
          >
            <option value="">Select model</option>
            {modelOptions.map((option) => (
              <option key={option.name} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
          <select
            value={year ?? ''}
            onChange={(e) => setYear(e.target.value ? Number(e.target.value) : undefined)}
            className="h-12 w-full rounded-2xl border border-[#111111]/8 bg-white/75 px-4 text-sm font-medium text-[#111111] outline-none backdrop-blur-xl transition-all focus:border-[#60176F]/35 focus:bg-white focus:shadow-[0_0_0_4px_rgba(96,23,111,0.10)] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!vehicleModel || !yearOptions.length}
          >
            <option value="">Select year</option>
            {yearOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        {vehicleCatalogQuery.error && (
          <p className="text-xs text-amber-700">
            Vehicle catalog unavailable. Backend `vehicle-catalog` endpoint may be down.
          </p>
        )}
      </div>

      {previewUrl && (
        <div className="overflow-hidden rounded-3xl border border-white/80 bg-white shadow-[0_16px_34px_rgba(17,17,17,0.08)]">
          <img src={previewUrl} alt="upload preview" className="h-[360px] w-full object-cover sm:h-[400px]" />
        </div>
      )}

      <Button
        size="xl"
        className="w-full"
        onClick={runDetection}
        disabled={!file || loading}
      >
        {loading ? (
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            <span>Processing Intelligence...</span>
          </div>
        ) : 'Execute Damage Analysis'}
      </Button>

      {(uploadMutation.error || requestError) && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-center text-sm font-semibold text-rose-600">
          {requestError ?? 'Deep analysis encountered an error. Please try again.'}
        </div>
      )}
    </Card>
  )
}
