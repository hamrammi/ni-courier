import NavBar from '@/components/navbar'

export default function OrdersLayout ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col w-full lg:w-96 bg-slate-100 min-h-screen">
      <NavBar />
      <div className="p-4">{children}</div>
    </div>
  )
}
