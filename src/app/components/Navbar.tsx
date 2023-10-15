import Link from "next/link";

const Navbar: React.FC = () => {
    return(
        <div className="flex gap-x-3">
            <Link href={'/'} className="text-white font-bold border border-white px-3 py-1 rounded-xl ">POST</Link>
            <Link href={'/user'} className="text-white font-bold border border-white px-3 py-1 rounded-xl ">USER</Link>
        </div>
    )
}

export default Navbar;