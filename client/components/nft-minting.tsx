"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { GlassCard } from "./ui/glass-card"
import { RippleButton } from "./ui/ripple-button"
import { FileText, Check, Clock, Share2, Download, ExternalLink, Copy, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import { uploadToPinata } from "../lib/utils";
import { ethers } from "ethers";
import contractABI from "../lib/MintiqNFT_ABI.json";

interface NFTMintingProps {
  documentId: string
  documentName: string
  trustScore: number
  onComplete?: () => void
}

type MintingStatus = "preparing" | "minting" | "confirming" | "complete" | "failed"

export function NFTMinting({ documentId, documentName, trustScore, onComplete }: NFTMintingProps) {
  const router = useRouter()
  const [status, setStatus] = useState<MintingStatus>("preparing")
  const [progress, setProgress] = useState(0)
  const [nftData, setNftData] = useState<{
    tokenId: string
    transactionHash: string
    blockchain: string
    ipfsUrl: string
    certificateUrl: string
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!;

  const handleMint = async () => {
    setStatus("minting");
    setProgress(10);
    try {
      // 1. Prepare metadata
      const metadata = {
        name: documentName,
        description: `Academic certificate with trust score ${trustScore}`,
        documentId,
        trustScore,
        timestamp: Date.now(),
      };
      setProgress(30);
      // 2. Upload to Pinata
      const ipfsUrl = await uploadToPinata(metadata);
      setProgress(60);
      // 3. Interact with contract via MetaMask
      if (!(window as any).ethereum) throw new Error("MetaMask not found");
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
      const tx = await contract.mintNFT(
        await signer.getAddress(), // to
        ipfsUrl,                  // tokenURI
        await signer.getAddress(), // author (or another address if needed)
        trustScore                // originalityScore
      );
      setProgress(80);
      const receipt = await tx.wait();
      // Find the tokenId from the event logs
      let tokenId = null;
      if (receipt && receipt.logs && receipt.logs.length > 0) {
        const iface = new ethers.Interface(contractABI);
        for (const log of receipt.logs) {
          try {
            const parsed = iface.parseLog(log);
            if (parsed && parsed.name === "Transfer") {
              tokenId = parsed.args.tokenId.toString();
              break;
            }
          } catch {}
        }
      }
      if (tokenId) {
        console.log('Storing tx hash:', { tokenId, transactionHash: tx.hash });
        const resp = await fetch('/api/nft-mint', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tokenId, transactionHash: tx.hash }),
        });
        const respData = await resp.json();
        console.log('Backend response:', respData);
      setNftData({
        tokenId: tokenId || "?",
        transactionHash: tx.hash,
        blockchain: "Educhain Testnet",
        ipfsUrl,
        certificateUrl: `/certificates/${tokenId || "?"}`,
      });
      }
      setStatus("complete");
      setProgress(100);
      if (onComplete) onComplete();
    } catch (err: any) {
      setError(err.message || "Minting failed");
      setStatus("failed");
    }
  };

  const startMinting = () => {
    setStatus("preparing")
    setProgress(0)
  }

  const retryMinting = () => {
    setError(null)
    setStatus("preparing")
    setProgress(0)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Could add a toast notification here
        console.log("Copied to clipboard")
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
      })
  }

  return (
    <GlassCard className="w-full">
      <h2 className="text-2xl font-bold mb-6">NFT Certificate Minting</h2>

      {status === "preparing" && (
        <div className="text-center py-8">
          <div className="mb-6">
            <Shield className="h-16 w-16 text-mintiq-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Ready to Mint Your Certificate</h3>
            <p className="text-gray-300 mb-4">
              Your document has been reviewed and approved with a trust score of{" "}
              <span className="font-bold text-mintiq-primary">{trustScore}</span>.
            </p>
            <p className="text-gray-400 mb-6">
              Minting your document as an NFT will create a permanent, verifiable record of your work on the blockchain.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mb-6 max-w-md mx-auto">
            <div className="flex items-start gap-4">
              <FileText className="h-10 w-10 text-mintiq-primary flex-shrink-0" />
              <div>
                <h4 className="font-medium mb-1">{documentName}</h4>
                <p className="text-sm text-gray-400">Document ID: {documentId}</p>
                <p className="text-sm text-gray-400">Trust Score: {trustScore}</p>
              </div>
            </div>
          </div>

          <RippleButton onClick={handleMint} className="mx-auto">
            Mint NFT Certificate
          </RippleButton>
        </div>
      )}

      {(status === "minting" || status === "confirming") && (
        <div className="text-center py-8">
          <div className="mb-8">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
              <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="8"
                  strokeDasharray="289.27"
                  strokeDashoffset={289.27 - (289.27 * progress) / 100}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{progress}%</span>
              </div>
              <div className="absolute -inset-4 rounded-full border border-mintiq-primary opacity-50 animate-pulse-slow"></div>
              <div className="absolute -inset-8 rounded-full border border-mintiq-primary opacity-30 animate-pulse-slower"></div>
            </div>

            <h3 className="text-xl font-bold mb-2">
              {status === "minting" ? "Minting Your NFT Certificate" : "Confirming Transaction"}
            </h3>
            <p className="text-gray-400">
              {status === "minting"
                ? "Please wait while we mint your document as an NFT on the blockchain."
                : "Transaction submitted. Waiting for blockchain confirmation..."}
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center">
                  <Check className="h-4 w-4 text-black" />
                </div>
                <span>Document verification complete</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center">
                  <Check className="h-4 w-4 text-black" />
                </div>
                <span>Certificate metadata generated</span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full ${(status === "minting" && progress > 50) || status === "confirming" ? "bg-green-400" : "bg-gray-600"} flex items-center justify-center`}
                >
                  {(status === "minting" && progress > 50) || status === "confirming" ? (
                    <Check className="h-4 w-4 text-black" />
                  ) : (
                    <Clock className="h-4 w-4 text-white" />
                  )}
                </div>
                <span>Uploading to IPFS</span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full ${status === "confirming" ? "bg-green-400" : "bg-gray-600"} flex items-center justify-center`}
                >
                  {status === "confirming" ? (
                    <Check className="h-4 w-4 text-black" />
                  ) : (
                    <Clock className="h-4 w-4 text-white" />
                  )}
                </div>
                <span>Minting NFT on blockchain</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                <span>Transaction confirmation</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {status === "complete" && nftData && (
        <div className="py-8">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-32 h-32 relative rounded-full bg-gradient-to-r from-green-400 to-mintiq-primary flex items-center justify-center mx-auto mb-6"
            >
              <div className="absolute -inset-4 rounded-full border border-mintiq-primary opacity-50 animate-pulse"></div>
              <Check className="h-16 w-16 text-black" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-2">NFT Certificate Successfully Minted!</h3>
            <p className="text-gray-300 mb-4">
              Your document has been permanently recorded on the blockchain as an NFT certificate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <div className="bg-gray-800 rounded-lg p-6 h-full">
                <h4 className="font-bold text-lg mb-4">Certificate Details</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Token ID</p>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{nftData.tokenId}</p>
                      <button
                        onClick={() => copyToClipboard(nftData.tokenId)}
                        className="text-gray-400 hover:text-white"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Blockchain</p>
                    <p className="font-medium">{nftData.blockchain}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Transaction Hash</p>
                    <div className="flex items-center gap-2">
                      <p className="font-medium truncate">{nftData.transactionHash}</p>
                      <button
                        onClick={() => copyToClipboard(nftData.transactionHash)}
                        className="text-gray-400 hover:text-white"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">IPFS URL</p>
                    <div className="flex items-center gap-2">
                      <p className="font-medium truncate">{nftData.ipfsUrl}</p>
                      <button
                        onClick={() => copyToClipboard(nftData.ipfsUrl)}
                        className="text-gray-400 hover:text-white"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gray-800 rounded-lg p-6 h-full">
                <div className="border-2 border-mintiq-primary rounded-lg p-6 bg-gradient-to-br from-gray-900 to-gray-800">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-2">
                      <Shield className="h-6 w-6 text-mintiq-primary" />
                      <span className="text-lg font-bold">Mintiq</span>
                    </div>
                    <div className="px-2 py-1 bg-mintiq-primary/20 rounded text-xs font-medium text-mintiq-primary">
                      Verified
                    </div>
                  </div>

                  <h4 className="text-xl font-bold mb-2 text-center">Academic Trust Certificate</h4>
                  <p className="text-center text-gray-400 mb-4">
                    This document has been verified for academic integrity
                  </p>

                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-mintiq-primary/20 flex items-center justify-center text-mintiq-primary text-3xl font-bold">
                      {trustScore}
                    </div>
                  </div>

                  <p className="text-center text-sm mb-4 truncate">{documentName}</p>

                  <div className="text-center text-xs text-gray-400">
                    <p>Token ID: {nftData.tokenId}</p>
                    <p>Minted on {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <RippleButton
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => window.open(`https://etherscan.io/tx/${nftData.transactionHash}`, "_blank")}
            >
              <ExternalLink className="h-4 w-4" />
              <span>View on Blockchain Explorer</span>
            </RippleButton>
            <RippleButton
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => router.push(`/certificates/${nftData.tokenId}`)}
            >
              <Download className="h-4 w-4" />
              <span>Download Certificate</span>
            </RippleButton>
            <RippleButton className="flex items-center gap-2" onClick={() => router.push(`/nft-gallery`)}>
              <Share2 className="h-4 w-4" />
              <span>View Gallery</span>
            </RippleButton>
          </div>
        </div>
      )}

      {status === "failed" && (
        <div className="text-center py-8">
          <div className="w-24 h-24 rounded-full bg-red-400 flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-black"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Minting Failed</h3>
          <p className="text-gray-400 mb-6">
            {error || "There was an error minting your NFT certificate. Please try again."}
          </p>
          <RippleButton onClick={retryMinting} className="mx-auto">
            Retry Minting
          </RippleButton>
        </div>
      )}
    </GlassCard>
  )
}
