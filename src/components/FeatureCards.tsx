import { FileText, Gauge, IndianRupee, Scan, Shield, Zap } from 'lucide-react'
import { Card } from './ui/card'

const features = [
  {
    icon: <Shield className="h-6 w-6 text-[#60176F]" />,
    title: 'Advanced Detection',
    description:
      'High-precision identification of bumper, headlight, door, hood, and fender anomalies using neural networks.',
  },
  {
    icon: <IndianRupee className="h-6 w-6 text-[#60176F]" />,
    title: 'Financial Intelligence',
    description:
      'Dynamic repair cost estimation calibrated against real-world market labor rates and part indices.',
  },
  {
    icon: <Scan className="h-6 w-6 text-[#60176F]" />,
    title: 'Visual Verification',
    description: 'Instant visualization of detected defects with high-fidelity bounding boxes and metadata overlays.',
  },
  {
    icon: <Gauge className="h-6 w-6 text-[#60176F]" />,
    title: 'Severity Quantification',
    description: 'Scientific scoring of damage magnitude to prioritize claims and automate approval workflows.',
  },
  {
    icon: <FileText className="h-6 w-6 text-[#60176F]" />,
    title: 'Automated Reports',
    description: 'Generate comprehensive, audit-ready PDF documentation for seamless integration with insurance systems.',
  },
  {
    icon: <Zap className="h-6 w-6 text-[#60176F]" />,
    title: 'Enterprise Velocity',
    description: 'Industrial-grade inference pipeline delivering complex multi-stage analysis in milliseconds.',
  },
]

export function FeatureCards() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 space-y-4 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-[#111111] sm:text-5xl">
            Platform Capabilities
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#4B4B4B]">
            Our proprietary visual intelligence engine provides end-to-end automation for automotive claim lifecycles.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="hover-lift border-white/75" spacing="roomy">
              <div className="mb-6 inline-flex rounded-2xl bg-[#60176F]/8 p-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold tracking-tight text-[#111111]">{feature.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-[#4B4B4B]">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
