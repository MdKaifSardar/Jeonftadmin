import { useEffect, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";
import NFTCard from "../NFTCard";

interface NFT {
  id: string;
  image: string;
  title: string;
  price: string;
  change?: number;
}

interface NFTGalleryProps {
  nft: NFT[];
}

const NFTGallery: React.FC<NFTGalleryProps> = ({ nft }) => {
  const [visibleNfts, setVisibleNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const loader = useRef<HTMLDivElement | null>(null);
  const itemsPerPage = 4;

  useEffect(() => {
    if (nft && nft.length > 0) {
      setVisibleNfts(nft.slice(0, itemsPerPage));
      setCurrentIndex(itemsPerPage);
    }
  }, [nft]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    const currentLoader = loader.current; // Copy loader.current to a variable

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader); // Use the copied variable in cleanup
      }
    };
  }, [visibleNfts, loading]);

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !loading && currentIndex < nft.length) {
      loadMoreNFTs();
    }
  };

  const loadMoreNFTs = () => {
    if (currentIndex >= nft.length) return;

    setLoading(true);

    setTimeout(() => {
      const nextBatch = nft.slice(currentIndex, currentIndex + itemsPerPage);
      setVisibleNfts((prev) => [...prev, ...nextBatch]);
      setCurrentIndex((prev) => prev + itemsPerPage);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 text-black">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">NFT Collection</h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {visibleNfts.map((nft, index) => (
          <div
            key={nft.id}
            className="transform transition-all duration-500 ease-in-out"
            style={{
              opacity: 0,
              animation: `fadeIn 0.5s ease-in-out forwards`,
              animationDelay: `${(index % itemsPerPage) * 0.1}s`,
            }}
          >
            <NFTCard nft={nft} />
          </div>
        ))}
      </div>

      <div ref={loader} className="flex justify-center items-center py-4 mt-4">
        {loading && <RefreshCw className="animate-spin text-gray-500" size={24} />}
        {currentIndex >= nft.length && !loading && visibleNfts.length > 0 && (
          <p className="text-gray-500">No more items to load</p>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default NFTGallery;