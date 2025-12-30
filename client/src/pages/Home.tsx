import { Link } from "wouter";
import { useAlgorithms } from "@/hooks/use-algorithms";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Network, Search, GitGraph } from "lucide-react";
import clsx from "clsx";

const CategoryIcon = ({ category }: { category: string }) => {
  switch (category.toLowerCase()) {
    case 'sorting': return <BarChart3 className="w-6 h-6 text-blue-400" />;
    case 'graph': return <Network className="w-6 h-6 text-purple-400" />;
    case 'searching': return <Search className="w-6 h-6 text-green-400" />;
    case 'pathfinding': return <GitGraph className="w-6 h-6 text-orange-400" />;
    default: return <BarChart3 className="w-6 h-6" />;
  }
};

export default function Home() {
  const { data: algorithms, isLoading, error } = useAlgorithms();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-background to-background/50">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-white mb-6">
              Under the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Hood</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light mb-10 max-w-2xl">
              Interactive visualizations for computer science algorithms. Watch code come to life step-by-step.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Algorithms Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold font-display">Algorithms</h2>
          <div className="h-px flex-1 bg-white/10 ml-8" />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-card/50 rounded-2xl animate-pulse border border-white/5" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-red-500/10 rounded-3xl border border-red-500/20">
            <p className="text-red-400 font-mono">Failed to load algorithms. Is the backend running?</p>
          </div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {algorithms?.map((algo) => (
              <motion.div key={algo.id} variants={item}>
                <Link href={`/visualize/${algo.id}`} className="block h-full group">
                  <div className="h-full bg-card rounded-2xl p-6 border border-white/5 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-white/5 rounded-xl group-hover:bg-primary/20 transition-colors">
                          <CategoryIcon category={algo.category} />
                        </div>
                        <span className="text-xs font-mono font-medium text-muted-foreground bg-white/5 px-2 py-1 rounded-md uppercase tracking-wider">
                          {algo.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                        {algo.name}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-6 h-10">
                        {algo.description}
                      </p>

                      <div className="flex items-center text-sm font-mono text-muted-foreground group-hover:text-white transition-colors">
                        <span>Visualize</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
