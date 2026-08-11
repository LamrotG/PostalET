import Link from "next/link";
import { BookOpen, Database, HelpCircle, Info, Search, ShieldCheck } from "lucide-react";
import { PRIMARY_SOURCE, SUPPORTING_SOURCES } from "@/lib/sources";

export function AmharicAboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">ስለ PostalEt</h1>
      <p className="mt-2 text-muted-foreground">PostalEt ለኢትዮጵያ የፖስታ ኮዶች ግልጽነትን የሚያስቀድም መዝገብ ነው።</p>
      <p className="mt-3 text-muted-foreground">በኢትዮጵያ የፖስታ ኮድ ማግኘት አስቸጋሪ ሊሆን ይችላል። መረጃዎች በተለያዩ ድረ ገጾች ተበትነዋል፣ ምንጮችም ብዙ ጊዜ ይለያያሉ።</p>
      <p className="mt-3 text-muted-foreground">PostalEt ይህን መረጃ በአንድ ቦታ ያቀርባል፤ እያንዳንዱ ኮድ በምንጮቹ፣ በእምነት ደረጃው እና በማረጋገጫ ዝርዝሮቹ ይደገፋል።</p>

      <div className="mt-10 space-y-10">
        <Section icon={<Info className="size-5" />} title="PostalEt ለምን ተፈጠረ?">
          <p>PostalEt የተጀመረው ከቀላል ችግኝ ነው። የፖስታ ኮድ ሲያስፈልግ የሚታመን መረጃ ማግኘት አልቀላልም ነበር።</p>
          <p className="mt-3">ስለዚህ የኢትዮጵያ የፖስታ ኮድ መረጃ በቀላሉ የሚገኝ፣ ግልጽ እና በምንጮች የተደገፈ ቦታ ፈጠርን።</p>
        </Section>
        <Section icon={<BookOpen className="size-5" />} title="የኢትዮጵያ የፖስታ ኮዶች ምንድን ናቸው?">
          <p>የኢትዮጵያ የፖስታ ኮዶች በኢትዮጵያ ፖስታ ሰርቪስ የሚሰጡ <strong>ባለ 4 አሃዝ ቁጥሮች</strong> ናቸው።</p>
          <div className="mt-4 rounded-lg bg-muted/50 px-4 py-3 font-mono text-sm"><p className="text-muted-foreground">የአድራሻ ምሳሌ:</p><p className="mt-2">1000 ADDIS ABABA<br />ETHIOPIA</p></div>
          <ul className="mt-3 list-inside list-disc space-y-1"><li>የመጀመሪያው አሃዝ ክልሉን ያመለክታል።</li><li>ሁለተኛው አሃዝ ዋናውን የፖስታ ቤት ያሳያል።</li><li>የመጨረሻዎቹ አሃዞች የመላኪያ ቢሮውን ይለያሉ።</li></ul>
        </Section>
        <Section icon={<Info className="size-5" />} title="የፖስታ ኮዶች እንዴት ይጠቀማሉ?">
          <p>በተግባር የኢትዮጵያ አድራሻዎች በክልል፣ በከተማ፣ በክፍለ ከተማ፣ በቀበሌ፣ በምልክት ቦታ እና በስልክ ቁጥር የበለጠ ይተማመናሉ። የፖስታ ኮዶች በተለይ ለዓለም አቀፍ መላኪያ፣ ለመስመር ላይ ቅጾች እና ለደብዳቤ መላኪያ ይጠቅማሉ።</p>
        </Section>
        <Section icon={<HelpCircle className="size-5" />} title="አንዳንድ ቦታዎች የፖስታ ኮድ ለምን የላቸውም?">
          <ul className="list-inside list-disc space-y-1.5"><li>ለቦታው ኮድ ገና አልተመደበም ሊሆን ይችላል።</li><li>ኮድ ቢኖርም ሊረጋገጥ በሚችል የህዝብ ምንጭ ውስጥ አልታተመም ሊሆን ይችላል።</li><li>ምንጮች ሊለያዩ ስለሚችሉ አንድ ኮድ ማረጋገጥ አይቻልም።</li></ul>
        </Section>
        <Section icon={<Search className="size-5" />} title="ፍለጋው እንዴት ይሰራል?">
          <p>በቦታ ስም፣ በከተማ፣ በዞን፣ በክልል ወይም በፖስታ ኮድ መፈለግ ይችላሉ። የቦታ ገጹ ኮዱን፣ የእምነት ደረጃውን፣ ምንጮቹን እና የማረጋገጫ ቀኑን ያሳያል።</p>
        </Section>
        <Section icon={<ShieldCheck className="size-5" />} title="ለትክክለኛነት እና ግልጽነት ያለን ቁርጠኝነት">
          <p>እያንዳንዱን የፖስታ ኮድ እንደ ምንጭ ጥያቄ እናቀርባለን፤ ኮድ አንገምትም፣ አንፈጥርም። መረጃው ሊረጋገጥ ካልቻለ ያንን በግልጽ እናሳያለን።</p>
        </Section>
        <div id="sources"><Section icon={<Database className="size-5" />} title="የመረጃ ምንጮች">
          <p>PostalEt የህዝብ የፖስታ ኮድ ማውጫዎችን ይጠቀማል።</p>
          <a href={PRIMARY_SOURCE.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-medium underline">{PRIMARY_SOURCE.name}</a>
          <div className="mt-3 space-y-2">{SUPPORTING_SOURCES.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="block text-sm underline">{source.name}</a>)}</div>
        </Section></div>
        <Section icon={<ShieldCheck className="size-5" />} title="ተልዕኳችን"><p>የኢትዮጵያ የፖስታ ኮድ መረጃን ክፍት፣ ግልጽ እና ታማኝ ማድረግ ተልዕኳችን ነው።</p></Section>
        <div className="border-t border-border pt-8 text-center"><Link href="/am" className="text-sm font-medium underline underline-offset-4">የፖስታ ኮዶችን ይፈልጉ</Link></div>
      </div>
    </div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return <section><div className="flex items-center gap-2.5"><span className="text-muted-foreground">{icon}</span><h2 className="text-lg font-semibold">{title}</h2></div><div className="mt-3 text-[0.938rem] leading-relaxed text-foreground/90">{children}</div></section>;
}
