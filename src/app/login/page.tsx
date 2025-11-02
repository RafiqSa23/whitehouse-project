import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="bg-[url(/Home.jpg)] flex min-h-svh flex-col items-center justify-center p-6 md:p-10 relative bg-center bg-cover">
      <div className="bg-black/30 absolute inset-0 z-0 backdrop-blur-xs"></div>
      <div className="w-full max-w-sm md:max-w-4xl z-10">
        <LoginForm />
      </div>
    </div>
  )
}
