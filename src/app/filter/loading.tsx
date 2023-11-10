'use client'
import SkeletonCard from "@/components/Skeleton/Card";
import { Card, Skeleton } from "@nextui-org/react";

type Props = {}

function layout({ }: Props) {
    return (
        <div className="flex flex-col sm:flex-row gap-3">
        <SkeletonCard/>
        <SkeletonCard/>
        </div>
        
    )
}

export default layout