import { create } from 'zustand'
import type { CostEstimationResponse, PredictResponse, SeverityResponse, UploadResponse } from '../types/api'

interface DetectionState {
  file: File | null
  previewUrl: string | null
  upload: UploadResponse | null
  predict: PredictResponse | null
  severity: SeverityResponse | null
  cost: CostEstimationResponse | null
  setFile: (file: File, previewUrl: string) => void
  setResults: (payload: {
    upload: UploadResponse
    predict: PredictResponse
    severity: SeverityResponse
    cost: CostEstimationResponse
  }) => void
  clear: () => void
}

export const useDetectionStore = create<DetectionState>((set) => ({
  file: null,
  previewUrl: null,
  upload: null,
  predict: null,
  severity: null,
  cost: null,
  setFile: (file, previewUrl) => set({ file, previewUrl }),
  setResults: (payload) => set(payload),
  clear: () =>
    set({
      file: null,
      previewUrl: null,
      upload: null,
      predict: null,
      severity: null,
      cost: null,
    }),
}))
