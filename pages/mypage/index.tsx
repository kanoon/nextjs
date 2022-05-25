import Link from "next/link";

function MyPage() {
  console.log("MyPage rendering");
  return (
    <div>
      <h1>MyPage</h1>
      <h2>=== Route ===</h2>
      <Link href="/">
        <a>Back to Home</a>
      </Link>
    </div>
  );
}

export default MyPage;
