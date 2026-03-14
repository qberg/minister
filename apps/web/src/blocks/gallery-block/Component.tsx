'use client'

import { LayoutBlock } from "@/types"
import { motion, useScroll, useTransform } from "motion/react"
import Image from "next/image"
import { TypedLocale } from "payload"
import { useEffect, useRef } from "react"
import { GalleryImage } from "./GalleryImage"

type GalleryBlockProps = {
    locale?: TypedLocale,
    block: Extract<LayoutBlock, {blockType: "gallery"}>,
}

export const GalleryBlock = ({block}: GalleryBlockProps) => {
    const container = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })
    // useEffect(() => {
    //     const unsub = scrollYProgress.on("change",(v) => {
    //         if (v >= 0.99) {
    //             window.scrollTo({ top: 1 })
    //         }
    //         console.log(v)
    //     });
    //     return () => unsub()
    // },[scrollYProgress])
    
    const imageCount = block.galleryImage?.length ?? 0
    const containerHeight = `${ imageCount * 120 }vh`
    const imageArray = (block.galleryImage?.length ?? 0) > 0 ? block.galleryImage : []
    if (!imageArray || imageArray.length === 0) {
        return null
    }
    return (
        <div
          ref={container}
          style={{height: containerHeight}}
        >
            <div className='sticky top-0 h-screen overflow-hidden bg-black'>
                {imageArray.map((entry, index) => {
                    return <GalleryImage key={index} image={entry.image} index={index} progress = {scrollYProgress} />
                })}
                {block.galleryImage?.[0].location}
            </div>
        </div>
    )
}
