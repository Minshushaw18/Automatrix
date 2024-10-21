"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from "react";
import {
  motion,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";

import { Separator } from "@/components/ui/separator"


import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { menuOptions } from '@/lib/constant'
import clsx from 'clsx'
import { Database, GitBranch, LucideMousePointerClick } from 'lucide-react';
import { ModeToggle } from '../global/mode-toggle';


type Props = {}

const Sidebar = (props: Props) => {

  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const pathName = usePathname()

  return (
    <nav className='dark:bg-black h-screen overflow-scroll justify-between flex items-center flex-col gap-10 py-6 px-2'>
      <div className='flex items-center justify-centre flex-col gap-8'>
        <Link className='flex font-bold flex-row' href='/'>
          Automatrix
        </Link>
        <TooltipProvider>
          {
            menuOptions.map((menuItem) => (
              <ul key={menuItem.name}>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <li>
                      <Link href={menuItem.href}
                        className={clsx(
                          'group h-8 flex items-center justify-center scale-[1.5] rounded-lg p-[3px] cursor-pointer',
                          {
                            "dark:bg-[#2F006B] bg-[#EEE0FF]": pathName === menuItem.href,
                          }
                        )}
                      >
                        <menuItem.Component selected={pathName === menuItem.href} />
                      </Link>
                    </li>
                  </TooltipTrigger>
                  <TooltipContent>
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.6 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          type: "spring",
                          stiffness: 260,
                          damping: 10,
                        },
                      }}
                      exit={{ opacity: 0, y: 20, scale: 0.6 }}
                      style={{
                        translateX: translateX,
                        rotate: rotate,
                        whiteSpace: "nowrap",
                      }}
                    >
                      <div className="font-bold text-white relative z-30 text-base">
                        {menuItem.name}
                      </div>
                    </motion.div>
                  </TooltipContent>
                  <Separator />
                </Tooltip>
              </ul>
            ))
          }
        </TooltipProvider>

        <div className="flex items-center flex-col gap-9 dark:bg-[#353346]/30 py-4 px-2 rounded-full h-56 overflow-scroll border-[1px]">
          <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
            <LucideMousePointerClick
              className="dark:text-white"
              size={18}
            />
            <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]" />
          </div>
          <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
            <GitBranch
              className="text-muted-foreground"
              size={18}
            />
            <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]"></div>
          </div>
          <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
            <Database
              className="text-muted-foreground"
              size={18}
            />
            <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]"></div>
          </div>
          <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
            <GitBranch
              className="text-muted-foreground"
              size={18}
            />
          </div>
        </div>
    </div>
    <div className='flex item-centre justify-center flex-col gap-8'>
       <ModeToggle/>
    </div>
    </nav >
  )
}

export default Sidebar