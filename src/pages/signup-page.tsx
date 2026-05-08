import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Input } from '../components/ui/input'

export function SignupPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md items-center px-4">
      <Card className="w-full space-y-6" spacing="roomy">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-[#111111]">Create Account</h1>
          <p className="text-sm text-[#4B4B4B]">Join the future of automotive assessment</p>
        </div>
        
        <div className="space-y-4">
          <Input placeholder="Full Name" />
          <Input placeholder="Email Address" type="email" />
          <Input placeholder="Password" type="password" />
        </div>

        <Button className="w-full" size="lg" type="button">
          Get Started
        </Button>

        <p className="text-center text-sm text-[#4B4B4B]">
          Already have an account?{' '}
          <Link className="font-semibold text-[#60176F] hover:underline" to="/login">
            Login
          </Link>
        </p>

        <div className="rounded-2xl border border-[#60176F]/12 bg-[#60176F]/6 p-4">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#4B4B4B]">System Note</p>
          <p className="text-xs leading-relaxed text-[#4B4B4B]/80">
            Signup schema is pending backend contract. Registration flow will be finalized once endpoints are available.
          </p>
        </div>
      </Card>
    </div>
  )
}
