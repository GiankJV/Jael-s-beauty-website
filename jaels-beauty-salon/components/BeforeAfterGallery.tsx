import Image from "next/image";

const BASE_PATH = "/Jael_before_after_gallery";

const models = Array.from({ length: 13 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return {
    id: i + 1,
    label: `Jael's Model ${num}`,
    before: `${BASE_PATH}/jaels-model-${num}-before.webp`,
    after: `${BASE_PATH}/jaels-model-${num}-after.webp`,
  };
});

export default function BeforeAfterGallery() {
  return (
    <section className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          Before &amp; After Transformations
        </h2>
        <p className="max-w-xl mx-auto text-ink/70">
          Real guests, real results. See how subtle dimension, brightness, and custom color formulas transform every canvas.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {models.map((model) => (
          <article key={model.id} className="space-y-3">
            <h3 className="text-lg font-medium">{model.label}</h3>

            <div className="grid grid-cols-2 gap-3 text-xs uppercase tracking-wide text-ink/60">
              <div className="space-y-2">
                <p>Before</p>
                <div className="overflow-hidden rounded-2xl border border-rose/20 bg-white">
                  <Image
                    src={model.before}
                    alt={`${model.label} – before`}
                    width={700}
                    height={900}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <p>After</p>
                <div className="overflow-hidden rounded-2xl border border-rose/20 bg-white">
                  <Image
                    src={model.after}
                    alt={`${model.label} – after`}
                    width={700}
                    height={900}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
