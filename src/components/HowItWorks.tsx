import { Bot, FileText, Upload } from 'lucide-react'
import { Card } from './ui/card'

const items = [
  {
    index: 1,
    icon: <Upload className="h-6 w-6 text-[#60176F]" />,
    title: 'Evidence Submission',
    description: 'Securely upload high-resolution imagery of the vehicle damage through our portal.',
  },
  {
    index: 2,
    icon: <Bot className="h-6 w-6 text-[#60176F]" />,
    title: 'Neural Processing',
    description: 'Our computer vision models identify anomalies, classify parts, and assess severity.',
  },
  {
    index: 3,
    icon: <FileText className="h-6 w-6 text-[#60176F]" />,
    title: 'Instant Estimation',
    description: 'Receive a comprehensive repair cost report and visual audit trail within seconds.',
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-14 text-center text-4xl font-bold tracking-tight text-[#111111] sm:text-5xl">
          Streamlined Workflow
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <Card
              key={item.index}
              className="hover-lift border-white/75 text-center"
              spacing="roomy"
            >
              <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#60176F] text-lg font-bold text-white shadow-[0_10px_20px_rgba(96,23,111,0.25)]">
                {item.index}
              </div>
              <div className="mx-auto mb-6 inline-flex rounded-2xl bg-[#60176F]/8 p-4">{item.icon}</div>
              <h3 className="text-2xl font-semibold tracking-tight text-[#111111]">{item.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-[#4B4B4B]">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
