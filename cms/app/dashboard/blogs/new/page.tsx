import PostForm from "@/components/PostForm";

export default function NewPostPage() {
  return (
    <div>
      <h2 className="text-xl font-black uppercase tracking-tight mb-6">New Post</h2>
      <PostForm mode="new" />
    </div>
  );
}
