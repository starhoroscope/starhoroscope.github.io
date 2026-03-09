import { Moon, Sun, Stars } from "lucide-react";

const steps = [
  {
    icon: Stars,
    title: "选择你的星座",
    description: "根据你的出生日期，从星盘中选择你的星座，解锁专属的宇宙洞察。",
  },
  {
    icon: Moon,
    title: "阅读你的运势",
    description:
      "深入你的每日运势解读，涵盖爱情、事业和个人成长，由当前星象排列所指引。",
  },
  {
    icon: Sun,
    title: "拥抱这一天",
    description:
      "运用宇宙的指引，带着自信、觉察和与宇宙能量的和谐来度过这一天。",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative px-4 py-20">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground tracking-tight text-balance">
            {"使用指南"}
          </h2>
          <p className="max-w-lg text-muted-foreground font-sans leading-relaxed">
            {"你的星际之旅，从简单的一步开始。"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="flex flex-col items-center gap-4 p-8 text-center rounded-2xl border border-border bg-card/50 backdrop-blur-sm"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 border border-primary/20">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs font-sans text-muted-foreground tracking-widest">
                {"第"}
                {i + 1}
                {"步"}
              </span>
              <h3 className="font-serif text-xl text-foreground">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
