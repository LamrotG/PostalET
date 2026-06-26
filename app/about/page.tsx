import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Info, ShieldCheck, Search, HelpCircle, BookOpen, Database } from "lucide-react";
import { PRIMARY_SOURCE, SUPPORTING_SOURCES } from "@/lib/sources";

export const metadata: Metadata = {
  title: "About & Help",
  description:
    "Learn about Ethiopian postal codes, how PostalEt works, and what to do when a postal code is unavailable. A transparency-first postal code directory.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">
        About PostalEt
      </h1>
      <p className="mt-2 text-muted-foreground">
        A transparency-first Ethiopian postal code directory. We always show
        where data comes from, how confident we are, and what is unknown.
      </p>

      <div className="mt-10 space-y-10">
        {/* What are Ethiopian postal codes */}
        <Section
          icon={<BookOpen className="size-5" />}
          title="What are Ethiopian postal codes?"
        >
          <p>
            Ethiopian postal codes (postcodes) are <strong>4-digit numeric
            codes</strong> assigned by the Ethiopian Postal Service. They are
            placed to the left of the locality name in an address.
          </p>
          <div className="mt-4 rounded-lg bg-muted/50 px-4 py-3 font-mono text-sm">
            <p className="text-muted-foreground">Example address:</p>
            <div className="mt-2 space-y-0.5">
              <p>Mr. Abebe Bekele</p>
              <p>P.O. Box 1519</p>
              <p><strong>1000</strong> ADDIS ABABA</p>
              <p>ETHIOPIA</p>
            </div>
          </div>
          <p className="mt-4">
            Each digit in the code carries meaning:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>
              <strong>First digit</strong> — identifies the region
            </li>
            <li>
              <strong>Second digit</strong> — identifies the central post
              office within that region
            </li>
            <li>
              <strong>Third and fourth digits</strong> — identify the
              specific delivery office
            </li>
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            Source: Universal Postal Union (UPU), Ethiopian postal addressing
            guide.
          </p>
        </Section>

        {/* How postal codes are used */}
        <Section
          icon={<Info className="size-5" />}
          title="How are postal codes used in Ethiopia?"
        >
          <p>
            In practice, Ethiopian addresses rely more heavily on{" "}
            <strong>regions, cities, sub-cities (kifle ketemas), kebeles,
            landmarks, and phone numbers</strong> than on postal codes. Many
            Ethiopians navigate using landmarks and local references rather than
            formal postal codes.
          </p>
          <p className="mt-3">
            Postal codes are primarily used by:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>International shipping and logistics services</li>
            <li>Online forms that require a postal code field</li>
            <li>Government and institutional correspondence</li>
            <li>The Ethiopian Postal Service (EPS) for mail routing</li>
          </ul>
          <p className="mt-3">
            Because everyday navigation does not depend on postal codes, many
            people in Ethiopia may not know their postal code, and many
            locations may not have a publicly documented one.
          </p>
        </Section>

        {/* Why some locations don't have postal codes */}
        <Section
          icon={<HelpCircle className="size-5" />}
          title="Why don't some locations have a postal code?"
        >
          <p>
            There are several reasons why a postal code might not be available
            for a given location:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1.5">
            <li>
              The Ethiopian Postal Service may not have assigned a code to that
              area yet.
            </li>
            <li>
              A code may exist but has not been published in any publicly
              accessible source we can verify.
            </li>
            <li>
              The location may be a smaller settlement, kebele, or rural area
              that falls outside the current postal code infrastructure.
            </li>
            <li>
              Available sources may disagree, making it impossible to confirm
              a single code with confidence.
            </li>
          </ul>
          <p className="mt-3">
            When a postal code is unavailable, PostalEt will clearly tell you
            so rather than displaying unverified information.
          </p>
        </Section>

        {/* How our search works */}
        <Section
          icon={<Search className="size-5" />}
          title="How does the search work?"
        >
          <p>
            You can search by place name, city, town, zone, region, or postal
            code. The search is designed to be forgiving — partial names and
            approximate spellings will still return relevant results.
          </p>
          <p className="mt-3">
            When you find a location, PostalEt shows you:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>The postal code (if one is known)</li>
            <li>
              A <strong>confidence level</strong> indicating how reliable the
              information is
            </li>
            <li>Every source that claims a particular postal code</li>
            <li>When each source was last verified</li>
          </ul>
          <h3 className="mt-4 font-semibold">Confidence levels</h3>
          <div className="mt-2 space-y-2">
            <ConfidenceRow
              level="High"
              color="bg-emerald-100 text-emerald-800"
              description="Verified by an official source such as the Ethiopian Postal Service or the Universal Postal Union."
            />
            <ConfidenceRow
              level="Medium"
              color="bg-amber-100 text-amber-800"
              description="Multiple independent sources agree on the same postal code."
            />
            <ConfidenceRow
              level="Low"
              color="bg-orange-100 text-orange-800"
              description="Only a single source is available, or multiple sources disagree."
            />
            <ConfidenceRow
              level="Unverified"
              color="bg-zinc-100 text-zinc-600"
              description="No postal code claims have been found for this location."
            />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            If you search for a location and receive no results, the location
            may still exist — we simply may not have it in our database yet.
          </p>
        </Section>

        {/* What to do when a postal code isn't available */}
        <Section
          icon={<HelpCircle className="size-5" />}
          title="What should I do if a postal code is unavailable?"
        >
          <p>
            If you cannot find a postal code for your location, we recommend:
          </p>
          <ol className="mt-2 list-inside list-decimal space-y-1.5">
            <li>
              <strong>Contact the Ethiopian Postal Service directly.</strong>{" "}
              They are the authoritative source for postal code assignments.
            </li>
            <li>
              <strong>Check if a nearby larger city has a known code.</strong>{" "}
              Smaller settlements may share a postal code with a nearby delivery
              office.
            </li>
            <li>
              <strong>Use the region&apos;s code as a fallback.</strong>{" "}
              For example, Addis Ababa&apos;s general postal code is{" "}
              <span className="font-mono font-medium">1000</span>.
            </li>
          </ol>
          <div className="mt-4 rounded-lg border border-dashed border-border px-4 py-3">
            <p className="font-medium">
              About placeholder postal codes
            </p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Some international websites, shipping forms, and online services
              require a postal code field to be filled in, even for countries
              where postal codes are not universally available.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              In these situations, values such as{" "}
              <span className="font-mono font-medium text-foreground">
                1000
              </span>{" "}
              (Addis Ababa) or{" "}
              <span className="font-mono font-medium text-foreground">
                0000
              </span>{" "}
              are sometimes used as placeholders. Please understand that{" "}
              <strong>
                these are not official postal codes
              </strong>{" "}
              and may not be accepted by every service.
            </p>
          </div>
        </Section>

        {/* Our commitment to accuracy */}
        <Section
          icon={<ShieldCheck className="size-5" />}
          title="Our commitment to accuracy and transparency"
        >
          <p>
            Most Ethiopian postal code websites copy data from one another,
            making it difficult to know whether a postal code is actually
            correct. PostalEt takes a different approach.
          </p>
          <ul className="mt-3 list-inside list-disc space-y-1.5">
            <li>
              <strong>Every postal code is a claim, not a fact.</strong> We
              always show which source provided the data and let you decide how
              much to trust it.
            </li>
            <li>
              <strong>We never fabricate, estimate, or infer postal
              codes.</strong> We never guess a code based on nearby locations.
              If a postal code cannot be verified from our available references,
              we clearly say so.
            </li>
            <li>
              <strong>Sources are always visible.</strong> Every postal code
              page includes a &ldquo;Data References&rdquo; section listing our
              primary source and supporting references.
            </li>
            <li>
              <strong>Confidence is calculated, not assumed.</strong> Our
              confidence ratings are based on the number of independent sources
              and whether they agree.
            </li>
            <li>
              <strong>Places exist independently of postal codes.</strong> A
              location appears in our directory whether or not we know its
              postal code.
            </li>
            <li>
              <strong>Consistency across the site.</strong> The same verified
              data sources are used consistently across search results, postal
              code pages, and all informational content.
            </li>
          </ul>
        </Section>

        {/* Data Sources */}
        <div id="sources">
        <Section
          icon={<Database className="size-5" />}
          title="Our data sources"
        >
          <p>
            PostalEt references publicly available postal code directories to
            provide the most reliable information possible. We distinguish
            between our primary source and supporting references.
          </p>

          <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Primary Source
            </p>
            <div className="mt-2 rounded-lg border border-border p-4">
              <a
                href={PRIMARY_SOURCE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 font-medium hover:text-foreground"
              >
                {PRIMARY_SOURCE.name}
                <ExternalLink className="size-3 text-muted-foreground group-hover:text-foreground" />
              </a>
              <p className="mt-1 text-sm text-muted-foreground">
                {PRIMARY_SOURCE.description}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Supporting References
            </p>
            <div className="mt-2 space-y-2">
              {SUPPORTING_SOURCES.map((source) => (
                <div
                  key={source.url}
                  className="rounded-lg border border-border p-4"
                >
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 font-medium hover:text-foreground"
                  >
                    {source.name}
                    <ExternalLink className="size-3 text-muted-foreground group-hover:text-foreground" />
                  </a>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {source.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            The supporting references above contain information that is largely
            consistent with our primary source and are provided for transparency
            and additional verification.
          </p>
        </Section>
        </div>

        {/* Limitations */}
        <Section
          icon={<Info className="size-5" />}
          title="Limitations"
        >
          <p>
            PostalEt is a reference tool built from publicly available sources.
            It has limitations you should be aware of:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1.5">
            <li>
              Our database does not cover every settlement in Ethiopia. Rural
              areas and smaller communities may be missing.
            </li>
            <li>
              Postal code assignments can change over time. Information that was
              accurate when verified may become outdated.
            </li>
            <li>
              We depend on publicly available data. Internal postal service
              records may contain codes that are not publicly documented.
            </li>
            <li>
              PostalEt is not affiliated with the Ethiopian Postal Service or
              any government body. For official inquiries, contact the Ethiopian
              Postal Service directly.
            </li>
          </ul>
        </Section>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            PostalEt is a transparency-first Ethiopian postal code directory.
          </p>
          <Link
            href="/"
            className="mt-2 inline-block text-sm font-medium underline underline-offset-4 hover:text-foreground"
          >
            Search postal codes
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

function ConfidenceRow({
  level,
  color,
  description,
}: {
  level: string;
  color: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        className={`mt-0.5 inline-block shrink-0 rounded-md px-2.5 py-0.5 text-xs font-medium ${color}`}
      >
        {level}
      </span>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
