import PostCard from '@/components/PostCard'
import { db } from '@/libs/db'

export default async function Home() {
  const posts = await getPostData()
  return (
    <main className='w-full  grid md:place-content-center md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5 p-1 overflow-hidden'>
       {posts.map((post)=>{
          return <PostCard key={post.id} post={post}/>
       })}
    </main>
  )
}

export async function getPostData(){
  const res = await db.post.findMany({
    select:{
      id:true,
      title:true,
      content:true,
      tag:true,
    },
    orderBy:{
      createdAt:'desc'
    }
  })
  return res
}