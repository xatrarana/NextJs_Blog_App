import Link from "next/link";
import { BookOpenCheck, Plus } from 'lucide-react';
export default function NavBar() {
  return (
    <div className="navbar bg-base-100 sticky top-0 z-10 ">
     <div className="container ">
     <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost text-xl">
        <BookOpenCheck  color="purple" />
        </Link>
      </div>
      <div className="flex-none">
        <Link href={'/create'} className="btn btn-ghost dark:text-white">
        <Plus className="hidden md:block" size={19} /> Create Post
        </Link>
      </div>
     </div>
    </div>
  );
}
