import { useUserContext } from "@/context/authContext"
import { Models } from "appwrite"
import { Link } from "react-router-dom"

type GridPostListProps = {
  posts: Models.Document[]
}

const GridPostList = ({ posts }: GridPostListProps) => {
  const { user } = useUserContext();
  return (
    <ul className="grid-container">
      {posts.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80">
          <Link>
            <img 
            src={post.imageUrl}/>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default GridPostList