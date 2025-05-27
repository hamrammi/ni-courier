import NavBar from '@/components/navbar'

export default async function WithStoreIdLayout ({
  children,
  params
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ storeId: string }>
}>) {
  const storeId = Number((await params).storeId)
  return (
    <>
      <NavBar storeId={storeId} />
      <div className="p-4">{children}</div>
    </>
  )
}
