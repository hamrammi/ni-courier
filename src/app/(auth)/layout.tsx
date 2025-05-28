export default function MainLayout ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col w-full lg:w-96 bg-gradient-to-b from-violet-200 to bg-rose-100 via-slate-100 min-h-screen">
      {children}
    </div>
  )
}
