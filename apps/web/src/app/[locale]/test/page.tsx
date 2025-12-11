import { Image } from "@/components/image";

export default function ImageTestPage() {
  return (
    <div className="container mx-auto space-y-16 py-12">
      <h1 className="font-bold text-4xl">Image Component Tests</h1>

      {/* Test 1: Basic Image with dimensions */}
      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">
          1. Basic Image (width/height)
        </h2>
        <Image
          alt="Test image"
          className="rounded-lg"
          height={600}
          src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba"
          width={800}
        />
      </section>

      {/* Test 2: Fill mode */}
      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">
          2. Fill Mode (container-based)
        </h2>
        <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
          <Image
            alt="Fill test"
            fill
            objectFit="cover"
            src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba"
          />
        </div>
      </section>

      {/* Test 3: Block mode (responsive) */}
      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">
          3. Block Mode (responsive width)
        </h2>
        <Image
          alt="Block test"
          block
          className="rounded-lg"
          src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba"
        />
      </section>

      {/* Test 4: With aspectRatio (auto blur) */}
      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">
          4. AspectRatio (auto-generated blur)
        </h2>
        <Image
          alt="Aspect ratio test"
          aspectRatio={16 / 9}
          className="rounded-lg"
          height={600}
          src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba"
          width={800}
        />
      </section>

      {/* Test 5: Different objectFit values */}
      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">5. Object Fit Variations</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="relative h-[300px] overflow-hidden rounded-lg">
            <Image
              alt="Cover"
              fill
              objectFit="cover"
              src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba"
            />
            <p className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 text-white">
              cover
            </p>
          </div>
          <div className="relative h-[300px] overflow-hidden rounded-lg">
            <Image
              alt="Contain"
              fill
              objectFit="contain"
              src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba"
            />
            <p className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 text-white">
              contain
            </p>
          </div>
          <div className="relative h-[300px] overflow-hidden rounded-lg">
            <Image
              alt="Fill"
              fill
              objectFit="fill"
              src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba"
            />
            <p className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 text-white">
              fill
            </p>
          </div>
        </div>
      </section>

      {/* Test 6: Priority (eager loading) */}
      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">
          6. Priority Loading (above fold)
        </h2>
        <Image
          alt="Priority test"
          className="rounded-lg"
          height={600}
          priority
          src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba"
          width={800}
        />
      </section>

      {/* Test 8: Responsive sizes */}
      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">8. Custom Responsive Sizes</h2>
        <Image
          alt="Responsive sizes"
          className="rounded-lg"
          desktopSize="50vw"
          height={800}
          mobileSize="100vw"
          src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba"
          width={1200}
        />
      </section>

      {/* Test 9: Invalid src (should return null) */}
      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">
          9. Invalid src (graceful handling)
        </h2>
        <div className="rounded-lg border-2 border-gray-300 border-dashed p-4">
          <p className="mb-2 text-gray-500 text-sm">
            Should show nothing below:
          </p>
          <Image alt="Should not render" height={200} src="" width={200} />
          <p className="mt-2 text-green-600 text-sm">
            ✓ Component handled gracefully
          </p>
        </div>
      </section>

      {/* Test 10: Performance - Multiple images */}
      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">
          10. Performance Test (lazy loading)
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Image
              alt={`Performance test ${i}`}
              className="rounded-lg"
              height={300}
              key={i}
              src={`https://images.unsplash.com/photo-168268722074${i}`}
              width={300}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
