import { Card } from '../components/ui/card'

export function HistoryPage() {
  return (
    <Card className="max-w-3xl">
      <h2 className="text-lg font-semibold text-[#111111]">History</h2>
      <p className="mt-2 text-sm text-[#4B4B4B]">
        History endpoints are not present in the current FastAPI contract. Share backend
        history API schema to enable fully backend-driven history/search/comparison views.
      </p>
    </Card>
  )
}
