import { Skeleton } from '@/components/ui/skeleton';

const bentoPatterns = [
  { colSpan: 2, rowSpan: 2 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 2 },
  { colSpan: 2, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
];

export function WorksSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px] md:auto-rows-[180px]">
      {Array.from({ length: count }).map((_, index) => {
        const pattern = bentoPatterns[index % bentoPatterns.length];
        
        return (
          <div
            key={index}
            className={`
              ${pattern.colSpan === 2 ? 'col-span-2' : 'col-span-1'}
              ${pattern.rowSpan === 2 ? 'row-span-2' : 'row-span-1'}
            `}
          >
            <Skeleton className="w-full h-full rounded-xl" />
          </div>
        );
      })}
    </div>
  );
}
