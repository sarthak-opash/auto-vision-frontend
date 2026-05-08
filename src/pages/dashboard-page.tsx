import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Hero3D } from '../components/Hero3D'
import { HowItWorks } from '../components/HowItWorks'
import { FeatureCards } from '../components/FeatureCards'

export function DashboardPage() {
  return (
    <main className="space-y-16">
      <section className="relative overflow-hidden pb-16 pt-12 sm:pb-24 sm:pt-20">
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col items-start text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-7 rounded-full border border-[#60176F]/15 bg-white/75 px-5 py-2 text-sm font-semibold text-[#60176F] backdrop-blur-xl"
              >
                Next-Gen Computer Vision
              </motion.div>

              <motion.h1
                className="mb-6 text-5xl font-bold tracking-tight text-[#111111] sm:text-6xl md:text-7xl leading-[1.1]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                Precision <span className="heading-gradient block">Damage Analytics</span>
              </motion.h1>

              <motion.p
                className="mb-10 max-w-xl text-lg leading-relaxed text-[#4B4B4B] sm:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Empower your insurance workflow with AI-driven vehicle assessment. Detect, classify, and estimate repair costs with industrial-grade accuracy.
              </motion.p>

              <motion.div
                className="flex flex-col gap-4 sm:flex-row w-full sm:w-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link
                  to="/upload"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#60176F] px-8 text-base font-semibold text-white shadow-[0_12px_24px_rgba(96,23,111,0.28)] transition-all hover:-translate-y-0.5"
                >
                  Analyze My Vehicle
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/upload"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-[#111111]/10 bg-white/70 px-8 text-base font-semibold text-[#111111] backdrop-blur-xl transition-all hover:bg-white"
                >
                  View Case Studies
                </Link>
              </motion.div>
            </div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="relative z-10 overflow-hidden rounded-[40px] border-8 border-white bg-white shadow-[0_40px_80px_-15px_rgba(96,23,111,0.25)]">
                <img 
                  src="/hero-car.png" 
                  alt="AutoVision Hero" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-[#60176F]/10 blur-3xl" />
              <div className="absolute -top-10 -left-10 h-64 w-64 rounded-full bg-[#60176F]/5 blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      <HowItWorks />
      <FeatureCards />

      <section className="pb-10 pt-4 sm:pb-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.h2
            className="mb-5 text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Scale Your Operations with <span className="text-[#60176F]">AutoVision</span>
          </motion.h2>
          <motion.p
            className="mb-10 text-lg leading-relaxed text-[#4B4B4B]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Join the network of enterprise insurers automating their claim lifecycle with high-fidelity visual intelligence.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              to="/upload"
              className="inline-flex h-14 items-center gap-2 rounded-2xl bg-[#60176F] px-8 text-base font-semibold text-white shadow-[0_12px_24px_rgba(96,23,111,0.28)] transition-all hover:-translate-y-0.5"
            >
              Register Organization
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
