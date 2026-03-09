import type { Metadata } from "next";

import { LegalPageShell } from "@/components/legal-page-shell";

export const metadata: Metadata = {
  title: "Disclaimer - 星语",
  description: "星语免责声明，说明运势内容的娱乐性质与责任边界。",
};

export default function DisclaimerPage() {
  return (
    <LegalPageShell
      title="免责声明"
      updatedAt="2026-03-09"
      description="为了避免误解，以下内容明确说明星语站点的内容边界、适用场景和责任限制。"
    >
      <h2>1. 内容仅供娱乐参考</h2>
      <p>
        星语展示的星座运势、匹配建议和倾向性解读仅用于娱乐与灵感参考，不应被视为对现实结果的承诺，也不应代替你基于事实作出的独立判断。
      </p>

      <h2>2. 不构成专业意见</h2>
      <p>
        本站内容不构成医疗、心理、法律、财务、投资或其他专业意见。如你需要作出重要决策，应咨询相应领域的持证专业人士。
      </p>

      <h2>3. 关于准确性</h2>
      <p>
        我们会尽力维护内容与数据更新，但无法保证所有日期、文本或第三方来源数据始终完整、及时和无误。站点可能因数据缺失而自动回退到最近可用日期。
      </p>

      <h2>4. 关于可用性</h2>
      <p>
        我们不保证网站始终可访问，也不保证兼容所有设备、浏览器或网络环境。因维护、托管波动或第三方服务异常导致的不可用情况，本站不承担赔偿责任。
      </p>

      <h2>5. 用户自担判断责任</h2>
      <p>
        你应自行判断是否采纳站点中的任何内容。无论是日常安排、情感互动还是职业决策，最终责任均由使用者本人承担。
      </p>
    </LegalPageShell>
  );
}
