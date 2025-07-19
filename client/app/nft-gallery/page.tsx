"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { RippleButton } from "@/components/ui/ripple-button"
import { Shield, Search, Filter, ExternalLink } from "lucide-react"
import Link from "next/link"
import { ethers } from "ethers"
import contractABI from "@/lib/MintiqNFT_ABI.json"
import { useWallet } from "@/components/wallet-provider"

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!;

interface NFTCertificate {
  tokenId: string
  documentName: string
  author: string
  trustScore: number
  mintedDate: string
  blockchain: string
  ipfsUrl: string
  transactionHash: string
}

export default function NFTGalleryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)
  const [certificates, setCertificates] = useState<NFTCertificate[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { walletAddress } = useWallet();

  useEffect(() => {
    const fetchNFTs = async () => {
      setLoading(true)
      setError(null)
      try {
        if (!(window as any).ethereum) throw new Error("MetaMask not found")
        const provider = new ethers.BrowserProvider((window as any).ethereum)
        const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider)
        const total = await contract.tokenCounter()
        const accounts = await provider.send("eth_accounts", [])
        const currentAddress = accounts[0]?.toLowerCase()
        const nfts: NFTCertificate[] = []
        for (let i = 0; i < Number(total); i++) {
          try {
            const tokenId = i.toString();
            const tokenURI = await contract.tokenURI(tokenId);
            const owner = (await contract.ownerOf(tokenId)).toLowerCase();
            if (owner !== currentAddress) continue;
            const ipfsUrl = tokenURI.startsWith("ipfs://")
              ? `https://gateway.pinata.cloud/ipfs/${tokenURI.replace("ipfs://", "")}`
              : tokenURI;
            const metaRes = await fetch(ipfsUrl);
            const meta = await metaRes.json();
            // Fetch transaction hash from backend
            let transactionHash = "";
            try {
              const txRes = await fetch(`/api/nft-mint?tokenId=${tokenId}`);
              const txData = await txRes.json();
              transactionHash = txData.transactionHash || "";
            } catch {}
            nfts.push({
              tokenId,
              documentName: meta.name || "Untitled Document",
              author: owner,
              trustScore: meta.trustScore || 0,
              mintedDate: meta.timestamp ? new Date(meta.timestamp).toLocaleDateString() : "-",
              blockchain: "BNB Chain Testnet",
              ipfsUrl,
              transactionHash,
            });
          } catch (err) {
            // skip broken/missing NFTs
          }
        }
        setCertificates(nfts)
      } catch (err: any) {
        setError(err.message || "Failed to fetch NFTs")
      } finally {
        setLoading(false)
      }
    }
    fetchNFTs()
  }, [walletAddress])

  const filteredCertificates = certificates.filter((cert) => {
    const matchesSearch =
      cert.documentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.tokenId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter ? cert.blockchain === selectedFilter : true
    return matchesSearch && matchesFilter
  })

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400"
    if (score >= 80) return "text-green-300"
    if (score >= 70) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-mintiq-primary/20 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl opacity-20"></div>
      </div>

      <header className="relative z-10 border-b border-gray-800 py-8 bg-black">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
          >
            NFT Certificate Gallery
          </motion.h1>
          <p className="text-gray-400 max-w-md text-sm md:text-base">
            Manage your blockchain-verified certificates.
          </p>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, author, or token ID..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-mintiq-primary transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-shrink-0 w-full md:w-auto">
            <select
              className="px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-mintiq-primary transition-all w-full sm:w-auto"
              value={selectedFilter || ""}
              onChange={(e) => setSelectedFilter(e.target.value || null)}
            >
              <option value="">All Blockchains</option>
              <option value="Ethereum">Ethereum</option>
              <option value="Polygon">Polygon</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-700/50 transition-all w-full sm:w-auto justify-center">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </motion.div>

        {loading ? (
          <GlassCard className="text-center py-12">
            <Shield className="h-12 w-12 mx-auto mb-4 text-gray-500 animate-spin" />
            <p className="text-gray-400">Loading NFTs...</p>
          </GlassCard>
        ) : error ? (
          <GlassCard className="text-center py-12">
            <Shield className="h-12 w-12 mx-auto mb-4 text-red-400" />
            <p className="text-gray-400">{error}</p>
          </GlassCard>
        ) : filteredCertificates.length === 0 ? (
          <GlassCard className="text-center py-12">
            <Shield className="h-12 w-12 mx-auto mb-4 text-gray-500" />
            <p className="text-gray-400">No certificates found</p>
            <p className="text-gray-500 text-sm mt-1">Try adjusting your search or filters</p>
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map((cert, index) => (
              <motion.div
                key={cert.tokenId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
              >
                <GlassCard className="h-full flex flex-col overflow-hidden transition-all duration-300">
                  <div className="border-2 border-mintiq-primary rounded-lg p-6 bg-gradient-to-br from-gray-900 to-gray-800 flex-1 flex flex-col relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-mintiq-primary/10 blur-2xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-20 h-20 rounded-full bg-mintiq-secondary/10 blur-2xl"></div>

                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-mintiq-primary" />
                        <span className="font-bold">Mintiq</span>
                      </div>
                      <div className="px-2 py-1 bg-mintiq-primary/20 rounded-full text-xs font-medium text-mintiq-primary">
                        Verified
                      </div>
                    </div>

                    <h3 className="text-lg font-bold mb-2 line-clamp-2 relative z-10">{cert.documentName}</h3>
                    <p className="text-sm text-gray-400 mb-4 relative z-10">By {cert.author}</p>

                    <div className="flex justify-center mb-4 mt-auto relative z-10">
                      <div className="w-16 h-16 rounded-full bg-mintiq-primary/20 flex items-center justify-center text-mintiq-primary text-2xl font-bold relative">
                        <div className="absolute inset-0 rounded-full border border-mintiq-primary/30 animate-pulse"></div>
                        {cert.trustScore}
                      </div>
                    </div>

                    <div className="text-center text-xs text-gray-400 mt-auto relative z-10">
                      <p>Token ID: {cert.tokenId}</p>
                      <p>Minted on {cert.mintedDate}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm">
                      <span className="text-gray-400">Blockchain: </span>
                      <span>{cert.blockchain}</span>
                    </div>
                    {cert.transactionHash ? (
                      <a
                        href={`https://testnet.bscscan.com/tx/${cert.transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <RippleButton size="sm" className="flex items-center gap-1">
                          <ExternalLink className="h-3 w-3" />
                          <span>View on Explorer</span>
                        </RippleButton>
                      </a>
                    ) : (
                      <RippleButton size="sm" className="flex items-center gap-1 opacity-50 cursor-not-allowed" disabled>
                        <ExternalLink className="h-3 w-3" />
                        <span>View</span>
                      </RippleButton>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
