import { Header } from "@ai-whisperers/sections"
import { Footer } from "@ai-whisperers/sections"
export default function Home() { return (
  <main>
    <Header businessName="My Business" navItems={[{label:"Inicio",href:"/"}]} />
    <div className="flex min-h-[60vh] items-center justify-center bg-background">
      <div className="text-center"><h1 className="text-4xl font-bold text-foreground">Under Construction</h1><p className="mt-4 text-muted-foreground">Coming soon.</p></div>
    </div>
    <Footer businessName="My Business" columns={[]} />
  </main>
) }
