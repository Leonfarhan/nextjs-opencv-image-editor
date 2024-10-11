import ImageEditor from "@/components/ImageEditor";

export default function Home(){
  return (
      <main className='flex h-screen flex-col items-center justify-between bg-gradient-to-r from-purple-500 to-indigo-500'>
          <ImageEditor/>
      </main>
  )
}