/**
 * Placeholder Instagram grid. This component renders a 3×2 grid of coloured
 * squares representing recent posts. Swap these divs for actual images
 * fetched via the Instagram Basic Display API or an approved embed widget.
 */
export default function InstagramGrid() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="aspect-square bg-rose/30 flex items-center justify-center text-ink text-sm font-medium rounded"
        >
          IG Post
        </div>
      ))}
    </div>
  );
}