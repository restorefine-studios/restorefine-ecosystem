import PortfolioForm from "@/components/PortfolioForm";

export default function NewProjectPage() {
  return (
    <div>
      <h2 className="text-xl font-black uppercase tracking-tight mb-6">New Project</h2>
      <PortfolioForm mode="new" />
    </div>
  );
}
