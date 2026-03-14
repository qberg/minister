'use client'

import { getMediaSize, getMediaUrl } from "@/lib/payload-media-utils"
import { Media } from "@/payload-types"
import { motion, MotionValue, useScroll, useTransform } from "motion/react"
import Image from "next/image"
import { useEffect } from "react"

type GalleryImageProps = {
    image: number | Media,
    index: number,
    progress: MotionValue<number>,
}

export const GalleryImage = ({image, index, progress}: GalleryImageProps) => {
    const startX = index*0.1 - 0.23
    const endX = startX + 0.6
    const startY = index*0.08 - 0.2
    const endY = startY + 0.6

    const startOffset = index * 5
    const exitOffset = index * 5

    const loop = useTransform(progress, (v) => v%1)

    const x = useTransform(loop, [startX, endX], [`${100 + startOffset}vw`, `${-150 - exitOffset}vw`])
    const y = useTransform(loop, [startY, endY], [`${100 + startOffset}vh`, `${-150 - exitOffset}vh`])
    const scale = useTransform(loop, [startX, startX+((startX+endX)/2), endX], [2, 1, 2] )
    
    useEffect(() => {
        const unsub = loop.on("change",(v) => {
            console.log({startX, endX, index, v, x, y})
        });
        return () => unsub()
    },[progress, index, x, y])

    return (
        <motion.div
            className='absolute w-[25vw] bg-amber-200'
            style = {{
                x,
                y,
                scale,
            }}
        >
            <Image
                src={getMediaUrl(image)}
                alt=""
                width={getMediaSize(image).width}
                height={getMediaSize(image).height}
                className="w-full h-auto object-contain"
            />
        </motion.div>
    )
}