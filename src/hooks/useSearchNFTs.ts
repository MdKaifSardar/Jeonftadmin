import { useState } from "react";
import { toast } from "react-toastify";
import { searchNFTs } from "@/lib/actions/nft.actions";

const useSearchNFTs = () => {
  const [fetchedNfts, setFetchedNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const searchForNFTs = async (keyword: string) => {
    if (!keyword.trim()) {
      toast.error("Please enter a valid keyword.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const result = await searchNFTs(keyword);
      if (result.success) {
        setFetchedNfts(result.data || []);
        if (!result.data || result.data.length === 0) {
          toast.info("No NFTs found for the given keyword.");
        }
      } else {
        setError(result.error || "Failed to fetch NFTs.");
        toast.error(result.error || "Error fetching NFTs.");
      }
    } catch (err: any) {
      setError("An error occurred while searching for NFTs.");
      toast.error(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return { fetchedNfts, loading, error, searchForNFTs };
};

export default useSearchNFTs;
