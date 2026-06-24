import { useMemo, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { estimateCost, getHealth, predictDamage, predictSeverity, uploadFile } from '../../api/detection'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Skeleton } from '../../components/ui/skeleton'
import { Car } from 'lucide-react'
import type { CostLineItem } from '../../types/api'

const severityColors: Record<string, string> = { Low: '#16a34a', Medium: '#f59e0b', High: '#f97316', Critical: '#ef4444' }

export function DetectionDashboard() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [make, setMake] = useState('')
  const [vehicleModel, setVehicleModel] = useState('')
  const [year, setYear] = useState<number | undefined>(undefined)

  const healthQuery = useQuery({ queryKey: ['health'], queryFn: getHealth })
  const uploadMutation = useMutation({ mutationFn: uploadFile })
  const predictMutation = useMutation({ mutationFn: predictDamage })
  const severityMutation = useMutation({ mutationFn: predictSeverity })
  const costMutation = useMutation({
    mutationFn: (payload: {
      file: File
      vehicle?: { make?: string; model?: string; year?: number }
    }) => estimateCost(payload.file, payload.vehicle),
  })

  const loading =
    uploadMutation.isPending ||
    predictMutation.isPending ||
    severityMutation.isPending ||
    costMutation.isPending

  const severityReport = severityMutation.data?.severity_report
  const costReport = costMutation.data?.cost_estimation
  const severityBreakdown = useMemo(() => {
    const partMap = severityReport?.part_severity ?? {}
    return Object.values(partMap).map((item) => ({
      name: `${item.part}-${item.damage_type}`,
      score: item.severity_score,
      level: item.severity_level,
    }))
  }, [severityReport])

  const confidenceData = useMemo(
    () =>
      (predictMutation.data?.predictions ?? []).map((item) => ({
        name: item.class,
        confidence: Number((item.confidence * 100).toFixed(2)),
      })),
    [predictMutation.data?.predictions],
  )

  const costData = useMemo(
    () =>
      (costReport?.line_items ?? []).map((item) => ({
        name: `${item.part}-${item.damage_type}`,
        value: item.estimated_cost,
      })),
    [costReport],
  )

  const onSelectFile = (selected?: File) => {
    if (!selected) {
      return
    }
    setFile(selected)
    setPreview(URL.createObjectURL(selected))
  }

  const runDetection = async () => {
    if (!file) return
    await uploadMutation.mutateAsync(file)
    await predictMutation.mutateAsync(file)
    await severityMutation.mutateAsync(file)
    await costMutation.mutateAsync({
      file,
      vehicle: { make, model: vehicleModel, year },
    })
  }

  return (
    <div className="space-y-4">
      <Card className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-2 text-sm text-[#4B4B4B]">Upload Vehicle Image</p>
          <label className="flex min-h-40 cursor-pointer items-center justify-center rounded-2xl border border-dashed border-[#60176F]/20 bg-white/65 p-6 text-center text-sm text-[#4B4B4B]">
            <input
              className="hidden"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(event) => onSelectFile(event.target.files?.[0])}
            />
            Drag and drop or click to upload
          </label>
          <div className="mt-3 grid gap-2 md:grid-cols-3">
            <Input value={make} onChange={(e) => setMake(e.target.value)} placeholder="Make" />
            <Input value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)} placeholder="Model" />
            <Input
              type="number"
              value={year ?? ''}
              onChange={(e) => setYear(e.target.value ? Number(e.target.value) : undefined)}
              placeholder="Year"
            />
          </div>
          <Button className="mt-3 w-full" onClick={runDetection} disabled={!file || loading}>
            {loading ? 'Detecting...' : 'Run Detection'}
          </Button>
        </div>
        <div className="rounded-2xl border border-[#111111]/8 bg-white/70 p-2">
          {preview ? (
            <img src={preview} alt="uploaded preview" className="h-64 w-full rounded-xl object-cover" />
          ) : (
            <div className="flex h-64 items-center justify-center text-sm text-[#4B4B4B]/65">
              Uploaded image preview will appear here
            </div>
          )}
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-4">
        <Metric title="Model Status" value={healthQuery.data?.status ?? 'unknown'} />
        <Metric title="Model Version" value={healthQuery.data?.version ?? '-'} />
        <Metric title="Detections" value={String(predictMutation.data?.count ?? 0)} />
        <Metric title="Overall Severity" value={String(severityReport?.severity_score ?? 0)} />
      </div>

      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-2"
          >
            <Skeleton />
            <Skeleton />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <p className="mb-3 text-sm text-[#4B4B4B]">Severity Distribution</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={severityBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8dfed" />
                <XAxis dataKey="name" stroke="#4B4B4B" />
                <YAxis stroke="#4B4B4B" />
                <Tooltip />
                <Bar dataKey="score">
                  {severityBreakdown.map((entry) => (
                    <Cell key={entry.name} fill={severityColors[entry.level] ?? '#6366f1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <p className="mb-3 text-sm text-[#4B4B4B]">Estimated Cost Breakdown</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={costData} dataKey="value" nameKey="name" outerRadius={90}>
                  {costData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={['#60176f', '#8c3ca0', '#a85db9', '#c681d3', '#dca9e5'][index % 5]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <p className="mb-3 text-sm text-[#4B4B4B]">Detection Confidence</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={confidenceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8dfed" />
              <XAxis dataKey="name" stroke="#4B4B4B" />
              <YAxis stroke="#4B4B4B" />
              <Tooltip />
              <Bar dataKey="confidence" fill="#60176f" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <p className="mb-3 text-sm text-[#4B4B4B]">Damage-wise Breakdown</p>
        <DamageTable rows={costReport?.line_items ?? []} />
      </Card>

      {/* Car-themed loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-[4px] z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-slate-100 flex flex-col items-center animate-in zoom-in-95 duration-300">
            {/* Animated Car Icon inside themed pulse ring */}
            <div className="w-16 h-16 bg-[#984216]/10 rounded-full flex items-center justify-center text-[#984216] mb-5 animate-pulse">
              <Car size={32} className="animate-bounce" />
            </div>
            
            <h3 className="text-xl font-black text-slate-900 mb-2">Analyzing Vehicle</h3>
            <p className="text-slate-500 text-sm font-semibold mb-6 leading-relaxed">
              Scanning image for damages, identifying affected parts, and sourcing repair costs...
            </p>
            
            {/* Simple Pulsing Progress Bar */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-[#984216] rounded-full animate-pulse" style={{ width: '70%' }}></div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#984216]/70">Processing Pipeline</span>
          </div>
        </div>
      )}
    </div>
  )
}

function Metric({ title, value }: { title: string; value: string }) {
  return (
    <Card className="space-y-1">
      <p className="text-xs text-[#4B4B4B]/80">{title}</p>
      <p className="text-xl font-semibold text-[#111111]">{value}</p>
    </Card>
  )
}

function DamageTable({ rows }: { rows: CostLineItem[] }) {
  if (!rows.length) {
    return <p className="text-sm text-[#4B4B4B]/80">No cost data yet. Upload an image to see results.</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px] text-left text-sm text-[#111111]">
        <thead className="text-[#4B4B4B]">
          <tr>
            <th className="py-2">Part</th>
            <th>Damage</th>
            <th>Severity</th>
            <th>Confidence Band</th>
            <th>Repair Action</th>
            <th className="text-right">Estimated Cost</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.part}-${row.damage_type}`} className="border-t border-[#111111]/8">
              <td className="py-2">{row.part}</td>
              <td>{row.damage_type}</td>
              <td>{row.severity_score}</td>
              <td>{row.severity_level}</td>
              <td>{row.repair_action}</td>
              <td className="text-right">
                {row.estimated_cost} {row.price_source === 'generic' ? 'INR' : ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
