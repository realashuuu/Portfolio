import { Compass, Globe, Server, Cloud, Cpu, ArrowUpRight } from "lucide-react";

export default function FutureDirection() {
  return (
    <section id="future-direction" aria-label="Future Career Aspirations & Learning Roadmap" className="py-28 px-6 md:px-12 bg-white">
      <div className="inner">
        {/* Section Header */}
        <div className="mb-14">
          <div className="eyebrow">Aspirations</div>
          <h2 className="st">
            The Engineering Path <span className="gr">Ahead</span>
          </h2>
          <p className="stxt">
            Continuous learning frontiers and engineering goals separating current working proficiency
            from future technical horizons.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Distributed Systems */}
          <div className="bg-surface border border-border rounded-[24px] p-7 space-y-4 hover:border-brand-violet/50 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-white border border-border flex items-center justify-center text-brand-violet shadow-sm">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[0.65rem] font-mono uppercase tracking-wider text-brand-violet font-bold block mb-1">
                SYSTEM ARCHITECTURE
              </span>
              <h3 className="text-xl font-display font-bold text-ink">
                Distributed Systems &amp; Concurrency
              </h3>
            </div>
            <p className="text-xs text-ink-2 leading-relaxed font-sans">
              Deepening knowledge of event brokers (Kafka/RabbitMQ), high-throughput message streaming,
              database partitioning, and distributed caching strategies.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border">
              {["System Design", "Kafka", "Distributed Cache", "Microservices"].map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: Cloud Infrastructure */}
          <div className="bg-surface border border-border rounded-[24px] p-7 space-y-4 hover:border-brand-violet/50 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-white border border-border flex items-center justify-center text-brand-cyan shadow-sm">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[0.65rem] font-mono uppercase tracking-wider text-brand-cyan font-bold block mb-1">
                CLOUD &amp; INFRASTRUCTURE
              </span>
              <h3 className="text-xl font-display font-bold text-ink">
                Cloud Native &amp; DevOps Pipelines
              </h3>
            </div>
            <p className="text-xs text-ink-2 leading-relaxed font-sans">
              Mastering container orchestration with Docker and Kubernetes, Infrastructure as Code with Terraform,
              and enterprise cloud deployments on AWS and Azure.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border">
              {["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD"].map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Card 3: Systems Languages */}
          <div className="bg-surface border border-border rounded-[24px] p-7 space-y-4 hover:border-brand-violet/50 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-white border border-border flex items-center justify-center text-brand-emerald shadow-sm">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[0.65rem] font-mono uppercase tracking-wider text-brand-emerald font-bold block mb-1">
                SYSTEMS &amp; AGENTIC AI
              </span>
              <h3 className="text-xl font-display font-bold text-ink">
                Go &amp; Agentic AI Workflows
              </h3>
            </div>
            <p className="text-xs text-ink-2 leading-relaxed font-sans">
              Building ultra-fast microservices with Go (Golang), vector embedding storage, RAG pipelines,
              and autonomous multi-agent software patterns.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border">
              {["Go (Golang)", "Vector DBs", "RAG Systems", "AI Agents"].map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Global Outlook Banner */}
        <div className="mt-8 bg-surface border border-border rounded-[24px] p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white border border-border flex items-center justify-center text-brand-violet flex-shrink-0 shadow-sm">
              <Globe className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[0.68rem] font-mono uppercase tracking-widest text-muted font-bold">
                GLOBAL PERSPECTIVE &amp; CAREER EXPANSION
              </span>
              <h4 className="text-lg font-display font-bold text-ink">
                Collaborating with International Teams &amp; Exploring UAE / Gulf Tech Hubs
              </h4>
              <p className="text-xs text-ink-2 font-sans max-w-2xl leading-relaxed">
                Open to software engineering roles across India and international markets, with a dedicated
                focus on the thriving tech and software product sectors in Dubai, Abu Dhabi, and the Gulf region.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-sans font-bold text-white bg-ink hover:bg-brand-violet transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>Connect with Me</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
