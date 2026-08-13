import Link from "next/link";
import { BookOpen, Database, HelpCircle, Info, Search, ShieldCheck } from "lucide-react";
import { PRIMARY_SOURCE, SUPPORTING_SOURCES } from "@/lib/sources";

export function AmharicAboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">ስለ PostalEt</h1>
      <p className="mt-2 text-muted-foreground">
        PostalEt የኢትዮጵያ የፖስታ ኮዶችን በግልጽነትና በታማኝነት ለማግኘት የሚያስችል የመረጃ መድረክ ነው።
      </p>
      <p className="mt-3 text-muted-foreground">
        በኢትዮጵያ የፖስታ ኮድ ማግኘት ከሚገባው በላይ አስቸጋሪ ሊሆን ይችላል። መረጃው በተለያዩ ድረ-ገጾች ተበታትኖ ይገኛል፣ የተለያዩ ምንጮችም የማይጣጣሙ መረጃዎችን ሊያቀርቡ ይችላሉ።
      </p>
      <p className="mt-3 text-muted-foreground">
        PostalEt ይህን መረጃ በአንድ ቦታ ያሰባስባል። እያንዳንዱ የፖስታ ኮድ ከምንጮቹ፣ ከታማኝነት ደረጃው እና ከማረጋገጫ መረጃው ጋር ይቀርባል። በዚህም መልሱን ብቻ ሳይሆን መረጃው ምን ያህል ሊታመንበት እንደሚችልም ማወቅ ይችላሉ።
      </p>

      <div className="mt-10 space-y-10">
        <Section icon={<Info className="size-5" />} title="PostalEt ለምን ተፈጠረ?">
          <p>
            PostalEt የጀመረው ከቀላል ችግር ነው። በፍሪላንስ ስራዎች ላይ ስንሰራ እና የተለያዩ የመስመር ላይ ቅጾችን ስንሞላ፣ የኢትዮጵያ የፖስታ ኮድ ማስገባት አስፈልጎን ነበር። ነገር ግን ትክክለኛውን ኮድ ማግኘት እንደሚገባው ቀላል አልነበረም። መረጃው በተለያዩ ቦታዎች ተበትኖ ነበር፣ እና የትኛውን መረጃ ማመን እንደሚገባ ማወቅ አስቸጋሪ ነበር።
          </p>
          <p className="mt-3">
            ስለዚህ PostalEtን ገነባን፤ የኢትዮጵያ የፖስታ ኮድ መረጃ በቀላሉ የሚገኝበት፣ ምንጩ በግልጽ የሚታወቅበት እና መረጃው ምን ያህል እንደሚታመን ለማወቅ የሚያስችል ቦታ እንዲኖር።
          </p>
        </Section>

        <Section icon={<BookOpen className="size-5" />} title="የኢትዮጵያ የፖስታ ኮዶች ምንድን ናቸው?">
          <p>
            የኢትዮጵያ የፖስታ ኮዶች በኢትዮጵያ ፖስታ አገልግሎት የተመደቡ <strong>ባለአራት አሃዝ የቁጥር ኮዶች</strong> ናቸው። በአድራሻ ላይ ከአካባቢው ስም በፊት ይጻፋሉ።
          </p>

          <div className="mt-4 rounded-lg bg-muted/50 px-4 py-3 font-mono text-sm">
            <p className="text-muted-foreground">የአድራሻ ምሳሌ፦</p>
            <p className="mt-2">
              1000 ADDIS ABABA
              <br />
              ETHIOPIA
            </p>
          </div>

          <ul className="mt-3 list-inside list-disc space-y-1">
            <li>የመጀመሪያው አሃዝ ክልሉን ያመለክታል።</li>
            <li>ሁለተኛው አሃዝ በዚያ ክልል ያለውን ማዕከላዊ የፖስታ ቤት ያመለክታል።</li>
            <li>ሦስተኛውና አራተኛው አሃዝ የተወሰነውን የደረሰኝነት ቢሮ ያመለክታሉ።</li>
          </ul>
        </Section>

        <Section icon={<Info className="size-5" />} title="የፖስታ ኮዶች በኢትዮጵያ ምን ያገለግላሉ?">
          <p>
            በተግባር በኢትዮጵያ አድራሻ ሲጻፍ ከፖስታል ኮድ ይልቅ ክልል፣ ከተማ፣ ክፍለ ከተማ፣ ቀበሌ፣ የሚታወቁ መለያ ቦታዎች እና ስልክ ቁጥሮች የበለጠ ጥቅም ላይ ይውላሉ።
          </p>
          <p className="mt-3">
            የፖስታ ኮዶች በተለይ ለዓለም አቀፍ ጭነትና የሎጂስቲክስ አገልግሎቶች፣ የፖስታ ኮድ ማስገባት ለሚጠይቁ የመስመር ላይ ቅጾች፣ ለመንግሥትና ለተቋማት ደብዳቤዎች እና ለደብዳቤ ማድረሻ ሂደት ይጠቅማሉ።
          </p>
        </Section>

        <Section icon={<HelpCircle className="size-5" />} title="አንዳንድ አካባቢዎች የፖስታ ኮድ ለምን የላቸውም?">
          <ul className="list-inside list-disc space-y-1.5">
            <li>የኢትዮጵያ ፖስታ አገልግሎት ለአካባቢው እስካሁን ኮድ ላይመድብ ይችላል።</li>
            <li>ኮድ ቢኖርም በሕዝብ የሚደረስበት እና ልናረጋግጠው የምንችለው ምንጭ ላይታተም ይችላል።</li>
            <li>አካባቢው አነስተኛ ሰፈር፣ ቀበሌ ወይም የገጠር አካባቢ ሆኖ ከአሁኑ የፖስታ አገልግሎት መረብ ውጭ ሊሆን ይችላል።</li>
            <li>የተለያዩ ምንጮች የማይጣጣሙ መረጃዎችን ከሰጡ፣ አንድ ኮድ በበቂ እርግጠኝነት ማረጋገጥ ላይቻል ይችላል።</li>
          </ul>
          <p className="mt-3">
            የፖስታ ኮድ ሳይገኝ ሲቀር PostalEt ያልተረጋገጠ መረጃ ከማሳየት ይልቅ በግልጽ እንደማይገኝ ያሳውቃል።
          </p>
        </Section>

        <Section icon={<Search className="size-5" />} title="ፍለጋው እንዴት ይሰራል?">
          <p>
            በአካባቢ ስም፣ በከተማ፣ በዞን፣ በክልል ወይም በፖስታ ኮድ መፈለግ ይችላሉ። የፍለጋ ስርዓቱ ለተለያዩ የአጻጻፍ ልዩነቶች ተስማሚ ነው፤ ስለዚህ የቦታውን ስም ሙሉ በሙሉ ሳይጽፉ ወይም በትንሽ የአጻጻፍ ልዩነት ቢፈልጉትም ተዛማጅ ውጤቶችን ለማግኘት ይሞክራል።
          </p>
          <p className="mt-3">
            አንድ አካባቢ ሲያገኙ የፖስታ ኮዱን (ካለ)፣ የመረጃውን ታማኝነት ደረጃ፣ ያንን ኮድ የሚጠቅሱ ምንጮችን እና እያንዳንዱ ምንጭ ለመጨረሻ ጊዜ የተረጋገጠበትን ጊዜ ማየት ይችላሉ።
          </p>
        </Section>

        <Section icon={<ShieldCheck className="size-5" />} title="ለትክክለኛነትና ግልጽነት ያለን ቁርጠኝነት">
          <p>
            ብዙ የኢትዮጵያ የፖስታ ኮድ ድረ-ገጾች መረጃን ከአንዱ ወደ ሌላው ይቀዳሉ። ይህም አንድ የፖስታ ኮድ በእርግጥ ትክክል መሆኑን ማረጋገጥ አስቸጋሪ ያደርገዋል።
          </p>
          <ul className="mt-3 list-inside list-disc space-y-1.5">
            <li>
              <strong>እያንዳንዱ የፖስታ ኮድ እንደ መረጃ ይቆጠራል፣ እንደ ፍጹም እውነት አይቀርብም።</strong>{" "}
              መረጃውን የሰጠውን ምንጭ ሁልጊዜ እናሳያለን።
            </li>
            <li>
              <strong>የፖስታ ኮድ አንገምትም፣ አንፈጥርም።</strong>{" "}
              በሚገኙን ምንጮች ማረጋገጥ ካልቻልን በግልጽ እንገልጻለን።
            </li>
            <li>
              <strong>ምንጮች ሁልጊዜ ይታያሉ።</strong>{" "}
              እያንዳንዱ የፖስታ ኮድ ገጽ ዋናውን ምንጭና ተጨማሪ ማጣቀሻዎችን ያሳያል።
            </li>
            <li>
              <strong>የታማኝነት ደረጃ በማስረጃ ይወሰናል።</strong>{" "}
              ደረጃው የተመሠረተው በተገኙ ገለልተኛ ምንጮች ብዛትና መረጃዎቹ በመካከላቸው በመስማማታቸው ላይ ነው።
            </li>
            <li>
              <strong>አካባቢ ከፖስታ ኮድ በተለየ ሁኔታ ይኖራል።</strong>{" "}
              የፖስታ ኮዱን ባናውቅም አንድ ቦታ በPostalEt ላይ ሊዘረዘር ይችላል።
            </li>
            <li>
              <strong>በመላው ድረ-ገጽ ተመሳሳይ የመረጃ መሠረት እንጠቀማለን።</strong>{" "}
              በፍለጋ ውጤቶች፣ በፖስታ ኮድ ገጾች እና በመረጃ ገጾች ላይ ተመሳሳይ የተረጋገጡ ምንጮች ይጠቀማሉ።
            </li>
          </ul>
        </Section>

        <div id="sources">
          <Section icon={<Database className="size-5" />} title="የመረጃ ምንጮቻችን">
            <p>
              PostalEt በይፋ የሚገኙ የፖስታ ኮድ መረጃ ማውጫዎችን በመጠቀም በተቻለ መጠን የታመነ መረጃ ለማቅረብ ይሞክራል። ዋና ምንጫችንን ከተጨማሪ የማጣቀሻ ምንጮች እንለያለን።
            </p>

            <p className="mt-4 font-medium">ዋና ምንጭ</p>
            <a
              href={PRIMARY_SOURCE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block font-medium underline"
            >
              {PRIMARY_SOURCE.name}
            </a>

            <p className="mt-4 font-medium">ተጨማሪ የማጣቀሻ ምንጮች</p>
            <div className="mt-3 space-y-2">
              {SUPPORTING_SOURCES.map((source) => (
                <a
                  key={source.url}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm underline"
                >
                  {source.name}
                </a>
              ))}
            </div>

            <p className="mt-4">
              እነዚህ ተጨማሪ ምንጮች ከዋናው ምንጫችን ጋር በአብዛኛው የሚጣጣሙ መረጃዎችን ይይዛሉ። እነዚህን ምንጮች ማካተታችን ዋና ዓላማው የመረጃውን ምንጭ ግልጽ ለማድረግና ተጨማሪ ማረጋገጫ ለማቅረብ ነው።
            </p>
          </Section>
        </div>

        <Section icon={<HelpCircle className="size-5" />} title="የፖስታ ኮድ ካልተገኘ ምን ማድረግ አለብኝ?">
          <ol className="list-inside list-decimal space-y-2">
            <li>
              <strong>በቀጥታ የኢትዮጵያ ፖስታ አገልግሎትን ያነጋግሩ።</strong>{" "}
              የፖስታ ኮድ ምደባን በተመለከተ ዋናው የመረጃ ምንጭ እነሱ ናቸው።
            </li>
            <li>
              <strong>በአቅራቢያዎ ያለ ትልቅ ከተማ የፖስታ ኮድ እንዳለው ይመልከቱ።</strong>{" "}
              አነስተኛ ሰፈሮች ወይም ሰፈራዎች ከአቅራቢያቸው ካለ የፖስታ ማድረሻ ቢሮ ጋር አንድ ኮድ ሊጋሩ ይችላሉ።
            </li>
            <li>
              <strong>የአካባቢውን አጠቃላይ ኮድ እንደ አማራጭ ይጠቀሙ።</strong>{" "}
              ለምሳሌ፣ የአዲስ አበባ አጠቃላይ የፖስታ ኮድ <strong>1000</strong> ነው።
            </li>
          </ol>

          <h3 className="mt-5 font-semibold">ስለ ምትክ የፖስታ ኮዶች</h3>
          <p className="mt-2">
            አንዳንድ የዓለም አቀፍ ድረ-ገጾች፣ የጭነት አገልግሎቶች እና የመስመር ላይ አገልግሎቶች የፖስታ ኮድ በግዴታ እንዲሞላ ሊጠይቁ ይችላሉ።
          </p>
          <p className="mt-3">
            በእንደዚህ ያሉ ሁኔታዎች <strong>1000</strong> (አዲስ አበባ) ወይም <strong>0000</strong> ያሉ ቁጥሮች አንዳንድ ጊዜ እንደ ምትክ ይጠቀማሉ።
          </p>
          <p className="mt-3">
            <strong>ነገር ግን እነዚህ ይፋዊ የፖስታ ኮዶች አይደሉም።</strong>{" "}
            ስለዚህ በሁሉም ድረ-ገጾች ወይም አገልግሎቶች ላይ እንደሚቀበሉ ዋስትና የለም።
          </p>
        </Section>

        <Section icon={<Info className="size-5" />} title="ገደቦቻችን">
          <p>
            PostalEt በይፋ ከሚገኙ ምንጮች የተሰበሰበ የመረጃ መድረክ ነው። ስለዚህ ሊኖሩት የሚችሉ ገደቦች አሉ።
          </p>
          <ul className="mt-3 list-inside list-disc space-y-1.5">
            <li>የእኛ መረጃ ቋት በኢትዮጵያ ያሉ ሁሉንም ሰፈሮችና አካባቢዎች አያካትትም። በተለይም የገጠር አካባቢዎችና አነስተኛ ሰፈሮች ሊጎድሉ ይችላሉ።</li>
            <li>የፖስታ ኮድ ምደባዎች በጊዜ ሊቀየሩ ይችላሉ። በአንድ ወቅት ትክክል የነበረ መረጃ ከጊዜ በኋላ ሊለወጥ ይችላል።</li>
            <li>እኛ የምንመረኮዘው በይፋ በሚገኝ መረጃ ላይ ነው። በፖስታ አገልግሎት ውስጥ ያሉ ነገር ግን በይፋ ያልተለቀቁ መዝገቦች ሊኖሩ ይችላሉ።</li>
            <li>PostalEt ከኢትዮጵያ ፖስታ አገልግሎት ወይም ከማንኛውም የመንግሥት ተቋም ጋር የተቆራኘ አይደለም። ለይፋዊ ጉዳዮች በቀጥታ የኢትዮጵያ ፖስታ አገልግሎትን ያነጋግሩ።</li>
          </ul>
        </Section>

        <Section icon={<ShieldCheck className="size-5" />} title="ተልዕኳችን">
          <p>
            የኢትዮጵያ የፖስታ ኮድ መረጃ በቀላሉ የሚገኝ፣ ግልጽ እና የታመነ እንዲሆን ማድረግ የPostalEt ተልዕኳ ነው።
          </p>
          <p className="mt-3">
            የማናረጋግጠውን መረጃ ከማቅረብ ይልቅ <strong>“አናውቅም” ማለት ይሻላል</strong> ብለን እናምናለን። በPostalEt ላይ የምናደርገው እያንዳንዱ ማሻሻያ ይህንን መርህ ይከተላል።
          </p>
        </Section>

        <div className="border-t border-border pt-8 text-center">
          <Link href="/am" className="text-sm font-medium underline underline-offset-4">
            የፖስታል ኮዶችን ይፈልጉ
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center gap-2.5">
        <span className="text-muted-foreground">{icon}</span>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="mt-3 text-[0.938rem] leading-relaxed text-foreground/90">
        {children}
      </div>
    </section>
  );
}