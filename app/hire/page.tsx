export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  console.log(params, searchParams)
  return <h1>My Page</h1>
}
