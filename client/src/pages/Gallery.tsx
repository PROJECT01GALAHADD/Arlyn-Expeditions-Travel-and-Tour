import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import img1 from "@assets/generated_images/Twin_Lagoon_kayaking_Coron_ccdecb05.png";
import img2 from "@assets/generated_images/Kayangan_Lake_viewpoint_Coron_0b301942.png";
import img3 from "@assets/generated_images/Calauit_Safari_giraffes_Palawan_9fdfd4c3.png";
import img4 from "@assets/generated_images/Private_charter_luxury_boat_bc9c5781.png";
import img5 from "@assets/generated_images/Coron_islands_aerial_hero_f326fa4c.png";
import img6 from "@assets/generated_images/Underwater_coral_reef_Coron_03a15194.png";
import img7 from "@assets/generated_images/Tropical_beach_paradise_Coron_75782f58.png";
import img8 from "@assets/generated_images/Island_hopping_boats_lagoon_5613b853.png";
import img9 from "@assets/generated_images/Coron_sunset_landscape_aec98c50.png";

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const categories = [
    { id: "all", label: "All" },
    { id: "islands", label: "Islands" },
    { id: "underwater", label: "Underwater" },
    { id: "wildlife", label: "Wildlife" },
    { id: "culture", label: "Culture" },
  ];

  const galleryItems = [
    { id: 1, url: img1, category: "islands", caption: "Twin Lagoon Kayaking" },
    { id: 2, url: img2, category: "islands", caption: "Kayangan Lake Viewpoint" },
    { id: 3, url: img3, category: "wildlife", caption: "Calauit Safari Giraffes" },
    { id: 4, url: img4, category: "islands", caption: "Private Luxury Charter" },
    { id: 5, url: img5, category: "islands", caption: "Aerial View of Coron" },
    { id: 6, url: img6, category: "underwater", caption: "Coral Reef Paradise" },
    { id: 7, url: img7, category: "islands", caption: "Pristine Beach" },
    { id: 8, url: img8, category: "culture", caption: "Traditional Bangka Boats" },
    { id: 9, url: img9, category: "islands", caption: "Sunset Over Islands" },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  const handlePrevious = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredItems.findIndex((item) => item.id === selectedImage);
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
      setSelectedImage(filteredItems[prevIndex].id);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredItems.findIndex((item) => item.id === selectedImage);
      const nextIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
      setSelectedImage(filteredItems[nextIndex].id);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h1
            className="text-4xl md:text-6xl font-bold text-foreground mb-6"
            data-testid="text-gallery-title"
          >
            Gallery
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Explore the stunning beauty of Coron through our lens
          </p>
        </div>
      </section>

      <section className="py-8 bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                data-testid={`button-category-${category.id}`}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => setSelectedImage(item.id)}
                data-testid={`gallery-item-${item.id}`}
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg hover-elevate">
                  <img
                    src={item.url}
                    alt={item.caption}
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-semibold text-sm">{item.caption}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">No images in this category yet</p>
            </div>
          )}
        </div>
      </section>

      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-6xl p-0 bg-black/95">
          {selectedImage !== null && (
            <div className="relative">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-50 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
                data-testid="button-close-lightbox"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative flex items-center justify-center min-h-[70vh]">
                <img
                  src={filteredItems.find((item) => item.id === selectedImage)?.url}
                  alt={filteredItems.find((item) => item.id === selectedImage)?.caption}
                  className="max-w-full max-h-[85vh] object-contain"
                  data-testid="img-lightbox"
                />

                <button
                  onClick={handlePrevious}
                  className="absolute left-4 text-white bg-black/50 rounded-full p-3 hover:bg-black/70 transition-colors"
                  data-testid="button-previous"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-4 text-white bg-black/50 rounded-full p-3 hover:bg-black/70 transition-colors"
                  data-testid="button-next"
                  aria-label="Next"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 text-center">
                <p className="text-white text-lg font-semibold">
                  {filteredItems.find((item) => item.id === selectedImage)?.caption}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
