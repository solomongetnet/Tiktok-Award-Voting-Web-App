"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type CountdownProps = {
  size?: 'sm' | 'md' | 'lg'
  backgroundColor?: string
  textColor?: string
  accentColor?: string
  timeLeft: {
    days: number
    hours: number
    minutes: number
    seconds: number
  }
}

const Countdown = ({
  size = 'md',
  backgroundColor = 'bg-white',
  textColor = 'text-gray-800',
  accentColor = 'bg-gray-100',
  timeLeft
}: CountdownProps) => {

  const [currentTime, setCurrentTime] = useState(timeLeft)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(prevTime => {
        if (prevTime.days === 0 && prevTime.hours === 0 && prevTime.minutes === 0 && prevTime.seconds === 0) {
          clearInterval(timer)
          return prevTime
        }

        let newTime = { ...prevTime }
        if (newTime.seconds > 0) {
          newTime.seconds--
        } else {
          newTime.seconds = 59
          if (newTime.minutes > 0) {
            newTime.minutes--
          } else {
            newTime.minutes = 59
            if (newTime.hours > 0) {
              newTime.hours--
            } else {
              newTime.hours = 23
              newTime.days--
            }
          }
        }
        return newTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatNumber = (num: number) => num.toString().padStart(2, '0')

  const sizeClasses = {
    sm: {
      container: 'p-2',
      timeUnit: 'w-12 h-12',
      number: 'text-lg',
      label: 'text-xs'
    },
    md: {
      container: 'p-3',
      timeUnit: 'w-16 h-16',
      number: 'text-2xl',
      label: 'text-xs'
    },
    lg: {
      container: 'p-4',
      timeUnit: 'w-20 h-20',
      number: 'text-3xl',
      label: 'text-sm'
    }
  }

  return (
    <div className={`${backgroundColor} shadow-sm rounded-md ${sizeClasses[size].container} inline-block`}>
      <div className="flex space-x-3">
        {Object.entries(currentTime).map(([key, value]) => (
          <div key={key} className="flex flex-col items-center">
            <div className={`${accentColor} rounded p-1 ${sizeClasses[size].timeUnit} flex items-center justify-center overflow-hidden relative`}>
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={value}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`${sizeClasses[size].number} font-bold ${textColor} absolute`}
                >
                  {formatNumber(value)}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className={`${sizeClasses[size].label} ${textColor} mt-1 whitespace-nowrap opacity-80`}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Countdown
